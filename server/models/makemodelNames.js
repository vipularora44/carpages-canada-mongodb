const mongoose= require("mongoose");


const makes_Model = new mongoose.Schema({

  makes_name:{
    type: String,
    required:true,
  },
  model_name:{
    type: String,
    required:true,
  },
 
},{timestamps:true});

const Demo=mongoose.model("makes_model",makes_Model);
module.exports = Demo; 