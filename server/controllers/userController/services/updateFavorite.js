const { response } = require('../userModule');
const userRepository = require('../../../repositories/userRepository');

const addFavorite = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user._id;

        const userInDb = await userRepository.getUserById(userId);
        if(!userInDb) {
            res.status(404).json({
                ok: false,
                message: 'User not found in database'
            });
        }
        userInDb.favorites.push(id);

        // Store
        await userRepository.create(userInDb);
        res.status(200).json({
            ok: true,
            message: 'Favorite itinerary stored successfully'
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
    addFavorite
};