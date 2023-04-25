const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const { randomString, hashedPassword } = require("../commonfunctions/commons");
const { fieldError, alreadyUserPhone, alreadyUserEmail, wrongIdPassword, emailPassword, accountNotExists, userLogin1, errorStatus } = require("../constants");

require("dotenv").config();


//-------------------------------------------------To sign-up for a new user---------------------------------------------------
const signup = (req, res) => {
    const { firstName, lastName, email, phoneNumber, gender, password, countryCode, addressLine1, addressLine2, city, state, pinCode } = req.body;
    const type = "type2";
    if (!firstName || !lastName || !(!!email || !!phoneNumber) || !gender || !password || !countryCode || !addressLine1 || !addressLine2 || !city || !state) {
        return res.status(errorStatus).json({ error: fieldError })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(errorStatus).json({ error: alreadyUserEmail })
            }
            User.findOne({ phoneNumber: phoneNumber })
                .then((savedUser) => {
                    if (savedUser) {
                        return res.status(errorStatus).json({ error: alreadyUserPhone })
                    } else {
                        userName = randomString(firstName, 5)
                        const token = jwt.sign({ email, type }, process.env.TOKENKEY)
                        const hashedPasswordResult = hashedPassword(password);
                        const newUser = new User({
                            firstName,
                            lastName,
                            userName: userName,
                            email,
                            phoneNumber: null,
                            gender,
                            password: hashedPasswordResult,
                            countryCode,
                            address: {
                                addressLine1: addressLine1,
                                addressLine2: addressLine2,
                                city: city,
                                state: state,
                                pincode: pinCode
                            },
                            accessToken: token
                        })
                        newUser.save()
                            .then(user => {
                                // console.log(userAdded);
                                res.json({ token })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                }).catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}



//--------------------------------------------------------For user login------------------------------------------------------
const login = (req, res) => {
    const { emailOrPhone, password } = req.body;
    console.log("reqq", req.body);
    if (!emailOrPhone || !password) {
        return res.status(errorStatus).json({ error: emailPassword })
    }
    // console.log("user");
    User.findOne({
        $or: [{
            email: emailOrPhone
        }, {
            phoneNumber: emailOrPhone
        }]
    })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(errorStatus).json({ Error: wrongIdPassword })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log(userLogin1);
                        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKENKEY);
                        savedUser.accessToken = token;
                        savedUser.save();
                        res.json({ token });
                    } else {
                        return res.status(errorStatus).json({ Error: wrongIdPassword });
                    }


                }).catch(err => {
                    console.log("Error:", err);
                })
        }).catch(err => {
            console.log(accountNotExists);
        })
}



module.exports = { signup, login };

