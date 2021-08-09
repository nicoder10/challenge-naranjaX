const City = require('../database/models/cityModel');

const getAll = async() => await City.getall();
const getByID = async id => await City.getById(id);
const count = async() => await City.count();
const getCityByName = async name => await City.find({name: name});

module.exports = {
    getAll,
    getByID,
    count,
    getCityByName
};