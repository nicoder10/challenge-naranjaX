const City = require('../../../database/models/cityModel');

const createCity = async (req, res) => {
    let body = req.body;
    
    const newCity = new cityModel({
        name: body.name,
        country: body.country,
        img: body.img
    })
    
    const exists = await newCity.findOne({ name: name.toLowerCase() });
    
    if (exists) res.json({ message: 'This city already exists in database'})
    else await newCity.save()
            .then((city) => res.send(city))
            .catch((err) => res.status(500).send('Internal server error'));   
};

module.exports = {
    createCity
};