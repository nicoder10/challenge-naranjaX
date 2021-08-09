const { User, response } = require('../userModule');

const createUser = async (req, res) => {
    const body = req.body;

    const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        mail: body.mail,
        password: body.password,
        userPic: body.userPic,
        country: body.country
    });

    //check if user already exists in database
    const exists = await newUser.findOne({ mail: mail });
    
    if (exists) res.json({ message: 'User already exists in database'})
    else await newUser.save()
            .then((newUser) => res.status(200).json({ message: 'User created successfully', user: newUser }))
            .catch((err) => res.status(500).send('Internal server error'));   
};

module.exports = {
    createUser
};