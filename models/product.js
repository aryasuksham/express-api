// const mongoose = require("mongoose");


// const productSchema = new mongoose.Schema({
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'ProductCategory'
//     },
//     subCategory: {
//         type: String,
//         required: false
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Seller'
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     highlights: {
//         type: Array
//     },
//     keyFeatures: {
//         type: Array
//     },
//     generalDetails: {
//         type: Array,
//         required: true
//     },
//     manufacturersDetails: {
//         type: String,
//         required: true
//     },
//     packersDetails: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: String,
//         required: true
//     },
//     discount: {
//         type: Number
//     },
//     ratingAndReviews: {
//         rating: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Rating'
//         },
//         reviews: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Reviews'
//         }
//     },
//     returnAvailable: {
//         type: Boolean,
//         default: true
//     },
//     paymentMethod: {
//         type: String,
//         required: true
//     },
//     offersAndCoupons: {
//         partnerOffers: {
//             type: Array
//         },
//         bankOffers: {
//             type: Array
//         },
//         specialPriceOffer: {
//             type: Array
//         }
//     },
//     warranty: {
//         type: Boolean
//     }
// },
//     {
//         timestamps: true
//     })


// mongoose.model("Product", productSchema);