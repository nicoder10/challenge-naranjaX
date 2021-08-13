const { Router } = require('../controllers/itineraryController/itineraryModule');
const { itineraryController } = require('../controllers/itineraryController/itineraryController');
const router = new Router();

router.get('/itineraries/all', itineraryController.getItineraries);
router.get('/itineraries/:cityId', itineraryController.getItinerariesByCityId);

module.exports = router;