const mongoose= require("mongoose");


const watchlist = new mongoose.Schema({

  watchlist_id:{
    type: Number,
    required:true,
  },
  user_id:{
    type: Number,
    required:true,
  },
  listing_id:{
    type: Number,
    required:true,
  },
 
},{timestamps:true});

const Demo=mongoose.model("watchlist",watchlist);
module.exports = Demo;