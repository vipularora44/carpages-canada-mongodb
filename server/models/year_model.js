const mongoose= require("mongoose");


const years_1 = new mongoose.Schema({

    years:{
        type: String,
        required:true,
      },
     
     
},{timestamps:true});

const Demo=mongoose.model("years",years_1);
module.exports = Demo; 