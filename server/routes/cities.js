const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test' });
})

module.exports = router;