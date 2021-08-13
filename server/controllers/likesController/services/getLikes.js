const { response, itineraryRepository } = require('../likesModule');

const getLikes = async (req, res) => {
    try {
        const { _id } = req.user;
        const itineraryId = req.params.id;

        const itineraryInDb = await itineraryRepository.getItineraryById(itineraryId);
        if(!itineraryInDb) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }
        
        const likes = itineraryInDb.likes;

        let liked = false;
        if (itineraryInDb.usersLike.includes(_id.toString())) liked = true;
        res.status(200).json({
            ok: true,
            likes,
            liked
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error',
            error
        });
    }
}

module.exports = {
    getLikes
};