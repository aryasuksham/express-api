const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");

const productCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        requied: true
    },
    subCategory: {
        type: Array
    },
    status: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)


mongoose.model("ProductCategory", productCategorySchema);
