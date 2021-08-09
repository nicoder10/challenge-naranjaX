const User = require('../database/models/userModel');

const getAll = async() => await User.find();
const count = async() => await User.count();

module.exports = {
    getAll, 
    count
};