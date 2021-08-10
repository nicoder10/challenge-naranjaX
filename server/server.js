const { app, port } = require('./app');
// PORT ASSIGNATION
app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
})