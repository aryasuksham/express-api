const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');



router.route('/signup')
    .post(user.signup);

router.route('/login')
    .post(user.login)



module.exports = router;