const express = require('express');
const router = express.Router();
const cityModel = require('../models/cityModel');

router.get('/test', (req, res) => {
    res.send({ msg: 'Cities test' });
});

router.get('/all', (req, res) => {
    cityModel.find({})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
    })
    
    const exists = newCity.findOne({ name: name.toLowerCase() });
    if (exists) res.json({ message: 'This city already exists in database'})
    else newCity.save()
            .then((city) => res.send(city))
            .catch((err) => res.status(500).send('Internal server error'));   
});


module.exports = router;