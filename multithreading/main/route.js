const express = require('express');
const router = express.Router();
const details = require('./controller.js');


router.get('/getdetails',details.getDetails);

// router.get('/getdetails',details.getUpdates);



module.exports = router;