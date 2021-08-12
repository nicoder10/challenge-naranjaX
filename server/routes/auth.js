const { check } = require('express-validator');
const { post } = require('../controllers/authController/authController'); 
const { Router } = require('../controllers/authController/authModule');
const { create } = require('../controllers/userController/userController');
const router = new Router;

router.post('/user/signin', 
    [
        check('email', 'Must enter a valid mail').isEmail(),
        check('password', 'Must enter a valid password').not().isEmpty(),
    ],
    post.login
);

//router.post('/user/signup', create.createUser);

module.exports = router;