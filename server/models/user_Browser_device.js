const mongoose= require("mongoose");


const device_browser = new mongoose.Schema({

    user_id:{
        type: Number,
        required:true,
      },
      browser_info:{
        type: String,
        required:true,
      },
      browser_version:{
        type: String,
        required:true,
      },
      operating_system:{
        type: String,
        required:true,
      },
      platform_info:{
        type: String,
        required:true,
      },
      created:{
        type: Date,
        required:true,
      },
      last_signin:{
        type: Date,
        required:true,
      },
},{timestamps:true});

const Demo=mongoose.model("Device_Browser",device_browser);
module.exports = Demo; 