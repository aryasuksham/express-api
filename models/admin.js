const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String
        //default: undefined
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })


mongoose.model("Admin", adminSchema);