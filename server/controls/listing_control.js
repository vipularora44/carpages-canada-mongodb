const Listings_counter_Model=require("../models/listing_counter");
const Listings_Model=require("../models/listing_model");
const Listings_Pictures=require("../models/listing_pictures");
const Listings_images_counter_Model=require("../models/listing_images_counter");
const Listings_images_Model=require("../models/listing_images");
const path=require("path");
const {Storage} = require('@google-cloud/storage');
const { bucket } = require("firebase-functions/v1/storage");
//const serviceAccount = require('../service-account-file.json')
const storage = new Storage({
    keyFilename : 'service-account-file.json'
})
const { v4: uuidv4 } = require('uuid');
const Bucket = storage.bucket('gs://carpages-canada-3b271.appspot.com')




const Create_Listings=async(req,res)=>
{
    console.log("BODY....>"+JSON.stringify(req.body));
    console.log("FILES....>"+JSON.stringify(req.files));
    const Sellerid=req.body.Sellerid;
    const Seller_name=req.body.Seller_name;
    const city_name=req.body.city_name;
    const province_name=req.body.province_name;
    const seller_address=req.body.seller_address;
    const make=req.body.make;
    const model=req.body.model;
    const trim=req.body.trim;
    const year=req.body.year;
    const mileage=req.body.mileage;
    const price=req.body.price;
    const vin_no=req.body.vin_no;
    const stock_no=req.body.stock_no;
    const exterior_colour=req.body.exterior_colour;
    const interior_colour=req.body.interior_colour;
    const body_style=req.body.body_style;
    const fuel_type=req.body.fuel_type;
    const drivetrain=req.body.drivetrain;
    const transmission=req.body.transmission;
    const transmission_type=req.body.transmission_type;
    const engine_type=req.body.engine_type;
    const doors=req.body.doors;
    const seats=req.body.seats;
    const vehicle_discription=req.body.vehicle_discription;
    const cc=req.body.cc;
    const power=req.body.power;
    const torque=req.body.torque;
    const fuelcapacity=req.body.fuelcapacity;
    const fuelconsumptioncity=req.body.fuelconsumptioncity;
    const fuelconsumptionhighway=req.body.fuelconsumptionhighway;
    const safety=req.body.safety;
    const assistance=req.body.assistance;
    const lighting=req.body.lighting;
    const infotainment=req.body.infotainment;
    const connectivity=req.body.connectivity;
    const comfort=req.body.comfort;
    const convenience=req.body.convenience;
    const exterior=req.body.exterior;
    const security=req.body.security;
    const vehicle_top_features=req.body.vehicle_top_features;
    const sale_status=req.body.sale_status;
    try
    {
        Listings_counter_Model.findOneAndUpdate(
            {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
                let listing_ID;
                if(cd==null)
                {
                  const firstTime=new Listings_counter_Model({id:"autoval",seq:1});
                  firstTime.save();
                  listing_ID=1;
                }
                else
                {
                    listing_ID=cd.seq;
                }
                const data=  new Listings_Model(
                    {
                    listing_id:listing_ID,
                    seller_id:Sellerid,
                    seller_name:Seller_name,
                    city_name:city_name,
                    province_name:province_name,
                    seller_address:seller_address,
                    make_name:make,
                    model_name:model,
                    trim_name:trim,
                    model_year:year,
                    mileage:mileage,
                    price:price,
                    vin_no:vin_no,
                    stock:stock_no,
                    exterior_color:exterior_colour,
                    interior_color:interior_colour,
                    bodystyle:body_style,
                    fuel_type:fuel_type,
                    drivetrain:drivetrain,
                    transmission:transmission,
                    transmission_type:transmission_type,
                    engine:engine_type,
                    doors:doors,
                    seats:seats,
                    vehicle_description:vehicle_discription,
                    engine_cc:cc,
                    engine_power:power,
                    engine_torque:torque,
                    fuel_capacity:fuelcapacity,
                    fuel_consumption_city:fuelconsumptioncity,
                    fuel_consumption_highway:fuelconsumptionhighway,
                    safety:safety,
                    driver_assistance:assistance,
                    lighting:lighting,
                    infotainment:infotainment,
                    connectivity:connectivity,
                    comfort:comfort,
                    convenience:convenience,
                    exterior:exterior,
                    security:security,
                    vehicle_top_features:vehicle_top_features,
                    sale_status:sale_status,
                
                    
                });
               data.save((err, doc)=>
               {
                if(doc)
                {
                    res.send("Listing Saved"+doc.listing_id);
                    if(req.files)
                    {
                        let firstimage;
                        const uuid = uuidv4();
                        console.log(JSON.stringify(req.files)+"fireBase_Images name");
                        let downloadPath='https://firebasestorage.googleapis.com/v0/b/carpages-canada-3b271.appspot.com/o/images%2Flisting_images%2F';
                        const file = req.files.fireBase_Images;
                        for(let i = 0 ; i < file.length; i++)
                         { 
                            let filename= Date.now()+"-"+file[i].name;
                             Bucket.upload(file[i].tempFilePath,{destination:`images/listing_images/${filename}`,
                            resumable:true,
                            metadata: {
                                metadata: {
                                    firebaseStorageDownloadTokens: uuid,
                                }
                            },
                        }).then((res)=>{
                            console.log(res)
                        })
                          

                           const j=i+1;
                          
                           console.log(firstimage+"filename"+filename);
                            Listings_images_counter_Model.findOneAndUpdate(
                                {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
                                    let ID;
                                    if(cd==null)
                                    {
                                      const firstTime=new Listings_images_counter_Model({id:"autoval",seq:1});
                                      firstTime.save();
                                      ID=1;
                                    }
                                    else
                                    {
                                        ID=cd.seq;
                                    }
                                    if(j === 1)
                                        {
                                            
                                            firstimage="primary";
                                        }
                                        else
                                        { 
                                            firstimage="secondary";
                                        }
                                    console.log("Inside"+firstimage);
                                    const Listing_images_data=new Listings_images_Model(
                                        {
                                            id:ID,
                                            listing_id:listing_ID,
                                            image_name:downloadPath+encodeURIComponent(filename)+"?alt=media&token="+uuid,
                                            image_id:j,
                                            image_type:firstimage,
                                        })
                                        Listing_images_data.save((err,doc)=>
                                        {
                                            if(doc)
                                            {
                                              //res.send("Images Saved.."+doc);
                                            }
                                            else
                                            {

                                            }
                                        });
                                })
                        }
                       
                    }
                    else if(!req.files)
                    {
                        joined_images="default.jfif";
                        for(let i = 0 ; i < 2; i++)
                        { 
                              const j=i+1;
                             
                              if(i === 0)
                              {
                                 firstimage="primary";
                              }
                              Listings_images_counter_Model.findOneAndUpdate(
                                {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
                                    let ID;
                                    if(cd==null)
                                    {
                                      const firstTime=new Listings_images_counter_Model({id:"autoval",seq:1});
                                      firstTime.save();
                                      ID=1;
                                    }
                                    else
                                    {
                                        ID=cd.seq;
                                    }

                                    const Listing_images_data=new Listings_images_Model(
                                        {
                                            id:ID,
                                            listing_id:listing_ID,
                                            image_name:joined_images,
                                            image_id:j,
                                            image_type:firstimage,
                                        })
                                        Listing_images_data.save((err,doc)=>
                                        {
                                            if(doc)
                                            {
                                            //  res.send("Images Saved.."+doc);
                                            }
                                            else
                                            {

                                            }
                                        });
                                })
                        }
                    }

                }
                else if(err)
                {
                    res.send("Error..."+err)
                }

               });
              ;
            }

        )
    }
    catch (error)
    {

    }
    
}

const get_allListings=async(req,res)=>
{
   console.log("ALL LISTINGS WORKING");
    try
    {
        const DATA=await Listings_Model.aggregate([

            {
                $lookup:{

                    from:"listings__images",
                    localField:"listing_id",
                    foreignField:"listing_id",
                    pipeline:[ {$match:{"image_type":"primary"}}],
                    as:"All_Listings"
                }
            },
            
              /*  {
                    $unwind:"$All_Listings"
                },*/
                {
                    $lookup:{
                       from:"users",
                       localField:"seller_id",
                       foreignField:"user_id",
                       as:"Complete"
                    }
                 },
                 
        ]);
        console.log(DATA);
        res.send(DATA); 

    }
    catch(err)
    {
       console.log("ERROR.."+err);
    }
}

const FilterByCityListings=async(req,res)=>
{
    console.log("ALL LISTINGS WORKING"+JSON.stringify(req.body));
    const cityName=req.body.cityname;
    try
    {
        const DATA=await Listings_Model.aggregate([
            { $match: { "city_name": cityName } },
                {
                    $lookup:{

                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                    }
                },
            
                {
                    $lookup:{
                       from:"users",
                       localField:"seller_id",
                       foreignField:"user_id",
                       as:"Complete"
                    }
                 },
                 
        ]);
        console.log(DATA);
        res.send(DATA); 

    }
    catch(err)
    {
       console.log("ERROR.."+err);
    }
}
const FilterByClassListings=async(req,res)=>
{
    console.log("FilterByClassListings"+JSON.stringify(req.body));
    const vehicleClass=req.body.vehicleClass;
    var condition={};
    if(vehicleClass==="Electric")
    {
        condition={"fuel_type": vehicleClass};
    }
    else if(vehicleClass==="Hybrid")
    {
        condition={"fuel_type":{$regex : ""+vehicleClass+"",$options:'i'}};
    }
    else
    {
        condition={ "bodystyle": vehicleClass };
    }
    try
    {
        const DATA=await Listings_Model.aggregate([
            { $match:condition},
                {
                    $lookup:{

                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                    }
                },
            
                {
                    $lookup:{
                       from:"users",
                       localField:"seller_id",
                       foreignField:"user_id",
                       as:"Complete"
                    }
                 },
                 
        ]);
        console.log(DATA);
        res.send(DATA); 

    }
    catch(err)
    {
       console.log("ERROR.."+err);
    }
}

const FilterByMakeListings=async(req,res)=>
{
    console.log("FilterByMakeListings"+JSON.stringify(req.body));
    const makename=req.body.makename;
    try
    {
        const DATA=await Listings_Model.aggregate([
            { $match: { "make_name": makename } },
                {
                    $lookup:{

                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                    }
                },
            
                {
                    $lookup:{
                       from:"users",
                       localField:"seller_id",
                       foreignField:"user_id",
                       as:"Complete"
                    }
                 },
                 
        ]);
        console.log(DATA);
        res.send(DATA); 

    }
    catch(err)
    {
       console.log("ERROR.."+err);
    }
}

const getFilterListings=async(req,res)=>
{
    console.log("getFilterListings"+JSON.stringify(req.body));
    console.log("working here");
    try
    {
                                    const todaysDate = new Date();
                                    const MaxPrice=400000;
                                    const MinPrice=0;
                                    const Maxmileage=350000;
                                    const Minmileage=0;
                                    const AnyMileage=1;
                                    const NewVehicleMileage=999;
                                    
                                    const currentYear = todaysDate.getFullYear();
                                    const cityname=req.body.cityname;
                                    const province=req.body.province;
                                    const allmodels=req.body.allmodels;
                                    const buyfromHome=req.body.buyfromHome;
                                    const bodyStyle=req.body.bodyStyle;   
                                    const makename=req.body.makename;
                                    const modelname=req.body.modelname;
                                    const minyears=parseInt(req.body.minyears);
                                    const maxyears=parseInt(req.body.maxyears);
                                    const minprice=parseInt(req.body.minprice);
                                    const maxprice=parseInt(req.body.maxprice);
                                    const minmileage=parseInt(req.body.minmileage);
                                    const maxmileage=parseInt(req.body.maxmileage);
                                    const transmission=req.body.transmission;
                                    const drivetrain=req.body.drivetrain;
                                    const used_new=req.body.used_new;
                                    const withPictures=req.body.withPictures;
                                    const withPrices=req.body.withPrices;
                                    const imageName='https://firebasestorage.googleapis.com/v0/b/carpages-canada-3b271.appspot.com/o/images%2Flisting_images%2Fdefault.jfif?alt=media&token=3dbb4bb1-5ae3-4348-9d14-585943c0bff7';
                                    
                                    console.log(JSON.stringify(req.body));
                                    console.log("minyears"+minyears);
                                    console.log("maxyears"+maxyears);
                                    console.log("minprice"+minprice);
                                    console.log("maxprice"+maxprice);
                                    console.log("minmileage"+minmileage);
                                    console.log("maxmileage"+maxmileage);
                                    console.log("withPictures"+withPictures);
                                    console.log("withPrices"+withPrices);
                                    var conditions = {};
                                    var conditions1 = {};
                                    var conditions2 = {};
                                    if(!cityname=="")
                                    {
                                       conditions.city_name=cityname;
                                    }
                                    if(!province=="")
                                    {
                                       conditions.province_name=province;
                                    }
                                    if(!bodyStyle=="")
                                    {
                                       conditions.bodystyle=bodyStyle;
                                    }
                                    if(modelname.length==[] && makename.length!=[])
                                    {
                                       conditions.make_name={$in:makename};
                                    }
                                    else if(modelname.length!=[])
                                    {
                                       conditions.model_name={$in:modelname};
                                    }
                                    if(!isNaN(minyears) && !isNaN(maxyears))
                                    {
                                        console.log("Fisrt Working");
                                       conditions.model_year={ $gte:minyears,$lte:maxyears};
                                    }
                                    else if(!isNaN(minyears) && isNaN(maxyears))
                                    {
                                        console.log("second Working");
                                       conditions.model_year={$gte:minyears,$lte:maxyears};
                                    }
                                    else if(isNaN(minyears) && !isNaN(maxyears))
                                    {
                                        console.log("third Working");
                                       const  MINYEAR=1950;
                                       conditions.model_year={$gte:MINYEAR,$lte:maxyears};
                                    }
                                    if(!isNaN(minprice) && !isNaN(maxprice) )
                                    {
                                        console.log("FIRST 1");
                                       conditions.price={$gte:minprice,$lte:maxprice};
                                    
                                    }
                                    else if(!isNaN(minprice) && isNaN(maxprice) )
                                    {
                                        console.log("2");
                                        conditions.price={$gte:minprice,$lte:MaxPrice};
                                    }
                                    else if(isNaN(minprice) && !isNaN(maxprice))
                                    {
                                        console.log("3");
                                       conditions.price={$gte:MinPrice,$lte:maxprice};
                                    }
                                    if(!isNaN(minmileage) && !isNaN(maxmileage))
                                    {
                                        conditions.mileage={$gte:minmileage,$lte:maxmileage};
                                    }
                                    else if(!isNaN(minmileage) && isNaN(maxmileage) )
                                    {
                                       conditions.mileage={$gte:minmileage,$lte:Maxmileage};
                                    }
                                    else if(isNaN(minmileage) && !isNaN(maxmileage) )
                                    {
                                        conditions.mileage={$gte:AnyMileage,$lte:maxmileage};
                                    }
                                    if(drivetrain!="")
                                    {
                                       conditions.drivetrain=drivetrain;
                                    }
                                    if(transmission==="Automatic" || transmission==="Manual")
                                    {
                                       conditions.transmission=transmission;
                                    }
                                    if(transmission==="Any")
                                    {
                                       conditions.transmission={$in:["Automatic","Manual"]};
                                    }
                                    if(used_new ==="new")
                                    {
                                       conditions.mileage={$gte:parseInt(AnyMileage),$lte:parseInt(NewVehicleMileage)};
                                    }
                                    if(used_new ==="used")
                                    {
                                        conditions.mileage={$gte:parseInt(NewVehicleMileage),$lte:parseInt(Maxmileage)};
                                    }
                                    if(used_new ==="any")
                                    {
                                        conditions.mileage={$gte:AnyMileage};
                                    }
                                    if(buyfromHome)
                                    {
                                       conditions1.buy_from_home="yes";
                                    }
                                   
                                    console.log("Conditions"+JSON.stringify(conditions));
                                    console.log("Conditions"+JSON.stringify(conditions1));
                                    console.log("conditions2"+JSON.stringify(conditions2));
        const DATA=await Listings_Model.aggregate([
           
            
            { $match:conditions },
                {
                    $lookup:{

                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:!withPictures?{"image_type":"primary"}:{"image_name":{$ne:imageName.toString(),"image_type":"primary"}}}],
                        as:"All_Listings"
                    }
                },
                
                {
                    $lookup:{
                       from:"users",
                       localField:"seller_id",
                       foreignField:"user_id",
                       pipeline:[ {$match:conditions1}],
                       as:"Complete"
                    }
                 },
                 
                 { $match: {"Complete.0": { "$exists": true } } },
                               
        ]);
        console.log("my_Listing_Data"+DATA);
        res.send(DATA); 

    }
    catch(err)
    {
       console.log("ERROR.."+err);
    }
}



const Find_A_Car=async(req,res)=>
{
   console.log("Body  ->"+JSON.stringify(req.body));
   const MaxPrice=400000;
   const MinPrice=0;
   const cityname=req.body.City_name;
   const province_name=req.body.province_name;
   const makename=req.body.Make_name;
   const modelname=req.body.Model_name;
   const minprice=parseInt(req.body.Min_price);
   const maxprice=parseInt(req.body.Max_price);
   var conditions = {};
   
   if(!cityname=="")
   {
      conditions.city_name=cityname;
   }
   if(!province_name=="")
   {
      conditions.province_name=province_name;
   }
   if(modelname.length==[] && makename.length!=[])
   {
      conditions.make_name=makename;
   }
   else if(modelname.length!=[])
   {
      conditions.model_name=modelname;
   }

   if(!isNaN(minprice) && !isNaN(maxprice) )
   {
       console.log("FIRST 1");
      conditions.price={$gte:minprice,$lte:maxprice};
   
   }
   else if(!isNaN(minprice) && isNaN(maxprice) )
   {
       console.log("2");
       conditions.price={$gte:minprice,$lte:MaxPrice};
   }
   else if(isNaN(minprice) && !isNaN(maxprice))
   {
       console.log("3");
      conditions.price={$gte:MinPrice,$lte:maxprice};
   }

   console.log("Conditions"+JSON.stringify(conditions));
  
try
{
const DATA=await Listings_Model.aggregate([
{ $match:conditions },
{
    $lookup:{

            from:"listings__images",
            localField:"listing_id",
            foreignField:"listing_id",
            pipeline:[ {$match:{"image_type":"primary"}}],
            as:"All_Listings"
            }
},

{
            $lookup:{
            from:"users",
            localField:"seller_id",
            foreignField:"user_id",
          //  pipeline:[ {$match:conditions1}],
            as:"Complete"
}
},
   //     { $match: {"Complete.0": { "$exists": true } } },

]);
console.log(DATA);
res.send(DATA); 
}

catch(err)
{
  console.log(err);
}


}

const getListingDetail=async(req,res)=>
{
const ListingId=req.body.ListingId;
//const userId=req.body.userId;
console.log("my Body..."+JSON.stringify(req.body));
try
{
    const DATA=await Listings_Model.aggregate([
        { $match:{"listing_id":ListingId} },

        //Extra  Code
     /*    {
            $lookup:{
        
                    from:"listings__images",
                    localField:"listing_id",
                    foreignField:"listing_id",
                    pipeline:[ {$match:{"listing_id":ListingId}}],
                    as:"All_Listings"
                    }
        },
        
        {
                    $lookup:{
                    from:"users",
                    localField:"seller_id",
                    foreignField:"user_id",
                    pipeline:[ {$match:{"user_id":userId} }],
                    as:"Complete"
        }
        },
                { $match: {"Complete.0": { "$exists": true } } },*/
        
        ]);
        console.log(DATA);
        res.send(DATA); 
}
catch(err)
{
   console.log(err);
}
}

const getListingImages=async(req,res)=>
{
   const ListingId=req.body.ListingId;

   try
   {
      const data=await Listings_images_Model.find({listing_id:ListingId});
      console.log(data);
      res.send(data); 
   }
   catch(err)
   {

   }
}

const getmoreListings=async(req,res)=>
{
    console.log("BODY.."+JSON.stringify(req.body));
    const userId=req.body.userId;
    const ListingId=req.body.ListingId;
    try
    {
       const data=await Listings_Model.aggregate([
       { $match:{seller_id:userId,listing_id:{$ne:ListingId}} },
       {
           $lookup:{
       
                   from:"listings__images",
                   localField:"listing_id",
                   foreignField:"listing_id",
                   pipeline:[ {$match:{"image_type":"primary"}}],
                   as:"All_Listings"
                   }
       },

       ]).limit(3);
       console.log(data);
      res.send(data); 
    }
    catch(err)
    {
 
    }
}


const getDealerListings=async(req,res)=>
{
    const userId=req.body.userId;
    const ListingId=req.body.ListingId;
    try
    {
       const data=await Listings_Model.aggregate([
       { $match:{seller_id:userId} },
       {
           $lookup:{
       
                   from:"listings__images",
                   localField:"listing_id",
                   foreignField:"listing_id",
                   pipeline:[ {$match:{"image_type":"primary"}}],
                   as:"All_Listings"
                   }
       },

       ]);
     //  console.log(data);
      res.send(data); 
    }
    catch(err)
    {
 
    }
}

const getDealervehicleCount=async(req,res)=>
{
    console.log("vehicle count body"+JSON.stringify(req.body));
    const userId=req.body.userId;
    const body_style=req.body.body_style;
    var data=[];
    try
    {
        if(!body_style)
        {
             data=await Listings_Model.aggregate([
        
                {
                        "$match": {"seller_id": userId
                        }
                },
                {
                        "$group": {"_id": {"make_name": "$make_name"},"COUNT(*)": {"$sum": 1}
                        }
                },
                {
                        "$project": {"make_name": "$_id.make_name","Total": "$COUNT(*)","_id": 0
                        }
                }
                ]);
        }
        else if(body_style)
        {
             data=await Listings_Model.aggregate([
        
                {
                        "$match": {"seller_id": userId,"bodystyle":body_style
                        }
                },
                {
                        "$group": {"_id": {"make_name": "$make_name"},"COUNT(*)": {"$sum": 1}
                        }
                },
                {
                        "$project": {"make_name": "$_id.make_name","Total": "$COUNT(*)","_id": 0
                        }
                }
                ]);
        }
       
       console.log("Veh count"+JSON.stringify(data));
      res.send(data); 
    }
    catch(err)
    {
 
    }
}


const getDealervehicleModelCount=async(req,res)=>
{    console.log("vehicle model body"+JSON.stringify(req.body));
    const userId=req.body.userId;
    const make_name=req.body.make_name;
    const body_style=req.body.bodyStyle;
    try
    {
       const data = await Listings_Model.aggregate([
        
        {
                "$match": {"seller_id": userId,"bodystyle":body_style,"make_name":make_name
                }
        },
        {
                "$group": {"_id": {"model_name": "$model_name"},"COUNT(*)": {"$sum": 1}
                }
        },
        {
                "$project": {"model_name": "$_id.model_name","Total": "$COUNT(*)","_id": 0
                }
        }
        ]);
       console.log(data);
       res.send(data); 
    }
    catch(err)
    {
        console.log(err);
    }
}


const getDealerRefineInventory=async(req,res)=>
{
    const todaysDate = new Date();
    const currentYear = todaysDate.getFullYear();
    const seller_id=req.body.seller_id;
    const bodyStyle=req.body.bodyStyle;
    const selectedMake=req.body.selectedMake;
    const selectedModel=req.body.selectedModel;
    const selectedMinyear=parseInt(req.body.selectedMinyear);
    const selectedMaxyear=parseInt(req.body.selectedMaxyear);
    var conditions={};
   console.log("BODY..."+JSON.stringify(req.body));
   
   if(!isNaN(seller_id))
   {
      conditions.seller_id=seller_id;
     
   }
   if(bodyStyle !=="")
   {
    conditions.bodystyle=bodyStyle;
   }
   if(selectedMake !=="")
   {
    conditions.make_name=selectedMake;
   }
   if(selectedModel !=="")
   {
    conditions.model_name=selectedModel;
   }
   if(!isNaN(selectedMinyear) && !isNaN(selectedMaxyear))
   {
    console.log("works 1");
    conditions.model_year={$gte:selectedMinyear,$lte:selectedMaxyear};
   }
   else if(!isNaN(selectedMinyear) && isNaN(selectedMaxyear))
   {
    console.log("works 2");
    conditions.model_year={$gte:selectedMinyear,$lte:currentYear};
   }
   else if(isNaN(selectedMinyear) && !isNaN(selectedMaxyear))
   {
    console.log("works 3");
    const  MINYEAR=1950;
    conditions.model_year={$gte:MINYEAR,$lte:selectedMaxyear};
   }

try
{
    console.log("Conditions"+JSON.stringify(conditions));
    const data = await Listings_Model.aggregate([
    { $match:conditions },
    {
        $lookup:{
    
                from:"listings__images",
                localField:"listing_id",
                foreignField:"listing_id",
                pipeline:[ {$match:{"image_type":"primary"}}],
                as:"All_Listings"
                }
    },
]);
console.log(data);
res.send(data); 
}
catch(err)
{
console.log(err);
}

}


const search_bar=async(req,res)=>
{
    const keyword=req.body.keyword;
    const location=req.body.location;
    var conditions={};
    const Index=location?location.indexOf(","):"";
    console.log("Index....."+Index);
    


    console.log("Conditions..."+JSON.stringify(req.body));
    try
  {
    if(Index>0)
    {
        const data = await Listings_Model.aggregate([
            { $match:{make_name:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
            {
                $lookup:{
            
                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                        }
            },
            {
                $lookup:{
                from:"users",
                localField:"seller_id",
                foreignField:"user_id",
            
                as:"Complete"
    }},
        ],function ShowResult (err,result)
        { console.log("Result"+result.length);
                                if(result==[] || result.length<=0)
                                {
                                    console.log("working here 1");
                                    Listings_Model.aggregate([
                                        { $match:{model_name:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
                                        {
                                            $lookup:{
                                        
                                                    from:"listings__images",
                                                    localField:"listing_id",
                                                    foreignField:"listing_id",
                                                    pipeline:[ {$match:{"image_type":"primary"}}],
                                                    as:"All_Listings"
                                                    }
                                        },
                                        {
                                            $lookup:{
                                            from:"users",
                                            localField:"seller_id",
                                            foreignField:"user_id",
                                        
                                            as:"Complete"
                                }
                                },
                                    ],function ShowResult1 (err1,result1)
                                    {
                                                        if(result1==[] || result1.length<=0)
                                                       {  
                                                                                             
                                                            console.log("working here 2");
                                                               Listings_Model.aggregate( [
                                                                { $match:{bodystyle:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
                                                                {
                                                                    $lookup:{
                                                                
                                                                            from:"listings__images",
                                                                            localField:"listing_id",
                                                                            foreignField:"listing_id",
                                                                            pipeline:[ {$match:{"image_type":"primary"}}],
                                                                            as:"All_Listings"
                                                                            }
                                                                },
                                                                {
                                                                    $lookup:{
                                                                    from:"users",
                                                                    localField:"seller_id",
                                                                    foreignField:"user_id",
                                                             
                                                                    as:"Complete"
                                                        }
                                                        },
                                                            ],function ShowResult2 (err2,result2)
                                                            {
                                                                           
                                                                             if(result2.length<=0 || result2==[])
                                                                            {
                                                                               console.log("working here 3");
                                                                                Listings_Model.aggregate( [
                                                                                { $match:{transmission:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
                                                                                {
                                                                                    $lookup:{
                                                                                
                                                                                            from:"listings__images",
                                                                                            localField:"listing_id",
                                                                                            foreignField:"listing_id",
                                                                                            pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                            as:"All_Listings"
                                                                                            }
                                                                                },
                                                                                {
                                                                                    $lookup:{
                                                                                    from:"users",
                                                                                    localField:"seller_id",
                                                                                    foreignField:"user_id",
                                                                                 
                                                                                    as:"Complete"
                                                                        }
                                                                        },
                                                                            ],function ShowResult3 (err3,result3)
                                                                            {
                                                                                if(result3.length<=0 || result3==[])
                                                                                {
                                                                                    console.log("working here 4");
                                                                                   
                                                                                    Listings_Model.aggregate( [
                                                                                    { $match:{drivetrain:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
                                                                                    {
                                                                                        $lookup:{
                                                                                    
                                                                                                from:"listings__images",
                                                                                                localField:"listing_id",
                                                                                                foreignField:"listing_id",
                                                                                                pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                as:"All_Listings"
                                                                                                }
                                                                                    },
                                                                                    {
                                                                                        $lookup:{
                                                                                        from:"users",
                                                                                        localField:"seller_id",
                                                                                        foreignField:"user_id",
                                                                                       
                                                                                        as:"Complete"
                                                                                    }
                                                                                    },
                                                                                                ],function ShowResult4 (err4,result4) 
                                                                                                {
                                                                                                    if(result4.length<=0 || result4==[])
                                                                                                    {
                                                                                                
                                                                                                        console.log("working here 5");;
                                                                                                    Listings_Model.aggregate([
                                                                                                    { $match:{vehicle_description:{'$regex': keyword, '$options' : 'i'},city_name:{'$regex': location, '$options' : 'i'}}},
                                                                                                    {
                                                                                                        $lookup:{
                                                                                                    
                                                                                                                from:"listings__images",
                                                                                                                localField:"listing_id",
                                                                                                                foreignField:"listing_id",
                                                                                                                pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                                as:"All_Listings"
                                                                                                                }
                                                                                                    },
                                                                                                    {
                                                                                                        $lookup:{
                                                                                                        from:"users",
                                                                                                        localField:"seller_id",
                                                                                                        foreignField:"user_id",
                                                                                                    
                                                                                                        as:"Complete"
                                                                                            }
                                                                                            },
                        
                                                                                                    ],function ShowResult5 (err5,result5)
                                                                                                    {
                        
                                                                                                        console.log("result3"+JSON.stringify(result5));
                                                                                                        if(result5.length>0)
                                                                                                        {
                                                                                                        
                                                                                                        res.send(result5); 
                                                                                                        }
                        
                                                                                                    });
                                                                                                }
                                                                                                console.log("result4"+JSON.stringify(result4));
                                                                                                if(result4.length>0)
                                                                                                {
                                                                                                
                                                                                                res.send(result4); 
                                                                                                }

                                                                                                }
                                                                                );
        
                                                                            }
                                                                            
                                                                                
                                                                                    console.log("result3"+JSON.stringify(result3));
                                                                                    if(result3.length>0)
                                                                                    {
                                                                                    
                                                                                    res.send(result3); 
                                                                                    }
        
                                                                            }
                                                                            );
                                                                            
                                                                            }
                                                                
                                                                console.log("result2"+JSON.stringify(result2));
                                                                  if(result2.length>0)
                                                                   {
                                                                   
                                                                    res.send(result2); 
                                                                   }
                                                            });
                                                        
                                                       }
        
        
        
        
                                        if(result1.length>0)
                                        {
                                            res.send(result1); 
                                        }
                                    });
                                   
                                }
            console.log("Result"+JSON.stringify(result));
            if(result.length>0)
            {
                res.send(result); 
            }
        } );
        //console.log(data);
    }
    else if(Index<0)
    {
        const data = await Listings_Model.aggregate([
            { $match:{make_name:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
            {
                $lookup:{
            
                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                        }
            },
            {
                $lookup:{
                from:"users",
                localField:"seller_id",
                foreignField:"user_id",
                as:"Complete"
    }
    },
        ],function ShowResult (err,result)
        { console.log("Result"+result);
                                if(result==[] || result.length<=0)
                                {
                                    console.log("working here 1");
                                    Listings_Model.aggregate([
                                        { $match:{model_name:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
                                        {
                                            $lookup:{
                                                    from:"listings__images",
                                                    localField:"listing_id",
                                                    foreignField:"listing_id",
                                                    pipeline:[ {$match:{"image_type":"primary"}}],
                                                    as:"All_Listings"
                                                    }
                                        },
                                        {
                                            $lookup:{
                                            from:"users",
                                            localField:"seller_id",
                                            foreignField:"user_id",
                                            as:"Complete"
                                }
                                },
                                    ],function ShowResult1 (err1,result1)
                                    {
                                                        if(result1==[] || result1.length<=0)
                                                       {  
                                                            console.log("working here 2");
                                                               Listings_Model.aggregate( [
                                                                { $match:{bodystyle:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
                                                                {
                                                                    $lookup:{
                                                                            from:"listings__images",
                                                                            localField:"listing_id",
                                                                            foreignField:"listing_id",
                                                                            pipeline:[ {$match:{"image_type":"primary"}}],
                                                                            as:"All_Listings"
                                                                            }
                                                                },
                                                                {
                                                                    $lookup:{
                                                                    from:"users",
                                                                    localField:"seller_id",
                                                                    foreignField:"user_id",
                                                                    as:"Complete"
                                                        }
                                                        },
                                                            ],function ShowResult2 (err2,result2)
                                                            {
                                                                           
                                                                             if(result2.length<=0 || result2==[])
                                                                            {
                                                                               console.log("working here 3");
                                                                                Listings_Model.aggregate( [
                                                                                { $match:{transmission:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
                                                                                {
                                                                                    $lookup:{
                                                                                
                                                                                            from:"listings__images",
                                                                                            localField:"listing_id",
                                                                                            foreignField:"listing_id",
                                                                                            pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                            as:"All_Listings"
                                                                                            }
                                                                                },
                                                                                {
                                                                                    $lookup:{
                                                                                    from:"users",
                                                                                    localField:"seller_id",
                                                                                    foreignField:"user_id",
                                                                                    as:"Complete"
                                                                        }
                                                                        },
                                                                            ],function ShowResult3 (err3,result3)
                                                                            {
                                                                                if(result3.length<=0 || result3==[])
                                                                                {
                                                                                                    console.log("working here 4");
                                                                                                
                                                                                                    Listings_Model.aggregate( [
                                                                                                    { $match:{drivetrain:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
                                                                                                    {
                                                                                                        $lookup:{
                                                                                                                from:"listings__images",
                                                                                                                localField:"listing_id",
                                                                                                                foreignField:"listing_id",
                                                                                                                pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                                as:"All_Listings"
                                                                                                                }
                                                                                                    },
                                                                                                    {
                                                                                                        $lookup:{
                                                                                                        from:"users",
                                                                                                        localField:"seller_id",
                                                                                                        foreignField:"user_id",
                                                                                                        as:"Complete"
                                                                                                        }
                                                                                                        },
                                                                                                        ],function ShowResult4 (err4,result4) 
                                                                                                        {
                                                                                                            if(result4.length<=0 || result4==[])
                                                                                                            {
                                                                                                        
                                                                                                                console.log("working here 5");;
                                                                                                                            Listings_Model.aggregate([
                                                                                                                            { $match:{vehicle_description:{'$regex': keyword, '$options' : 'i'},province_name:{'$regex': location, '$options' : 'i'}}},
                                                                                                                            {
                                                                                                                                $lookup:{
                                                                                                                            
                                                                                                                                        from:"listings__images",
                                                                                                                                        localField:"listing_id",
                                                                                                                                        foreignField:"listing_id",
                                                                                                                                        pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                                                        as:"All_Listings"
                                                                                                                                        }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                $lookup:{
                                                                                                                                from:"users",
                                                                                                                                localField:"seller_id",
                                                                                                                                foreignField:"user_id",
                                                                                                                            
                                                                                                                                as:"Complete"
                                                                                                                                }
                                                                                                                                },
                                                                                                                            ],function ShowResult5 (err5,result5)
                                                                                                                                {
                                                                                                                                    console.log("result5"+JSON.stringify(result5));
                                                                                                                                    if(result5.length>0)
                                                                                                                                    {
                                                                                                                                    res.send(result5); 
                                                                                                                                    }
                                                                                                                                });

                                                                                                            console.log("result4"+JSON.stringify(result4));
                                                                                                            if(result4.length>0)
                                                                                                            {
                                                                                                            res.send(result4); 
                                                                                                            }
                                                                                                        }
                                                                                                        }
                                                                                    
                                                                                );
                                                                            }
                                                                                    console.log("result3"+JSON.stringify(result3));
                                                                                    if(result3.length>0)
                                                                                    {
                                                                                    res.send(result3); 
                                                                                    }
                                                                            }
                                                                            );
                                                                            }
                                                                console.log("result2"+JSON.stringify(result2));
                                                                  if(result2.length>0)
                                                                   {
                                                                    res.send(result2); 
                                                                   }
                                                            });
                                                       }
        
                                        if(result1.length>0)
                                        {
                                            res.send(result1); 
                                        }
                                    });
                                   
                                }
            console.log("Result"+JSON.stringify(result));
            if(result.length>0)
            {
                res.send(result); 
            }
        } );
    }
    else
    {
        const data = await Listings_Model.aggregate([
            { $match:{make_name:{'$regex': keyword, '$options' : 'i'}}},
            {
                $lookup:{
            
                        from:"listings__images",
                        localField:"listing_id",
                        foreignField:"listing_id",
                        pipeline:[ {$match:{"image_type":"primary"}}],
                        as:"All_Listings"
                        }
            },
            {
                $lookup:{
                from:"users",
                localField:"seller_id",
                foreignField:"user_id",
                as:"Complete"
    }
    },
        ],function ShowResult (err,result)
        { 
            //console.log("Result"+result.length);
                                if(result==[] || result.length<=0)
                                {
                                    console.log("working here 1");
                                    Listings_Model.aggregate([
                                        { $match:{model_name:{'$regex': keyword, '$options' : 'i'}}},
                                        {
                                            $lookup:{
                                        
                                                    from:"listings__images",
                                                    localField:"listing_id",
                                                    foreignField:"listing_id",
                                                    pipeline:[ {$match:{"image_type":"primary"}}],
                                                    as:"All_Listings"
                                                    }
                                        },
                                        {
                                            $lookup:{
                                            from:"users",
                                            localField:"seller_id",
                                            foreignField:"user_id",
                                            as:"Complete"
                                }
                                },
                                    ],function ShowResult1 (err1,result1)
                                    {
                                                        if(result1==[] || result1.length<=0)
                                                       {  
                                                            console.log("working here 2");
                                                               Listings_Model.aggregate( [
                                                                { $match:{bodystyle:{'$regex': keyword, '$options' : 'i'}}},
                                                                {
                                                                    $lookup:{
                                                                
                                                                            from:"listings__images",
                                                                            localField:"listing_id",
                                                                            foreignField:"listing_id",
                                                                            as:"All_Listings"
                                                                            }
                                                                },
                                                                {
                                                                    $lookup:{
                                                                    from:"users",
                                                                    localField:"seller_id",
                                                                    foreignField:"user_id",
                                                                    as:"Complete"
                                                        }
                                                        },
                                                            ],function ShowResult2 (err2,result2)
                                                            {
                                                                           
                                                                             if(result2.length<=0 || result2==[])
                                                                            {
                                                                               console.log("working here 3");
                                                                                Listings_Model.aggregate( [
                                                                                { $match:{transmission:{'$regex': keyword, '$options' : 'i'}}},
                                                                                {
                                                                                    $lookup:{
                                                                                
                                                                                            from:"listings__images",
                                                                                            localField:"listing_id",
                                                                                            foreignField:"listing_id",
                                                                                            pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                            as:"All_Listings"
                                                                                            }
                                                                                },
                                                                                {
                                                                                    $lookup:{
                                                                                    from:"users",
                                                                                    localField:"seller_id",
                                                                                    foreignField:"user_id",
                                                                                    as:"Complete"
                                                                        }
                                                                        },
                                                                            ],function ShowResult3 (err3,result3)
                                                                            {
                                                                                if(result3.length<=0 || result3==[])
                                                                                {
                                                                                    console.log("working here 4");
                                                                                   
                                                                                    Listings_Model.aggregate( [
                                                                                    { $match:{drivetrain:{'$regex': keyword, '$options' : 'i'}}},
                                                                                    {
                                                                                        $lookup:{
                                                                                    
                                                                                                from:"listings__images",
                                                                                                localField:"listing_id",
                                                                                                foreignField:"listing_id",
                                                                                                pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                as:"All_Listings"
                                                                                                }
                                                                                    },
                                                                                    {
                                                                                        $lookup:{
                                                                                        from:"users",
                                                                                        localField:"seller_id",
                                                                                        foreignField:"user_id",
                                                                                        as:"Complete"
                                                                            }
                                                                            },
                                                                                ],function ShowResult4 (err4,result4) 
                                                                                {
                                                                                    if(result4.length<=0 || result4==[])
                                                                                     {
                                                                                        console.log("working here 5");;
                                                                                    Listings_Model.aggregate([
                                                                                    { $match:{vehicle_description:{'$regex': keyword, '$options' : 'i'}}},
                                                                                    {
                                                                                        $lookup:{
                                                                                    
                                                                                                from:"listings__images",
                                                                                                localField:"listing_id",
                                                                                                foreignField:"listing_id",
                                                                                                pipeline:[ {$match:{"image_type":"primary"}}],
                                                                                                as:"All_Listings"
                                                                                                }
                                                                                    },
                                                                                    {
                                                                                        $lookup:{
                                                                                        from:"users",
                                                                                        localField:"seller_id",
                                                                                        foreignField:"user_id",
                                                                                        as:"Complete"
                                                                            }
                                                                            },
                                                                                    ],function ShowResult5 (err5,result5)
                                                                                    {
                                                                                    
                                                                                        console.log("result5"+JSON.stringify(result5));
                                                                                        if(result5.length>0)
                                                                                        {
                                                                                        res.send(result5); 
                                                                                        }
                                                                                    });
                                                                                }
                                                                                console.log("result4"+JSON.stringify(result4));
                                                                                if(result4.length>0)
                                                                                {
                                                                                res.send(result4); 
                                                                                }

                                                                                }
                                                                                );
                                                                            }
                                                                                    console.log("result3"+JSON.stringify(result3));
                                                                                    if(result3.length>0)
                                                                                    {
                                                                                    res.send(result3); 
                                                                                    }
                                                                            }
                                                                            );
                                                                            }
                                                                console.log("result2"+JSON.stringify(result2));
                                                                  if(result2.length>0)
                                                                   {
                                                                    res.send(result2); 
                                                                   }
                                                            });
                                                       }
        
                                        if(result1.length>0)
                                        {
                                            res.send(result1); 
                                        }
                                    });
                                }
            console.log("Result"+JSON.stringify(result));
            if(result.length>0)
            {
                res.send(result); 
            }
        } );
        //console.log(data);
    }
}
catch(err)
{
console.log(err);
}
   
}


const getUserListings=async(req,res)=>
{
   const userId=req.body.userId;

   try
   {
    const data = await Listings_Model.aggregate([
        { $match:{seller_id:userId}},
        {
            $lookup:{
        
                    from:"listings__images",
                    localField:"listing_id",
                    foreignField:"listing_id",
                    pipeline:[ {$match:{"image_type":"primary"}}],
                    as:"All_Listings"
                    }
        },
        {
            $lookup:{
            from:"users",
            localField:"seller_id",
            foreignField:"user_id",
            as:"Complete"
        }
        },
    ]);
   console.log(data);
   res.send(data);
   }
   catch(err)
   {
    res.send(err);
   }

}

const updateListing=async(req,res)=>
{
    console.log(" UpdateListing Body  ====>"+JSON.stringify(req.body));
    const _ID=req.body.objectId;
    const make=req.body.make;
    const model=req.body.model;
    const trim=req.body.trim;
    const year=parseInt(req.body.year);
    const mileage=parseInt(req.body.mileage);
    const price=parseInt(req.body.price);
    const vin_no=req.body.vin_no;
    const stock_no=req.body.stock_no;
    const exterior_colour=req.body.exterior_colour;
    const interior_colour=req.body.interior_colour;
    const body_style=req.body.body_style;
    const fuel_type=req.body.fuel_type;
    const drivetrain=req.body.drivetrain;
    const transmission=req.body.transmission;
    const transmission_type=req.body.transmission_type;
    const engine_type=req.body.engine_type;
    const doors=req.body.doors;
    const seats=req.body.seats;
    const vehicle_discription=req.body.vehicle_discription;
    const cc=req.body.cc;
    const power=req.body.power;
    const torque=req.body.torque;
    const fuelcapacity=req.body.fuelcapacity;
    const fuelconsumptioncity=req.body.fuelconsumptioncity;
    const fuelconsumptionhighway=req.body.fuelconsumptionhighway;
    const safety=req.body.safety;
    const assistance=req.body.assistance;
    const lighting=req.body.lighting;
    const infotainment=req.body.infotainment;
    const connectivity=req.body.connectivity;
    const comfort=req.body.comfort;
    const convenience=req.body.convenience;
    const exterior=req.body.exterior;
    const security=req.body.security;
    const vehicle_top_features=req.body.vehicle_top_features;

  try
  {
    const data=  await Listings_Model.findByIdAndUpdate({_id:_ID},
        {
                        make_name:make,
                        model_name:model,
                        trim_name:trim,
                        model_year:year,
                        mileage:mileage,
                        price:price,
                        vin_no:vin_no,
                        stock:stock_no,
                        exterior_color:exterior_colour,
                        interior_color:interior_colour,
                        bodystyle:body_style,
                        fuel_type:fuel_type,
                        drivetrain:drivetrain,
                        transmission:transmission,
                        transmission_type:transmission_type,
                        engine:engine_type,
                        doors:doors,
                        seats:seats,
                        vehicle_description:vehicle_discription,
                        engine_cc:cc,
                        engine_power:power,
                        engine_torque:torque,
                        fuel_capacity:fuelcapacity,
                        fuel_consumption_city:fuelconsumptioncity,
                        fuel_consumption_highway:fuelconsumptionhighway,
                        safety:safety,
                        driver_assistance:assistance,
                        lighting:lighting,
                        infotainment:infotainment,
                        connectivity:connectivity,
                        comfort:comfort,
                        convenience:convenience,
                        exterior:exterior,
                        security:security,
                        vehicle_top_features:vehicle_top_features,
                       
    
        
    },(err,result)=>
    {
        if(result)
        {
            res.send("Listing Updated"+JSON.stringify(result));
        }
    });
                 
  }
  catch(err)
  {

  }     
}

const deleteListingImages=async(req,res)=>
{
    const _ID=req.body.objectId;
   
  try 
   {
     const data=  await Listings_images_Model.findByIdAndDelete({_id:_ID},(err,result)=>
    {
        if(result)
        {
            res.send("Listing Image Deleted"+JSON.stringify(result));
        }
    });

   }
   catch(err)
   {
    console.log("Error"+err);
   }
}

const updatePrimaryListingImage=async(req,res)=>
{
    console.log("updatePrimaryListingImage"+JSON.stringify(req.body));
    const listingId=req.body.listingId;
  
    const _ID=req.body.objectId;
    

    try
    {
        const data=  await Listings_images_Model.findByIdAndUpdate({_id:_ID},{$set:{image_type:"primary"}},(err,result)=>
        {
            if(result)
            {
                
                Listings_images_Model.updateMany({listing_id:listingId,_id:{$ne:_ID}},{$set:{image_type:"secondary"}},(err,result)=>
                {
                    if(result)
                    {
                        res.send("result"+result);
                    }
                    else if(err)
                    {
                        res.send("Error"+err);
                    }
                }
                );
    
            }
            if(err)
            {
                console.log("Error"+err);
               // res.send("Error"+err);
            }
        });
    }
    catch(err)
    {

    }
    
}

const insert_New_Images=async(req,res)=>
{
   //console.log("insert_New_Images Body>>"+JSON.stringify(req.body));
 //  console.log("insert_New_Images Files>>"+JSON.stringify(req.files));
   const listingId=req.body.Listingid;
   var ImageId=req.body.ImageId;
   try
   {
   // console.log("ImageId "+ImageId+"listingId "+listingId);
    if(req.files)
    {
        const uuid = uuidv4();
        console.log(JSON.stringify(req.files)+"fireBase_Images name");
        let downloadPath='https://firebasestorage.googleapis.com/v0/b/carpages-canada-3b271.appspot.com/o/images%2Flisting_images%2F';
        const file = req.files.fireBase_Images;
        console.log("ImageId "+ImageId+"listingId "+listingId);

        for(let i = 0 ; i < file.length; i++)
         {  
          let filename= Date.now()+"-"+file[i].name;
          Bucket.upload(file[i].tempFilePath,{destination:`images/listing_images/${filename}`,
          resumable:true,
          metadata: {
              metadata: {
                  firebaseStorageDownloadTokens: uuid,
              }
                },
            }).then((res)=>{
                console.log(res)
            })
        
            Listings_images_counter_Model.findOneAndUpdate(
                {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
                    let ID;
                    if(cd==null)
                    {
                      const firstTime=new Listings_images_counter_Model({id:"autoval",seq:1});
                      firstTime.save();
                      ID=1;
                    }
                    else
                    {
                        ID=cd.seq;
                    }
                                          
                    let firstimage="secondary";
                       var j=ImageId++;
                    console.log("j"+j);
                    const Listing_images_data=new Listings_images_Model(
                        {
                            id:ID,
                            listing_id:listingId,
                            image_name:downloadPath+encodeURIComponent(filename)+"?alt=media&token="+uuid,
                            image_id:j,
                            image_type:firstimage,
                        })
                        Listing_images_data.save((err,doc)=>
                        {
                            //console.log("working 11");
                            if(doc)
                            {//  console.log("doc");
                              res.send("Images Saved.."+doc);

                            }
                             if(err)
                            {// console.log("err");
                            // res.send("Images Error.."+err);
                            }
                        });
                })
        }
       
    }
   }
   catch(err)
   {
     console.log("error"+err);
   }
}



const firebase_images=async(req,res)=>
{

    try {
        
        if(req.files) 
        {
            const uuid = uuidv4();
            console.log(JSON.stringify(req.files)+"fireBase_Images name");
         
            const file = req.files.fireBase_Images;
            for(let i = 0 ; i < file.length; i++)
             { 
                const myFirebaseref = await Bucket.upload(file[i].tempFilePath,{destination:`images/${file[i].name}`,
                resumable:true,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    }
                },
            })
               console.log("myFirebaseref"+myFirebaseref);
             }
           
         
    
        }
       


    } catch (error) {
        console.log(error);
    }
}

module.exports={Create_Listings,get_allListings,FilterByCityListings,FilterByClassListings,FilterByMakeListings,getFilterListings,updateListing,
    insert_New_Images,deleteListingImages,updatePrimaryListingImage,getUserListings,search_bar,getDealerRefineInventory,getmoreListings,getListingImages,Find_A_Car,getListingDetail,
    getDealerListings,getDealervehicleCount,getDealervehicleModelCount,firebase_images};