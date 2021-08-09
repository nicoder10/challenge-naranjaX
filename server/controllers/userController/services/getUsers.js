const { User, response } = require('../userModule');
const userRepository = require('../../../repositories/userRepository');
const userModel = require('../../../database/models/userModel');

const getUsers = async (req, res) => {
    try {
        const usersDB = await userRepository.getAll();
        const count = await userRepository.count();
        
        if(!usersDB) {
            res.status(401).json({
                message: 'No users in database'
            });   
        }
        res.status(200).json({
            message: 'Users',
            users: usersDB,
            total: count
        });

    } catch(e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

module.exports = {
    getUsers
};