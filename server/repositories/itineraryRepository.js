const Itinerary = require('../database/models/itineraryModel');

const getAll = async() => await Itinerary.find();
const count = async() => await Itinerary.count();
const getItinerariesByCityId = async(id) => await Itinerary.find({ cityId: id });
const getItineraryById = async(id) => await Itinerary.findById(id);
const createItinerary = async(itinerary) => await itinerary.save();
//const getByCommentId = async (commentId, userId) => Itinerary.findOne({'comments._id': commentId, 'comments.userId': userId});

module.exports = {
    getAll,
    count,
    getItinerariesByCityId,
    getItineraryById,
    createItinerary
    //getByCommentId
};