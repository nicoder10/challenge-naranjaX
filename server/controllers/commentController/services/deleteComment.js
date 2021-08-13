const { response, itineraryRepository } = require('../commentModule');

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const itineraries = await itineraryRepository.getAll();

        let itineraryFound = '';
        itineraries.map( async (itinerary) => {
            itinerary.comments.map(comment => (comment._id.toString() === commentId.toString()) ? itineraryFound = itinerary : null);
        });

        itineraryFound.comments = itineraryFound.comments.filter(comment =>(comment._id.toString() !== commentId));
       
        await itineraryRepository.createItinerary(itineraryFound);
        const comments = itineraryFound.comments;
        res.status(200).json({
            success: true,
            response: comments
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
    deleteComment
}