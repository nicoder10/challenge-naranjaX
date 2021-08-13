const passport = require('../passport');
const { get } = require('../controllers/likesController/likesController');
const { Router } = require('../controllers/likesController/likesModule');
const router = new Router();

router.get('/likes/:id',
    passport.authenticate('jwt', {session: false}),
    get.getLikes
);

module.exports = router;