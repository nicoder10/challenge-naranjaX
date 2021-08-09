const cityRepository = require('../../../repositories/cityRepository');

// get all cities
const getCities = async (req, res) => {
    try {
        
        const data = await cityRepository.getAll();
        const count = await cityRepository.count();

        if(!citiesInDB) {
            return res.status(401).json({
                ok: false,
                message: 'No cities in database'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Cities',
            response: data,
            total: count
        });
    } catch(e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    };
};

// get city by ID
const getCity = async (req, res) => {
    let id = req.params.id;

    try {
        const data = await cityRepository.getByID(id);
        if(!data) {
            return res.status(401).json({
                ok: false,
                message: 'No city corresponds to that id'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'City',
            response: data
        });

    } catch(e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    };
};

// get city by param

const getCityByQuery = (req, res) => {
    let name = req.query.name;

    try {
        const data = cityRepository.getCityByName(name);
        if(!data) {
            res.status(401).json({
                ok: false,
                message: 'City not found'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'City',
            response: data
        });
    } catch(e) {
        res.status.json({
            ok: false,
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