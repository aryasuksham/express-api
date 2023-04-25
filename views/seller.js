const express = require('express');
const router = express.Router();
// const product = require('../controllers/productcategory.js');
const seller = require('../controllers/seller.js');
// const { authorization, upload } = require("../middleware/auth.js");
// const image=require("../controllers/images.js")

router.post('/seller', seller.addseller);

router.get('/seller1', seller.getseller);

router.post('/rating', seller.addrating);

router.get('/rating1', seller.getrating);

router.post('/review', seller.addreview);

// router.get('/review1', seller.getreview);

router.get('/reviews', seller.getreviews);

module.exports = router;