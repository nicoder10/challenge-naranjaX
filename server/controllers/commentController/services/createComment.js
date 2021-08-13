const { response, itineraryRepository } = require('../commentModule');
const { validationResult } = require('express-validator');

const addComment = async (req, res = response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    };

    try {
        const itineraryId = req.params.id;
        const user = req.user;
        const commentText = req.body.text; 

        const itineraryInDb = await itineraryRepository.getItineraryById(itineraryId);
        if(!itineraryInDb) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }
        
        itineraryInDb.comments.push({
            userId: user._id,
            text: commentText,
            userName: user.firstName,
            userPic: user.userPic
        });

        const userComments = [];
        itineraryDb.comments.map((comment) => (comment.userId.toString() === user._id.toString()) ? userComments.push(comment._id) : null );

        await itineraryRepository.createItinerary(itineraryDb);
        res.status(200).json({
            success: true,
            response: itineraryInDb.comments,
            arrayOwnerCheck: userComments
        });

    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        }); 
    }
}

module.exports = {
    addComment
};