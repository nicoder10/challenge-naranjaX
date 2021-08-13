const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    },
    activities: {
        type: [{ name: String, img: String }]
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    authorPic: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    likes: {
        type: Number,
        default: 0
    },
    hashtags: {
        type: [String]
    },
    comments: {
        type: [{ userId: {type: ObjectID, ref: 'User'}, text: String, userName: String, userPic: String }]
    },
    usersLike: {
        type: [String]
    },
    cityId: {
        type: ObjectID,
        ref: 'City',
        required: true
    }
});

module.exports = mongoose.model('itinerary', itinerarySchema);