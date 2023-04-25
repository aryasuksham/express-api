const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = mongoose.model("Admin");
const bcrypt = require("bcrypt");
const { randomString } = require("../commonfunctions/commons.js");
const { fieldError, emailPassword, alreadyAdminEmail, wrongIdPassword1, accountNotExists, adminLogin1, errorStatus } = require("../constants");
require("dotenv").config();
const json2csv = require('json-2-csv');
const CsvParser = require('json2csv').Parser;
const csvtojson = require('csvtojson');
const { upload } = require("../middleware/auth");
const AdminJson = mongoose.model('AdminJson');
const XLSX = require('xlsx');



//-------------------------------------------------To sign-up for a new admin---------------------------------------------------
const adminSignup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const type = "type1";
    if (!firstName || !lastName || !email || !password) {
        return res.status(errorStatus).json({ error: fieldError })
    }
    Admin.findOne({ email: email })
        .then((savedAdmin) => {
            if (savedAdmin) {
                return res.status(errorStatus).json({ error: alreadyAdminEmail })
            } else {
                const userName = randomString(firstName, 5);
                // console.log("uname: ", userName);
                const token = jwt.sign({ email, type }, process.env.ADMINTOKENKEY)


                const hashedPasswordResult = hashedPassword(password);
                const newAdmin = new Admin({
                    firstName,
                    lastName,
                    userName: userName,
                    email,
                    password: hashedPasswordResult,
                    accessToken: token
                })
                newAdmin.save()
                    .then(admin => {
                        // console.log("Admin Details:", admin)
                        // console.log(adminAdded);
                        res.json({ token })
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        }).catch(err => {
            console.log(err);
        })
}



//--------------------------------------------------------For admin login------------------------------------------------------
const adminLogin = (req, res) => {
    const { emailOrUsername, password } = req.body;
    // console.log("reqq", req.body);
    const type = "type1"
    if (!emailOrUsername || !password) {
        return res.status(errorStatus).json({ error: emailPassword })
    }
    Admin.findOne({
        $or: [{
            "email": emailOrUsername
        }, {
            "userName": emailOrUsername
        }]
    }).then(savedAdmin => {

        if (!savedAdmin) {
            return res.status(errorStatus).json({ Error: wrongIdPassword1 })
        }
        bcrypt.compare(password, savedAdmin.password)
            .then(doMatch => {
                if (doMatch) {
                    console.log("mmm", adminLogin1);
                    const token = jwt.sign({ email: savedAdmin.emailOrUsername, type: type }, process.env.ADMINTOKENKEY);
                    savedAdmin.accessToken = token;
                    savedAdmin.save();
                    res.json({ token });
                } else {
                    return res.status(errorStatus).json({ Error: wrongIdPassword1 })
                }
            }).catch(err => {
                console.log("Error:", err);
            })
    }).catch(() => {
        console.log(accountNotExists);
    })
}

//---------------------------------------------converting mongodb data into csv format----------------------------------------------
const getAdminsInCsv = async (req, res) => {
    try {
        const admins = [];
        const adminData = await Admin.find({});
        adminData.forEach(admin => {
            const { _id, firstName, lastName, userName, email } = admin;
            admins.push({ _id, firstName, lastName, userName, email })
        })
        const csvFields = ["Id", "FirstName", "LastName", "UserName", "Email"];
        const csvParserobj = new CsvParser({ csvFields });
        // console.log(csvParserobj)
        const csvData = csvParserobj.parse(admins);
        res.setHeader("Content-Type", "text/csv");
        // res.setHeader("Content-Disposition", "attachments: filename=admindata.csv");
        res.status(200).end(csvData);

    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).send(error);
    }

}

//----------------------------------------------------converting csv file to json format---------------------------------------------
const getCsvToJson = async (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                res.send("Error occurred while uploading file");
            }
            csvtojson()
                .fromFile(req.file.path)
                .then((jsonObj) => {
                    // console.log(jsonObj);
                    AdminJson.insertMany(jsonObj)
                        .then(() => { console.log("Record inserted") })
                        .catch(err => console.log(err))
                })
        })
        res.send("file uploaded");
    } catch (error) {
        console.log(error);
    }
}

//---------------------------------------------converting mongodb data to excel file-----------------------------------------------
const getAdminExcel = async (req, res) => {
    try {
        const adminData = await Admin.find({}).lean(true)
        console.log(adminData);
        const workSheet = XLSX.utils.json_to_sheet(adminData);
        const workBook = XLSX.utils.book_new();
        console.log("ws: ", workSheet)
        const path = __dirname + '/uploads/adminExcel80.xlsx';
        console.log("wbb: ", workBook)
        XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
        console.log("dirr: ", workBook)
        XLSX.writeFile(workBook, path);
        res.send("Done");

    } catch (error) {
        console.log(error);
    }
}


const tempArr = [
    {
        _id: '6422a34feec7b050e00dbef3',
        firstName: 'Suksham',
        lastName: 'Arya',
        userName: 'sukns451',
        email: 'suksham@gmail.com',
        password: '$2b$05$nRhtpi9XOVNsh..T7o.jq.ehNrfUuFT.2m3HV/OTi/KXO8lqSUHji',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidHlwZTEiLCJpYXQiOjE2ODA1MjIwNTd9.103ZsOK8m15E8M1ciB0CTBv73Q7MArsf-jeR43n7AGI',
        status: false,
        createdAt: '2023-03-28T08:20:31.229Z',
        updatedAt: '2023-04-03T11:40:57.501Z',
        __v: 0
    },
    {
        _id: '64242af8ba44b68c92243af5',
        firstName: 'Sakshi',
        lastName: 'Arya',
        userName: 'sakycedq',
        email: 'sakshi@gmail.com',
        password: '$2b$05$QRBzqTmywLv9ZYpRa0rhqOuEA5Hvz70dEQkNV49ADWiqEL9NrAlgu',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNha3NoaUBnbWFpbC5jb20iLCJpYXQiOjE2ODAwOTE4OTZ9.jktpRsq6PZ_OOn7A71gIH3yIXMDZrr6ASbhkuRw9eEA',
        status: false,
        createdAt: '2023-03-29T12:11:36.607Z',
        updatedAt: '2023-03-29T12:11:36.607Z',
        __v: 0
    },
    {
        _id: '64242b25ba44b68c92243af8',
        firstName: 'Simran',
        lastName: 'Kaur',
        userName: 'simfek0o',
        email: 'simran@gmail.com',
        password: '$2b$05$iUGz0z6y1Lvvo3gOw7MUN.IBdR1SOw/TorY9cnB1lwo1f25BbtBkq',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidHlwZTEiLCJpYXQiOjE2ODA1MjIyNzd9.SJrbYve2QS3ODL_WmC3OD5KHAndP2FYotrgCtmilBH0',
        status: false,
        createdAt: '2023-03-29T12:12:21.631Z',
        updatedAt: '2023-04-03T11:44:37.441Z',
        __v: 0
    },
    {
        _id: '6425522a4472cdddc9e905c4',
        firstName: 'Kashi',
        lastName: 'Arya',
        userName: 'kascu5cg',
        email: 'kashi@gmail.com',
        password: '$2b$05$6ysqVGIJPpgkvXzI2DIBcentyogz5gDUM2fU4CgK5VoRZ6ln6jj1O',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidHlwZTEiLCJpYXQiOjE2ODA1MjIxODZ9.i0xn2nc52KRG845_5tJkWdfnI2hB-l7zmyJV5p9M0kA',
        status: false,
        createdAt: '2023-03-30T09:11:06.173Z',
        updatedAt: '2023-04-03T11:43:06.333Z',
        __v: 0
    }
]


const roughAttempt = (req, res) => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(tempArr);
    const path = __dirname + '/uploads/adExcel.xlsx';
    XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
    XLSX.writeFile(workBook, path);
    res.send("Done");

}

module.exports = { adminSignup, adminLogin, getAdminsInCsv, getCsvToJson, getAdminExcel, roughAttempt };
