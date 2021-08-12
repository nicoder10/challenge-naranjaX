const { response, userRepository } = require('../authModule');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secretOrKey } = require('../../../keys');

const login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
    }
    
    try {
        const { email, password } = req.body;
        let user = await userRepository.getUserByMail(email);
        // check if user is registered
        if(!user) {
            res.status(400).json({
                ok: false,
                message: 'User does not exist'
            });
        }
        // check if password is correct
        const correctPassword = bcrypt.compareSync(password, user.password);
        if(!correctPassword) {
            res.status(401).json({
                ok: false,
                message: 'Incorrect password'
            });
        }
        // create JsonWebToken
        const payload = {
            user: {
                id: user.id,
                username: `${user.firstName} ${user.lastName}`,
                avatarPicture: user.userPic
            }
        };
        // sign JWT
        jwt.sign(payload, secretOrKey, {
            expiresIn: 3600 
        }, (err, token) => {
            if(err) {
                res.json({
                    success: false,
                    token: 'There was an error'
                });
            }
            res.status(200).json({
                success: true,
                response: {
                    token: token,
                    firstName: user.firstName,
                    userPic: user.userPic
                }
            });
        })
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    }
};

module.exports = {
    login
};