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
    
}
module.exports = {
    createUser
};