const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = mongoose.model("Admin");
const bcrypt = require("bcrypt");
const { randomString } = require("../commonfunctions/commons.js");
const { type } = require('os');
require("dotenv").config();


//-------------------------------------------------To sign-up for a new admin---------------------------------------------------
const adminSignup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const type = "type1";
    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    Admin.findOne({ email: email })
        .then((savedAdmin) => {
            if (savedAdmin) {
                return res.status(522).json({ error: "Admin already exists with this email...Try with another email id" })
            } else {
                const str = randomString(5);
                const fNameLength = firstName.length;
                const userName = fNameLength <= 3 ? (firstName + str).toLowerCase() : (firstName.slice(0, 3) + str).toLowerCase();

                console.log("uname: ", userName);
                const token = jwt.sign({ email, type }, process.env.ADMINTOKENKEY)

                bcrypt.hash(password, 5)
                    .then(hashedPassword => {
                        const newAdmin = new Admin({
                            firstName,
                            lastName,
                            userName: userName,
                            email,
                            password: hashedPassword,
                            accessToken: token
                        })
                        newAdmin.save()
                            .then(admin => {
                                console.log("Admin Details:", admin)
                                console.log("New Admin Added");
                                res.json({ token })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    )
            }
        }
        ).catch(err => {
            console.log(err);
        })
}



//--------------------------------------------------------For admin login------------------------------------------------------
const adminLogin = (req, res) => {
    const { emailOrUsername, password } = req.body;
    console.log("reqq", req.body);
    const type = "type1"
    if (!emailOrUsername || !password) {
        return res.status(422).json({ error: "Enter email or password" })
    }
    Admin.findOne({
        $or: [{
            "email": emailOrUsername
        }, {
            "userName": emailOrUsername
        }]
    }).then(savedAdmin => {

        if (!savedAdmin) {
            return res.status(422).json({ Error: "Your email/username or password is incorrect.Check the details again." })
        }
        bcrypt.compare(password, savedAdmin.password)
            .then(doMatch => {
                if (doMatch) {
                    console.log("Admin logged in successfully");
                    const token = jwt.sign({ email: savedAdmin.emailOrUsername, type: type }, process.env.ADMINTOKENKEY);
                    savedAdmin.accessToken = token;
                    savedAdmin.save();
                    res.json({ token });
                } else {
                    return res.status(422).json({ Error: "Your email/phone number or password is incorrect.Check the details again.Password" })
                }
            }).catch(err => {
                console.log("Error:", err);
            })
    }).catch(() => {
        console.log("Admin does not exist!!");
    })
}


module.exports = { adminSignup, adminLogin };


// {
//     "firstName":"Suksham",
//     "lastName":"Arya",
//     "email":"suksham@gmail.com",
//     "password":"suksham"
// }