const { check } = require('express-validator');
const { Router } = require('../controllers/userController/userModule');
const { get, create } = require('../controllers/userController/userController');
const passport = require('../passport');
const router = new Router();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    get.getUsers
);
// get all users
router.get('/users', get.getUsers);
// create user
router.post('/user/signup',
[
    check('name', 'Must add a valid name').isString().not().isEmpty(),
    check('email', 'Must add a valid email').isEmail(),
    check('password', 'Must add a valid password').not().isEmpty(),
    check('userPic', 'Must add a valid profile image').isString().not().isEmpty(),
    check('country', 'Must add a valid country').isString().not().isEmpty()
  ], create.createUser);

module.exports = router;