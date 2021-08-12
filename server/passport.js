const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./database/models/userModel');
const passport = require('passport');
const secretOrKey = require('./keys').secretOrKey;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

module.exports = passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.user.id)
            .then((user) => {
                if(user) return done(null, user);
                else return done(null, false);
            })
            .catch((err) => console.log(err));
    })  
);