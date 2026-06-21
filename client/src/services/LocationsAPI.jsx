const BASE_URL = '/api/locations'

const getAllLocations = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
}

const getLocationById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    const data = await response.json()
    return data
}

export default {
    getAllLocations,
    getLocationById
}
