const get = require('./services/getUsers');
const create = require('./services/createUser');
const put = require('./services/updateFavorite');
const del = require('./services/deleteFavorite');
//const login = require('./services/loginUser');
//const signinls = require('./services/signinls');

module.exports = { 
    get, 
    create, 
    put,
    del 
};