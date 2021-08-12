const User = require('../database/models/userModel');

const getAll = async () => await User.find();
const getUserById = async (id) => await User.findById(id);
const getUserByName = async (name) => await User.findOne({firstName: name});
const getUserByMail = async (mail) => await User.findOne({mail});
const createUser = async (user) => await user.save();
const count = async() => await User.count();

module.exports = {
    getAll,
    getUserById,
    getUserByName,
    getUserByMail,
    createUser, 
    count
};