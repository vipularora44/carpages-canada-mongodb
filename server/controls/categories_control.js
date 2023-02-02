
const categoryModel=require("../models/categories_model");
const locationModel=require("../models/cities_model");
const pricesModel=require("../models/price_model");
const yearsModel=require("../models/year_model");
const makesModel=require("../models/makes_model");
const makesModels=require("../models/makemodelNames");

const create_categories = async (req,res)=>{
    const category=req.body.category;

    console.log(category+"...");
    
    try{
        const data= await categoryModel.create({category_name:category});
        //await data.insert();
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const view_All_categories = async (req,res)=>{
    const category=req.body.category;

    console.log(category+"...");
    
    try{
        const data= await categoryModel.find();
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const Update_categories = async (req,res)=>{
    const category=req.body.category;

    console.log(category+"..."+"UPDATE");
    
    try{
        const data= await categoryModel.findOneAndUpdate({category_name:category});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const Delete_categories = async (req,res)=>{
    const category=req.body.category;

    console.log(category+"..."+"DELETE");
    
    try{
        const data= await categoryModel.findOneAndDelete({category_name:category});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}



const create_cites = async (req,res)=>{
    const cityname=req.body.cityname;
    const provinceName=req.body.provinceName;
    const location_type=req.body.location_type;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await locationModel.create({city_name:cityname,province_name:provinceName,location_type:location_type});
        //await data.insert();
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const get_All_cites = async (req,res)=>{
    
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await locationModel.find().sort({"city_name":1});
      
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const getPopularCities=async(req,res)=>
{
    try{
        const data= await locationModel.find({ $or: [ { location_type: "City" }, { location_type: "Major" } ] }).sort({"city_name":1});
      
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const View_cites = async (req,res)=>{
    const cityname=req.body.newcityname;
    const provinceName=req.body.province;
    const location_type=req.body.location_type;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await locationModel.find({province_name:provinceName}).sort({"city_name":1});
      
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const Update_cites = async (req,res)=>{
    const cityname=req.body.newcityname;
    const id=req.body.cityId;
    const provinceName=req.body.provinceName;
    const location_type=req.body.location_type;
    console.log(JSON.stringify(req.body)+"..."+cityname);
    
    try{
        const data= await locationModel.findById(id,
           (err,updateCities)=>{
            updateCities.city_name=cityname;
            updateCities.save();
            res.send("Updated");
        });
        //await data.insert();
        
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const Delete_cites = async (req,res)=>{
    const id=req.body.cityId;
    const provinceName=req.body.provinceName;
    const location_type=req.body.location_type;
    console.log(JSON.stringify(req.body)+"..."+"123");
    
    try{
        const data= await locationModel.findByIdAndDelete(id);
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const create_years = async (req,res)=>{
    const years1=req.body.years_1;
    
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await yearsModel.create({years:years1});
        //await data.insert();
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const get_years = async (req,res)=>{
    const years1=req.body.years_1;
    
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await yearsModel.find().sort ({years:-1});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const update_years = async (req,res)=>{
    const newyears=req.body.newyears;
    const yearsId=req.body.yearsId;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await yearsModel.findByIdAndUpdate({_id:yearsId},{years:newyears});
        //await data.insert();
        res.send("Year Updated");
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const delete_years = async (req,res)=>{
    const yearsId=req.body.yearsId;
    
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await yearsModel.findByIdAndDelete({_id:yearsId});
        //await data.insert();
        res.send("Year Deleted");
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}



const create_prices = async (req,res)=>{
    const pricesadd=req.body.pricesadd;
   
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await pricesModel.create({prices:pricesadd});
        //await data.insert();
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const get_prices = async (req,res)=>{
    const pricesadd=req.body.pricesadd;
   
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await pricesModel.find();
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const update_prices = async (req,res)=>{
    const priceId=req.body.priceId;
    const updateprice=req.body.updateprice;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await pricesModel.findByIdAndUpdate({_id:priceId},{prices:updateprice});
        //await data.insert();
        res.send("Price Updated");
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const delete_prices = async (req,res)=>{
    const priceId=req.body.priceId;
   
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await pricesModel.findByIdAndDelete(priceId);
        //await data.insert();
        res.send("Price Deleted");
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const create_makes = async (req,res)=>{
    const makename=req.body.makename;
   
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModel.create({makes_name:makename});
       
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const find_All_makes = async (req,res)=>{
    const makename=req.body.makename;
   
    console.log(JSON.stringify(req.body)+"...get makes");
    
    try{
        const data= await makesModel.find().sort({"makes_name":1});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const ChoosedMakes = async (req,res)=>{
    const makesarr=req.body.makesarr;
   
    console.log(JSON.stringify(req.body)+"...get makes");
    
    try{
        const data= await makesModels.find({makes_name:makesarr}).sort({"makes_name":1});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}
const Update_makes = async (req,res)=>{
    const newmakename=req.body.newmakename;
    const id=req.body.makeId;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModel.findById(id,(err,updateMake)=>
        {
            updateMake.makes_name=newmakename;
            updateMake.save();
            res.send("Update");
        });
       
      
        
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const Delete_makes = async (req,res)=>{
    const _id=req.body.makeId;
   
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModel.findByIdAndDelete({_id:_id});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}


const create_makes_Models = async (req,res)=>{
    const model=req.body.model;
    const makename=req.body.makename;
    console.log(JSON.stringify(req.body)+"...get models");
    
    try{
        const data= await makesModels.create({makes_name:makename,model_name:model});
        //await data.insert();
        res.send();
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const get_makes_Models = async (req,res)=>{
    const model=req.body.model;
    const makename=req.body.makename;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModels.find({makes_name:makename}).sort({"model_name":1});
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const Delete_makes_Models = async (req,res)=>{
    const model=req.body.model;
    const makename=req.body.makename;
    const modelId=req.body.modelId;
    
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModels.findByIdAndDelete(modelId);
        //await data.insert();
        res.send(data);
        console.log();
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

const Update_makes_Models = async (req,res)=>{
    const model=req.body.newmodel;
    const makename=req.body.makename;
    const modelId=req.body.modelId;
    console.log(JSON.stringify(req.body)+"...");
    
    try{
        const data= await makesModels.findByIdAndUpdate({_id:modelId},{model_name:model}
        );
       
        res.send("Model Updated ");
    }
    catch(err)
    {
    console.log("err"+err);
    }
    
}

module.exports={create_categories,create_cites,get_All_cites,getPopularCities,create_prices,create_years,get_years,update_years,delete_years,
    get_prices,update_prices,delete_prices,create_makes,ChoosedMakes,create_makes_Models,
find_All_makes,view_All_categories,Delete_categories,Update_categories,View_cites,Update_cites,Delete_cites,Update_makes,
Delete_makes,get_makes_Models,Delete_makes_Models,Update_makes_Models};