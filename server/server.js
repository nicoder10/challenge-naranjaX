const { app, port } = require('./app');
// passport
require('./passport');
// PORT ASSIGNATION
app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
})