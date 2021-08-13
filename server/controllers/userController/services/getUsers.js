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
};

const getFavorites = async (req, res) => {
    try {
      const { id } = req.params;
      const userInDb = await userRepository.getUserById(id);
  
      if (!userInDb) {
        return res.status(401).json({
          ok: false,
          message: 'User does not exist in database'
        });
      }
  
      res.status(200).json({
        ok: true,
        favorites: userInDb.favorites,
      });
  
    } catch (e) {
      res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: e
      });
    }
  };

const signInls = async (req, res) => {
    try {
      const { _id } = req.user;
      const userInDb = await userRepository.getUserById(_id);
      if(!userInDb) {
          res.status(404).json({
              ok: false,
              message: 'User not found in database'
          });
      }
      res.status(200).json({
        succes: true,
        response: {
          userPic: userInDb.userPic,
          firstName: userInDb.firstName
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
    getUsers,
    getUser,
    getUserByQuery,
    getFavorites,
    signInls
};