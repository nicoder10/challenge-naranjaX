const { response, itineraryRepository } = require('../commentModule');

const editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const commentText = req.body.text;

        const itinerariesInDb = await itineraryRepository.getAll();

        let comments = [];
        itinerariesInDb.map(itinerary => {
            itinerary.comments.map( async (comment) => {
                if (comment._id.toString() === commentId.toString()) {
                    comment.text = commentText;
                    comments = itinerary.comments;
                    await itineraryRepository.createItinerary(itinerary);
                };
            });
        });
        res.status(200).json({
           success: true,
           response: arrayComments
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
    editComment
};