const express = require('express');
const router = express.Router();
const product = require('../controllers/productcategory.js');
const admin = require('../controllers/admin.js');
const { authorization, upload } = require("../middleware/auth.js");
const image=require("../controllers/images.js")
const pdf=require("../makingpdf/index.js")


router.post('/adminsignup', admin.adminSignup);

router.post('/adminlogin', admin.adminLogin);


router.post('/addcategory', authorization, product.productCategory);

router.get('/getcategories', authorization, product.getCategories);

router.get('/getsubcategories', authorization, product.subCategoriesOfCategory);

router.delete('/permanantlydeletecategories', authorization, product.permanantlyDeleteCategory);

router.patch('/updatecategoryname', authorization, product.updateCategories);

router.patch('/deletecategory', authorization, product.deleteCategory);


router.post('/upload',upload, image.fileUpload);

router.get('/adminscsv',admin.getAdminsInCsv);

router.get('/adminsjson',admin.getCsvToJson);

router.get('/adminexcel',admin.getAdminExcel);

router.get('/invoicepdf',pdf.makinginvoicepdf)


module.exports = router;