const watchlist_counter_Model=require("../models/watchlist_counter_model");
const watchlist_Model=require("../models/watchlist_model");
const Listings_Model=require("../models/listing_model");

const insertWatchList=async(req,res)=>
{
   const userId=req.body.userId;
   const listing_Id=req.body.listing_id;
   console.log("watch List"+JSON.stringify(req.body));
   try
   {
    watchlist_counter_Model.findOneAndUpdate(
        {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
            let watchlist_Id;
            if(cd==null)
            {
              const firstTime=new watchlist_counter_Model({id:"autoval",seq:1});
              firstTime.save();
              watchlist_Id=1;
            }
            else
            {
                watchlist_Id=cd.seq;
            }
            console.log("watchlist_Id"+watchlist_Id);
            watchlist_Model.find({user_id:userId,listing_id:listing_Id},function abc (err,result)
            {
                console.log("Result"+JSON.stringify(result)+result.length);
             if(result.length>0)
             {
              res.send([{message:"Listing Already added to watchList"}])
              console.log("Result yes");
             }
             else if(result.length<=0)
             {
                console.log("No Result");
               const data=  new watchlist_Model(
                    {
                        watchlist_id:watchlist_Id,
                        user_id:userId,
                        listing_id:listing_Id,
                    }); 
                    data.save((err, doc)=>
                    {
                                if(doc)
                                {
                                    res.send("WatchList Saved"+doc.listing_id);
                                }
                    })
             }

            } );
                       
                    
        });
   }
   catch(err)
   {
      console.log(err);
   }
}

const getUserWatchList=async(req,res)=>
{ 
    console.log("getUserWatchList")+JSON.stringify(req.body);
    const userID=req.body.userId;
try
{
    const data = await watchlist_Model.find({user_id:userID});
    if(data.length>0)
    {
      console.log("Data"+(data));
      res.send(data);
    }
    else
    {
        res.send({message:"Data not Found"})
    }
    
}
catch(err)
{
    console.log("Error")+err;
}
}

const getUserWatchList1=async(req,res)=>
{  console.log("getUserWatchList11111111"+JSON.stringify(req.body));
    const listings=req.body.listings;
    console.log("getUserWatchList11111111"+listings);
    try
    {
     const data = await Listings_Model.aggregate([
         { $match:{listing_id:{$in:listings}}},
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


const deleteWatchList=async(req,res)=>
{
    console.log("deleteWatchList"+JSON.stringify(req.body));
    const userId=req.body.userId;
    const listing_Id=req.body.listing_id;
    try
{
    const data = await watchlist_Model.findOneAndDelete({user_id:userId,listing_id:listing_Id},(err,result)=>
    {
      if(!err)
      {
        console.log("Result"+result);
        res.send([{message:"Watchlist Deleted"}]);
      }

    });
  
    
}
catch(err)
{
    console.log("Error")+err;
}
}


module.exports={insertWatchList,getUserWatchList,getUserWatchList1,deleteWatchList};