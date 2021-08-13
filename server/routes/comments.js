const passport = require('../passport');
const { check } = require('express-validator');
const { post, put, del } = require('../controllers/commentController/commentController');
const { Router } = require('../controllers/commentController/commentModule');
const router = new Router();

router.post('/comments/:id',
    passport.authenticate('jwt', {session: false}),
    [
        check('text', 'Must add a valid text').isString().not().isEmpty(),
    ], 
    post.addComment
);

router.delete('/comments/:id',
    passport.authenticate('jwt', {session: false}),
    del.deleteComment
);

router.put('/comments/:id',
    passport.authenticate('jwt', {session: false}),
    [
        check('text', 'Must add a valid text').isString().not().isEmpty(),
    ], 
    put.editComment
);

module.exports = router;