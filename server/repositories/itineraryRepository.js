const Itinerary = require('../database/models/itineraryModel');

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();
const getItineraryByCityId = async(id) => await Itinerary.findOne({cityId: id});

module.exports = {
    getAll,
    count,
    getItineraryById
};