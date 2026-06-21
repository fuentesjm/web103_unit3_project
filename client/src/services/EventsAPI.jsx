const BASE_URL = '/api/events'

const getAllEvents = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
}

const getEventById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`${BASE_URL}/location/${locationId}`)
    const data = await response.json()
    return data
}

export default {
    getAllEvents,
    getEventById,
    getEventsByLocation
}
