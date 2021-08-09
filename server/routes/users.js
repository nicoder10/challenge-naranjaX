const { Router } = require('../controllers/userController/userModule');
const { get, create } = require('../controllers/userController/userController');
const router = new Router();

// get all users
router.get('/users', get.getUsers);
// create user
router.post('/', create.createUser);

module.exports = router;