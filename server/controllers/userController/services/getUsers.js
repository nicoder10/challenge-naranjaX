const { User, response } = require('../userModule');
const userRepository = require('../../../repositories/userRepository');
const userModel = require('../../../database/models/userModel');

const getUsers = async (req, res) => {
    try {
        const usersDB = await userRepository.getAll();
        const count = await userRepository.count();
        
        if(!usersDB) {
            res.status(401).json({
                ok: false,
                message: 'No users in database'
            });   
        }
        res.status(200).json({
            ok: true,
            message: 'Users',
            response: usersDB,
            total: count
        });

    } catch(e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: e
        });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userDB = await userRepository.getUserById(id);

        if(!userDB) {
            res.status(401).json({
                ok: false,
                message: `User with id ${id} does not exist`,
            });
        }

        res.status(200).json({
            ok: true,
            response: 'User',
            user: userDB
        });

    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

const getUserByQuery = async (req, res) => {
    try {
        const name = req.query.firstName;
        const userDB = await userRepository.getUserByName(name);

        if(!userDB) {
            res.status(401).json({
                ok: false,
                message: `User with name ${name} does not exist`
            });
        }

        res.status(200).json({
            ok: true,
            response: 'User',
            user: userDB
        });
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserByQuery
};