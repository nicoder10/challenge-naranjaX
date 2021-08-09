const { Router } = require('../controllers/cityController/cityModule');
const { get, create } = require('../controllers/cityController/cityController');
const router = new Router();

// get all cities
router.get('/cities', get.getCities);
// get city by id
router.get('/city/:id', get.getCity);
// get city by query
router.get('/city', get.getCityByQuery);

// create new city
router.post('/', create.createCity);

module.exports = router;