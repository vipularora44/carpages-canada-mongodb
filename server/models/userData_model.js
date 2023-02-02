const mongoose= require("mongoose");


const users = new mongoose.Schema({

    user_id:{
        type: Number,
        required:true,
      },
      user_email:{
        type: String,
        required:true,
      },
      user_password:{
        type: String,
        required:true,
      },
      user_name:{
        type: String,
        required:true,
      },
      user_province:{
        type: String,
        required:true,
      },
      user_cityname:{
        type: String,
        required:true,
      },
      user_lotno:{
        type: String,
        required:true,
      },
      user_streetname:{
        type: String,
        required:true,
      },
      user_postalcode:{
        type: String,
        required:true,
      },
      user_contactno:{
        type: String,
        required:true,
      },
      alternate_contact:{
        type: String,
        required:true,
      },

      user_image:{
        type: String,
        required:true,
      },
      user_type:{
        type: String,
        required:true,
      },

      buy_from_home:{
        type: String,
        required:true,
      },
      is_verified:{
        type: String,
        required:true,
      },
      email_token:{
        type: String,
        required:true,
      },
      user_status:{
        type: String,
        required:true,
      },
      


      
},{timestamps:true});

const Demo=mongoose.model("users",users);
module.exports = Demo; 