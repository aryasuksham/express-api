const mongoose = require('mongoose');


const sellerSchema = new mongoose.Schema({
    name: String,
    desc: String,
    rating:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rating'
    }
});

const ratingSchema = new mongoose.Schema({
    name: String,
    desc: String,
    
});

const reviewSchema = new mongoose.Schema({
    name: String,
    desc: String,
    // seller:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Seller'
    // },
    reference:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'model',
        required:true
    },
    model:{
        type:String,
        enum:['Seller','Rating']
    }
    
});

mongoose.model("Review", reviewSchema);

mongoose.model("Rating", ratingSchema);

mongoose.model("Seller", sellerSchema);