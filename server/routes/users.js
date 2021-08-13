const { check } = require('express-validator');
const { get, create, put, del } = require('../controllers/userController/userController');
const { Router } = require('../controllers/userController/userModule');
const passport = require('../passport');
const router = new Router();

router.get('/', get.getUsers);
router.get('/user/:id', get.getUser);
router.get('/user', get.getUserByQuery);
router.get('/favorites/:id', get.getFavorites);
router.get('/signinls', 
    passport.authenticate('jwt', {session: false}),
    get.signInls
);

router.put('/favorites', 
    passport.authenticate('jwt', {session: false}),
    put.addFavorite
);

router.delete('/favorites/:id',
    passport.authenticate('jwt', {session: false}),
    del.deleteFavorite
)

router.post('/signup', 
    [
        check('firstName', 'Must add a valid first name').isString().not().isEmpty(),
        check('lastName', 'Must add a valid last name').isString().not().isEmpty(),
        check('email', 'Must add a valid mail').isEmail(),
        check('password', 'Must add a valid password').not().isEmpty(),
        check('userPic', 'Must add a valid user pic').isString().not().isEmpty(),
        check('country', 'Must add a valid country').isString().not().isEmpty()
    ], 
    create.createUser
);

router.post('/signin', 
    create.signIn
);

module.exports = router;