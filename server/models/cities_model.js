const mongoose= require("mongoose");


const locations = new mongoose.Schema({

    city_name:{
        type: String,
        required:true,
      },
      province_name:{
        type: String,
        required:true,
      },
      location_type:{
        type: String,
        required:true,
      },
     
},{timestamps:true});

const Demo=mongoose.model("locations",locations);
module.exports = Demo; 