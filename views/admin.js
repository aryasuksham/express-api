const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const product = require('../controllers/productcategory.js');
const admin = require('../controllers/admin.js');
const { auth, authorization } = require("../middleware/auth.js");


router.post('/adminsignup', admin.adminSignup);

router.post('/adminlogin', admin.adminLogin);


router.post('/category', authorization, product.productCategory);

router.get('/getcategories', authorization, product.getCategories);

router.get('/getsubcategories', authorization, product.subCategoriesOfCategory);

router.delete('/deletecategories', authorization, product.deleteCategory);

router.patch('/updatecategoryname', authorization, product.updateCategories);



module.exports = router;