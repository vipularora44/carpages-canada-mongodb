const mongoose= require("mongoose");


const listings_counter = new mongoose.Schema({

     id:{
        type: String,
        required:true,
      },
      seq:{
        type: Number,
        required:true,
      },
     
     
},{timestamps:true});

const Demo=mongoose.model("listings_counter",listings_counter);
module.exports = Demo; 