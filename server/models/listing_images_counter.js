const mongoose= require("mongoose");


const listings__images_counter = new mongoose.Schema({

     id:{
        type: String,
        required:true,
      },
      seq:{
        type: Number,
        required:true,
      },
     
     
},{timestamps:true});

const Demo=mongoose.model("listings__images_counter",listings__images_counter);
module.exports = Demo; 