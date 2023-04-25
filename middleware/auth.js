const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = mongoose.model("Admin");
const {}= require('../constants');
const multer = require("multer");
require("dotenv").config();


//-------------------------------------------------------------Authorization----------------------------------------------------------------
const authorization = async (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(errorStatus).send("Token Not Found!!")
    }
    const decodedToken = jwt.decode(token);
    if (decodedToken.type === "type1") {
        const verifyAdmin = jwt.verify(token, process.env.ADMINTOKENKEY);
        console.log(verifyAdmin);
        console.log("admin")
        Admin.findOne({ accessToken: token })
        .then(data => {
            const adminId = data._id;
            req.admin=adminId;
            next();
        })
    } else if (decodedToken.type === "type2") {
        const verifyUser = jwt.verify(token, process.env.TOKENKEY);
        console.log(verifyUser);
        console.log("user");
        next();
    } else {
        console.log("Token is wrong!!");
        return res.send("Token is wrong!!")
    }
}

//------------------------------------------------------------Image Upload------------------------------------------------------------------
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "controllers/uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname /*+ "-" + Date.now() + ".jpg"*/)
        }
    })
}).single("file");







module.exports = { authorization, upload };
