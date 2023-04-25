const mongoose = require("mongoose");


const adminCsvJsonSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   firstName:String,
   lastName:String,
   userName:String,
   email:String
})

mongoose.model("AdminJson",adminCsvJsonSchema);