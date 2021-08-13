const passport = require('../passport');
const { get } = require('../controllers/checkUserController/checkUserController');
const { Router } = require('../controllers/checkUserController/checkUserModule');
const router = new Router;

router.get('/checkuser/:id', 
    passport.authenticate('jwt', {session: false}),
    get.getCommentsByUser
);

module.exports = router;