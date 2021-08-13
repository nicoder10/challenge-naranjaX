const { User, response } = require('../userModule');
const { validationResult } = require('express-validator');
const userRepository = require('../../../repositories/userRepository');
const bcrypt = require('bcrypt');
const { secretOrKey } = require('../../../keys');

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    try {
        let userInDB = await userRepository.getUserByMail(req.body.email);
        if(userInDB) {
            res.status(400).json({
                ok: false,
                message: `User with mail ${req.body.email} already exists in database`,
            });
        }
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.email,
            password: req.body.password,
            userPic: req.body.userPic,
            country: req.body.country
        });
        // encrypt pass
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(req.body.password, salt);
        await userRepository.createUser(newUser);
        
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: newUser,
        });
        
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error',
            error: e
        });
    };
    
};

const signIn = async (req, res) => {
    try {
        const { email: mail, password} = req.body;

        let user = await userRepository.getUserByMail(mail);
        if(!user) {
            res.status(404).json({
                ok: false,
                message: 'User does not exist'
            });
        }
    
        const correctPassword = bcrypt.compareSync(password, user.password);
        if(!correctPassword) {
            res.status(401).json({
                ok: false,
                message: 'Incorrect password'
            });
        }
        // create jwt payload
        const payload = {
            user: {
                id: user.id,
                username: `${user.firstName} ${user.lastName}`,
                avatarPicture: user.userPic
            }
        };
        // sign jwt
        jwt.sign(payload, secretOrKey, {
            expiresIn: 3600,
        }, (err, token) => {
            if(err) {
                res.json({
                    success: false,
                    message: 'There was an error with the token'
                });
            }
            res.status(200).json({
                success: true,
                response: {
                    message: 'Logged in',
                    token,
                    firstName: user.firstName,
                    userPic: user.userPic
                }
            });
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
    

};

module.exports = {
    createUser,
    signIn
};