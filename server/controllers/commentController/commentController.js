const post = require('./services/createComment');
const del = require('./services/deleteComment');
const put = require('./services/putComment');

module.exports = {
    post,
    del,
    put
}