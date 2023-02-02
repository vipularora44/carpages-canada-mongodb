const mongoose= require("mongoose");


const prices = new mongoose.Schema({

    prices:{
        type: String,
        required:true,
      },
     
     
},{timestamps:true});

const Demo=mongoose.model("prices",prices);
module.exports = Demo; 