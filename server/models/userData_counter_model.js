const mongoose= require("mongoose");


const userData_counter = new mongoose.Schema({

    id:{
        type: String,
        required:true,
      },
      seq:{
        type: Number,
        required:true,
      },
     
},{timestamps:true});

const Demo=mongoose.model("userData_counter",userData_counter);
module.exports = Demo; 