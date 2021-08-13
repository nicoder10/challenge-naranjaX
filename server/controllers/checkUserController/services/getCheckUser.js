const { response, itineraryRepository } = require('../checkUserModule');

const getCommentsByUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const itineraryId = req.params._id;

        const itineraryInDb = await itineraryRepository.getItineraryById(itineraryId);
        if(!itineraryInDb) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }

        const userComments = [];
        itineraryInDb.comments.map(comment => (comment.userId.toString() === _id.toString()) ? userComments.push(comment._id) : null);

        let liked = false;
        if(itineraryInDb.usersLike.includes(_id.toString())) liked = true;
        res.status(200).json({
            success: true,
            response: {
                arrayOwnerCheck: userComments,
                likedCheck: liked
            }
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    }
};

module.exports = {
    getCommentsByUser
};