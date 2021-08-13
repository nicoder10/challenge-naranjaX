const { Itinerary, response } = require('../itineraryModule');
const itineraryRepository = require('../../../repositories/itineraryRepository');
const itineraryModel = require('../../../database/models/itineraryModel');
const cityRepository = require('../../../repositories/cityRepository');

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

const getItinerariesByCityId = async (req, res) => {
    const id = req.params.cityId;
    try {
        const itinerariesInDB = await itineraryRepository.getItinerariesByCityId(id);
        if(!itinerariesInDB) {
            res.status(401).json({
                ok: false,
                message: `Itineraries with city id ${id} not found`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Itineraries',
            response: itinerariesInDB
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    }
};

const checkUser = async (req, res) => {
    try {
        const itinerary = await itineraryRepository.getItineraryById(req.params.id)
        if(!itinerary) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }
        res.status(200).json({
            success: true,
            response: {
                arrayOwnerCheck: itinerary.comments.filter(comment => comment.userId.toString() === req.user._id.toString()).map(comment => comment._id),
                likedCheck: itinerary.usersLike.includes(req.user._id.toString())
            }
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

const addComment = async (req, res) => {
    try {
        const itinerary = await itineraryRepository.getItineraryById(req.params.id);
        if(!itinerary) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }
        const comment = {
            userId: req.user._id,
            userPic: req.user.userPic,
            userName: `${req.user.firstName} ${req.user.lastName}`,
            text: req.body.text
        };
        itinerary.comments = [...itinerary.comments, comment];
        await itinerary.save();
        res.status(200).json({
            success: true,
            response: {
                response: itinerary.comments,
                arrayOwnerCheck: itinerary.comments.filter(comment => comment.userId.toString() === req.user._id.toString()).map(comment => comment._id)
            }
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const itinerary = await itineraryRepository.getByCommentId(commentId, req.user._id); // crear en itineraryRepository
        if(!itinerary) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }

        itinerary.comments.id(commentId).remove();
        await itinerary.save();
        res.status(200).json({
            success: true,
            response: itinerary.comments
        });

    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    }
};

const editComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const { text } = req.body;
        const itinerary = await itineraryRepository.getByCommentId(commentId, req.user._id);
        if(!itinerary) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }

        itinerary.comments.id(commentId).set({ text });
        await itinerary.save();

        res.status(200).json({
            success: true,
            response: itinerary.comments
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

const like = async (req, res) => {
    try {
        const itinerary = await itineraryRepository.getItineraryById(req.params.id);
        if(!itinerary) {
            res.status(404).json({
                ok: false,
                message: 'Itinerary not found in database'
            });
        }
        const userId = req.user._id.toString();
        if(itinerary.usersLike.includes(userId)) {
            itinerary.usersLike = itinerary.usersLike.filter(userLike => userLike !== userId); // remove like
        } else {
            itinerary.usersLike = [...itinerary.usersLike, userId]; // add like
        }

        itinerary.likes = itinerary.usersLike.length;
        await itinerary.save();
        res.status(200).json({
            success: true,
            response: {
                likes: itinerary.likes,
                liked: itinerary.usersLike.includes(userId)
            }
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
}

module.exports = {
    getItineraries,
    getItinerariesByCityId,
    checkUser,
    addComment,
    deleteComment,
    editComment,
    like
};