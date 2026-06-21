import { pool } from '../config/database.js'

// GET /api/events — return every event
const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY date ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// GET /api/events/:id — return a single event
const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// GET /api/events/location/:locationId — return events held at one location
const getEventsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params
        const results = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC', [locationId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEvent,
    getEventsByLocation
}
