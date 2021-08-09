const City = require('../../../database/models/cityModel');

const createCity = async (req, res) => {
    let body = req.body;
    
    const newCity = new City({
        name: body.name,
        country: body.country,
        img: body.img
    })
    /*
    const exists = await newCity.findOne({ name: newCity.name.toLowerCase() });
    
    if (exists) res.json({ message: 'This city already exists in database'})
    else await newCity.save()
            .then((city) => res.send(city))
            .catch((err) => res.status(500).send('Internal server error'));
    */
   await newCity.save()
        .then(city => res.status(200).json({ message: 'City created', city: city }))
        .catch(err => res.status(500).json({ message: 'Internal server error', error: err }));   
};

module.exports = {
    createCity
};