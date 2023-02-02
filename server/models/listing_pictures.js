const mongoose= require("mongoose");


const listing_pictures= new mongoose.Schema({

     id:{
        type: Number,
        required:true,
      },
      listing_id:{
        type: Number,
        required:true,
      },
      image_name:{
        type: String,
        required:true,
      },
      image_id:{
        type: Number,
        required:true,
      },
      image_type:{
        type: String,
        required:true,
      },
},{timestamps:true});

const Demo=mongoose.model("listing_pictures",listing_pictures);
module.exports = Demo; 