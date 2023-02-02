const mongoose= require("mongoose");


const watchlist_counter = new mongoose.Schema({

    id:{
        type: String,
        required:true,
      },
      seq:{
        type: Number,
        required:true,
      },
     
},{timestamps:true});

const Demo=mongoose.model("watchlist_counter",watchlist_counter);
module.exports = Demo; 