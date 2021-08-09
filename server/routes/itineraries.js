const { Router } = require('../controllers/itineraryController/itineraryModule');
const { get } = require('../controllers/itineraryController/itineraryController');
const router = new Router();

// get all itineraries
router.get('/itineraries', get.getItineraries);
// get itinerary by city name
router.get('/itinerary/:name', get.getItinerariesByCity);

module.exports = router;