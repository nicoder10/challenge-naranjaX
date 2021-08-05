const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./keys').mongoURI; // import database credentials
const mongoose = require('mongoose'); 

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB conection established'))
    .catch((err) => console.log(err));

// MIDDLEWARES
app.use(express.json({ extended: true }))
app.use(cors());
app.use('/cities', require('./routes/cities'));

// PORT ASSIGNATION
app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
})