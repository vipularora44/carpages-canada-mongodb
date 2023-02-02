const mongoose= require("mongoose");


const makes = new mongoose.Schema({

  makes_name:{
    type: String,
    required:true,
  },
 
},{timestamps:true});

const Demo=mongoose.model("makes",makes);
module.exports = Demo; 