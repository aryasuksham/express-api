const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');
const product = require('../controllers/productcategory.js');
const admin = require('../controllers/admin.js');
const { authorization } = require("../middleware/auth.js");
/**
 * @swagger
 * /:
 *  get:
 *   summary: Test api
 *   description: This api is just for testing
 *   responses:
 *        200:
 *             description: String 
 */
router.get('/',(req,res)=>{
res.send("hello there.......")
})

/**
 * @swagger
 * /signup:
 *  get:
 *    summary: To register a new user
 *    description: This API registers a new user
 *    responses:
 *         200:
 *              description: accessToken is Returned
 *              content:
 *                 application/json:
 */
router.post('/signup', user.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     parameters:
 *       schema:
 *         type: object
 *         properties:
 *           emailOrPhone: 
 *             type: string
 *           password: 
 *             type: string
 *   summary: To user login
 *   description: This API is used to login the registered user
 *   responses:
 *     200:
 *       description: Response gives the accessToken
 *         content:
 *            application/json:
 *              schema:
 *                type: object  
 *                properties:
 *                  accessToken:
 *                    type: string                             
 */
router.post('/login', user.login)


// router.get('/getcategories', authorization, product.getCategories);

// router.get('/getsubcategories', authorization, product.subCategoriesOfCategory);




module.exports = router;