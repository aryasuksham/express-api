const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

require("dotenv").config();
app.use(express.json());
app.use(cors())

const dbUri = process.env.MONGOURI;

mongoose.connect(dbUri)
mongoose.connection.on('connected', () => {
    console.log("Connected to mongo DB!");
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err);
})


require('./models/user');


app.use(require('./views/user'))



app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})

