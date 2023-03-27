const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
        type: String,
        default: undefined
    },
    phoneNumber: {
        type: String,
        length: 10,
        default: undefined
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    address: [{
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: false
        }
    }],
    accessToken: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })




mongoose.model("User", userSchema);