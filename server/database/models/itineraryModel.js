const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    activities: { type : [{ name: { type: String }, img: { type: String } }] },
    authorName: { type: String, required: true },
    authorPic: { type: String, required: true },
    price: { type: Number, min: 1, max: 5, required: true },
    duration: { type: Number, min: 1, required: true },
    likes: { type: Number, default: 0 },
    hashtags: { type: [String] },
    comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}, 
                 text: String, 
                 userName: String, 
                 userPic: String 
              }],
    usersLike: { type: [String] },
    cityId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('itinerary', itinerarySchema);