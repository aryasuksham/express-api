const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
require("dotenv").config();



//---------Function for random string----------
function randomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_$';
    const charactersLength = characters.length;

    for (let counter = 0; counter < length; counter++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//-------------------------------------------------To sign-up for a new user---------------------------------------------------
const signup = (req, res) => {
    const { firstName, lastName, email, phoneNumber, gender, password, countryCode, addressLine1, addressLine2, city, state, pinCode } = req.body;

    if (!firstName || !lastName || !(!!email || !!phoneNumber) || !gender || !password || !countryCode || !addressLine1 || !addressLine2 || !city || !state) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(522).json({ error: "User already exists...Try with another email id" })
            }
            User.findOne({ phoneNumber: phoneNumber })
                .then((savedUser) => {
                    if (savedUser) {
                        return res.status(522).json({ error: "User already exists...Try with another phone number" })
                    } else {
                        const str = randomString(5);
                        const fNameLength = firstName.length;
                        function username(firstName) {
                            if (fNameLength <= 3) {
                                const userName = (firstName + str).toLowerCase();
                                return userName;
                            } else {
                                const slicedName = firstName.slice(0, 3);
                                const userName = (slicedName + str).toLowerCase();
                                return userName;
                            }
                        }
                        const userName = username(firstName);

                        console.log("uname: ", userName);
                        const token = jwt.sign({ email }, process.env.TOKENKEY)
                        //console.log("Token: ", token);

                        bcrypt.hash(password, 5)
                            .then(hashedPassword => {
                                const newUser = new User({
                                    firstName,
                                    lastName,
                                    userName: userName,
                                    email,
                                    phoneNumber: null,
                                    gender,
                                    password: hashedPassword,
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
                                        console.log("new user added");
                                        res.json({ token })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                            )
                    }
                }
                )
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
        return res.status(422).json({ error: "Enter email or password" })
    }
    console.log("userrr");
    bcrypt.hash(password, 5)
        .then(hashedPassword => {
            User.findOne({
                $or: [{
                    "email": emailOrPhone
                }, {
                    "phoneNumber": emailOrPhone
                }//, {
                    //"userName": emailOrPhone
                    //  }
                ]
            }).then(savedUser => {
                if (!savedUser) {
                    return res.status(422).json({ Error: "Your email/phone number or password is incorrect.Check the details again." })
                } else if (hashedPassword === savedUser.password) {

                    console.log("User logged in successfully");
                    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKENKEY);
                    savedUser.accessToken = token;
                    res.json({ token });
                } else {
                    return res.status(422).json({ Error: "Your email/phone number or password is incorrect.Check the details again." })
                }
            }).catch(err => {
                console.log("Error:", err);
            })
        })
}






module.exports = { signup, login };




// { "firstName":"Suk",
// "lastName":"Arya",
// "email":"s@gmail.com",
// "phoneNumber":"9876543284",
// "gender":"female",
// "password":"suk",
// "countryCode":"+91",
// "addressLine1": "addressLine1",
// "addressLine2": "addressLine2",
// "city": "city",
// "state": "state"
//  }


// {
//     "emailOrPhone":"s@gmail.com",
//     "password":"suk"
// }