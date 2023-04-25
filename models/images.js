const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image:
    {
        data: Buffer,
        contentType: String
    }
});

mongoose.model("Image", imageSchema);