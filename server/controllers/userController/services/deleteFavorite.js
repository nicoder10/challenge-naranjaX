const { response } = require("../userModule");
const userRepository = require("../../../repositories/userRepository");

const deleteFavorite = async (req, res) => {
    try {
        const { _id } = req.user;
        const favoriteId = req.params.id;

        // Get the user
        const userInDb = await userRepository.getUserById(_id);
        if(!userInDb) {
            res.status(404).json({
                ok: false,
                message: 'User not found'
            })
        };
        // Get index of the id to delete // Delete
       const favoriteIndex = userDb.favorites.indexOf(favoriteId);
       userInDb.favorites.splice(favoriteIndex, 1);

       // Store
       await userRepository.create(userInDb);
       res.status(200).json({
           ok: true,
           msg: 'Favorite itinerary deleted successfully',
           itineraryId: favoriteId
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
   deleteFavorite
};