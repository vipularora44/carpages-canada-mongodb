const mongoose= require("mongoose");


const categories = new mongoose.Schema({

  category_name:{
    type: String,
    required:true,
  },
 
},{timestamps:true});

const Demo=mongoose.model("vehicle_categories",categories);
module.exports = Demo; 