import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

// Four 2026 FIFA World Cup host venues (United States & Mexico).
const locations = [
    {
        name: 'MetLife Stadium',
        address: '1 MetLife Stadium Dr',
        city: 'East Rutherford',
        state: 'NJ',
        zip: '07073',
        image: '/images/metlife.jpg'
    },
    {
        name: 'AT&T Stadium',
        address: '1 AT&T Way',
        city: 'Arlington',
        state: 'TX',
        zip: '76011',
        image: '/images/att.jpg'
    },
    {
        name: 'SoFi Stadium',
        address: '1001 Stadium Dr',
        city: 'Inglewood',
        state: 'CA',
        zip: '90301',
        image: '/images/sofi.jpg'
    },
    {
        name: 'Estadio Azteca',
        address: 'Calz. de Tlalpan 3465',
        city: 'Mexico City',
        state: 'CDMX',
        zip: '04650',
        image: '/images/azteca.jpg'
    }
]

// 2026 FIFA World Cup fixtures by venue (June 11 – July 19, 2026).
// Knockout matchups are listed by round, since the participating teams
// depend on earlier results. Confirmed pairings (opening match, final venue)
// are named explicitly.
// Each event's image is the photo of the venue (location) it is held at,
// derived from the locations array above by location_id.
const events = [
    // MetLife Stadium — hosts the Final.
    { title: 'Round of 32', date: '2026-06-30', time: '20:00', location_id: 1 },
    { title: 'Round of 16', date: '2026-07-05', time: '16:00', location_id: 1 },
    { title: 'FIFA World Cup 2026 Final', date: '2026-07-19', time: '15:00', location_id: 1 },

    // AT&T Stadium (Dallas) — hosts a semi-final.
    { title: 'Round of 32', date: '2026-06-30', time: '15:00', location_id: 2 },
    { title: 'Round of 32', date: '2026-07-03', time: '18:00', location_id: 2 },
    { title: 'Round of 16', date: '2026-07-06', time: '18:00', location_id: 2 },
    { title: 'Semi-Final', date: '2026-07-14', time: '19:00', location_id: 2 },

    // SoFi Stadium (Los Angeles) — hosts a quarter-final.
    { title: 'Round of 32', date: '2026-06-28', time: '17:00', location_id: 3 },
    { title: 'Round of 32', date: '2026-07-02', time: '17:00', location_id: 3 },
    { title: 'Round of 16', date: '2026-07-07', time: '16:00', location_id: 3 },
    { title: 'Quarter-Final', date: '2026-07-10', time: '16:00', location_id: 3 },

    // Estadio Azteca (Mexico City) — hosted the opening match.
    { title: 'Opening Match: Mexico vs South Africa', date: '2026-06-11', time: '20:00', location_id: 4 },
    { title: 'Round of 32', date: '2026-06-30', time: '20:00', location_id: 4 }
]

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            image TEXT
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (error) {
        console.error('⚠️ error creating locations table', error)
    }
}

const seedLocationsTable = async () => {
    await createLocationsTable()

    // Insert sequentially so SERIAL ids are assigned in array order (1..n),
    // which the events' location_id values and the client routes rely on.
    for (const location of locations) {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [location.name, location.address, location.city, location.state, location.zip, location.image]
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${location.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting location', err)
        }
    }
}

const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time VARCHAR(255) NOT NULL,
            image TEXT,
            location_id INTEGER REFERENCES locations(id)
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (error) {
        console.error('⚠️ error creating events table', error)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    for (const event of events) {
        // Use the venue's photo as the event image (location_id is 1-based).
        const image = locations[event.location_id - 1].image

        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)',
            values: [event.title, event.date, event.time, image, event.location_id]
        }

        try {
            await pool.query(insertQuery)
            console.log(`✅ ${event.title} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting event', err)
        }
    }
}

const reset = async () => {
    await seedLocationsTable()
    await seedEventsTable()
}

reset()
