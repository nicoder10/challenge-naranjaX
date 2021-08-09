const cityRepository = require('../../../repositories/cityRepository');

// get all cities
const getCities = async (req, res) => {
    try {
        const citiesInDB = await cityRepository.getAll();
        const count = await cityRepository.count();

        if(!citiesInDB) {
            return res.status(401).json({
                message: 'No cities in database'
            });
        }
        res.status(200).json({
            message: 'Cities',
            cities: citiesInDB,
            total: count
        });
    } catch(e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    };
};

// get city by ID
const getCity = async (req, res) => {
    let id = req.params.id;

    try {
        const city = await cityRepository.getByID(id);
        if(!city) {
            return res.status(401).json({
                message: 'No city corresponds to that id'
            });
        }

        res.status(200).json({
            message: 'City',
            city: city
        });

    } catch(e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    };
};

// get city by param

const getCityByQuery = (req, res) => {
    let name = req.query.name;

    try {
        const city = cityRepository.getCityByName(name);
        if(!city) {
            res.status(401).json({
                message: 'City not found'
            });
        }
        res.status(200).json({
            message: 'City',
            city: city
        });
    } catch(e) {
        res.status.json({
            message: 'Internal server error',
            error: e
        });
    };
};

module.exports = {
    getCities,
    getCity,
    getCityByQuery
};