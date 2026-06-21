import express from 'express'
import LocationsController from '../controllers/locations.js'

const router = express.Router()

// define routes to get locations
router.get('/', LocationsController.getLocations)
router.get('/:id', LocationsController.getLocation)

export default router
