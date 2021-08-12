const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./keys').mongoURI; // import database credentials
const mongoose = require('mongoose'); 

// DATABASE CONNECTION
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB conection established'))
    .catch((err) => console.log(err));

// MIDDLEWARES
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use('/api', require('./routes/cities'));
app.use('/api', require('./routes/itineraries'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/auth'));

module.exports = {
    app,
    port
};