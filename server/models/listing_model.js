const mongoose= require("mongoose");


const listings = new mongoose.Schema({

    listing_id:{
        type: Number,
        required:true,
      },
      seller_id:{
        type: Number,
        required:true,
      },
      seller_name:{
        type: String,
        required:true,
      },
      city_name:{
        type: String,
        required:true,
      },
      province_name:{
        type: String,
        required:true,
      },
      seller_address:{
        type: String,
        required:true,
      },
      make_name:{
        type: String,
        required:true,
      },
      model_name:{
        type: String,
        required:true,
      },
      trim_name:{
        type: String,
        required:true,
      },
      model_year:{
        type: Number,
        required:true,
      },
      mileage:{
        type: Number,
        required:true,
      },
      price:{
        type: Number,
        required:true,
      },
      vin_no:{
        type: String,
        required:true,
      },
      stock:{
        type: String,
        required:true,
      },
      exterior_color:{
        type: String,
        required:true,
      },
      interior_color:{
        type: String,
        required:true,
      },
      bodystyle:{
        type: String,
        required:true,
      },
      fuel_type:{
        type: String,
        required:true,
      },
      drivetrain:{
        type: String,
        required:true,
      },
      transmission:{
        type: String,
        required:true,
      },
      transmission_type:{
        type: String,
        required:true,
      },
      engine:{
        type: String,
        required:true,
      },
      doors:{
        type: String,
        required:true,
      },
      seats:{
        type: String,
        required:true,
      },
      
      vehicle_description:{
        type: String,
        required:true,
      },
      engine_cc:{
        type: String,
        required:true,
      },
      engine_power:{
        type: String,
        required:true,
      },
      engine_torque:{
        type: String,
        required:true,
      },
      fuel_capacity:{
        type: String,
        required:true,
      },
      fuel_consumption_city:{
        type: String,
        required:true,
      },
      fuel_consumption_highway:{
        type: String,
        required:true,
      },

      safety:{
        type: String,
        required:true,
      },

      driver_assistance:{
        type: String,
        required:true,
      },

      lighting:{
        type: String,
        required:true,
      },
      infotainment:{
        type: String,
        required:true,
      },
      connectivity:{
        type: String,
        required:true,
      },
      comfort:{
        type: String,
        required:true,
      },
      convenience:{
        type: String,
        required:true,
      },
      exterior:{
        type: String,
        required:true,
      },
      security:{
        type: String,
        required:true,
      },
      vehicle_top_features:{
        type: String,
        required:true,
      },
      sale_status:{
        type: String,
        required:true,
      },

     
},{timestamps:true});

const Demo=mongoose.model("listings",listings);
module.exports = Demo; 