const { Itinerary, response } = require('../itineraryModule');
const itineraryRepository = require('../../../repositories/itineraryRepository');
const itineraryModel = require('../../../database/models/itineraryModel');
const cityRepository = require('../../../repositories/cityRepository');

// get all itineraries
const getItineraries = async (req, res) => {
    try {
        const itinerariesDB = await itineraryRepository.getAll();
        const count = await itineraryRepository.count();

        if(!itinerariesDB) {
            res.status(401).json({
                message: 'No itineraries in database'
            });
        }
        res.status(200).json({
            message: 'Itineraries',
            itineraries: itinerariesDB,
            total: count
        });
    } catch(e){
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

// get itineraries by city name

const getItinerariesByCity = async (req, res) => {
    const city = req.query.name;

    try {
        const cityDB = await cityRepository.getCityByName(city);

        if(!cityDB) {
            res.status(401).json({
                message: `No itineraries found by ${city}`
            });
        }

        const id = cityDB._id;
        const itineraryByCity = await itineraryRepository.getItineraryById(id);

        res.status(200).json({
            message: `Itineraries for ${city}`,
            itineraries: itineraryByCity
        });

    } catch(e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

module.exports = {
    getItineraries,
    getItinerariesByCity
};