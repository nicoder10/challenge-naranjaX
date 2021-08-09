const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
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
app.use('/cities', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/users', require('./routes/users'));

// PORT ASSIGNATION
app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
})