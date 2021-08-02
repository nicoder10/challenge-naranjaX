const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

// MIDDLEWARES
app.use(express.json({ extended: true }))
app.use(cors());
app.use('/cities', require('./routes/cities'));

// PORT ASSIGNATION
app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
})