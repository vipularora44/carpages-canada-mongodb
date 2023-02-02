const express =require("express");
const categoriesRouter =express.Router();
const {create_categories,create_cites,get_All_cites,getPopularCities,create_prices,get_prices,update_prices,delete_prices,create_years,get_years,update_years,delete_years,create_makes,create_makes_Models,
find_All_makes,ChoosedMakes,view_All_categories,Delete_categories,Update_categories,View_cites,Delete_cites,Update_cites,Update_makes,Delete_makes,
get_makes_Models,Delete_makes_Models,Update_makes_Models}
=require("../controls/categories_control");


categoriesRouter.post("/create-category",create_categories);
categoriesRouter.post("/create-cities",create_cites);
categoriesRouter.post("/create-prices",create_prices);
categoriesRouter.get("/getprices",get_prices);
categoriesRouter.post("/updateprices",update_prices);
categoriesRouter.post("/deleteprices",delete_prices);
categoriesRouter.post("/create-years",create_years);
categoriesRouter.get("/years",get_years);
categoriesRouter.post("/updateyears",update_years);
categoriesRouter.post("/deleteyears",delete_years);
categoriesRouter.post("/insertmake",create_makes);
categoriesRouter.post("/insertmodel",create_makes_Models);
categoriesRouter.get("/makes",find_All_makes);
categoriesRouter.post("/getchoosedmakes",ChoosedMakes);

categoriesRouter.get("/viewcategory",view_All_categories);
categoriesRouter.post("/deletevehcategory",Delete_categories);
categoriesRouter.post("/updatevehcategory",Update_categories);
categoriesRouter.get("/onlycities",get_All_cites);
categoriesRouter.get("/popularcities",getPopularCities);
categoriesRouter.post("/getlocations",View_cites);
categoriesRouter.post("/updatelocation",Update_cites);
categoriesRouter.post("/deletelocation",Delete_cites);
categoriesRouter.post("/updatetmake",Update_makes);
categoriesRouter.post("/deletemake",Delete_makes);
categoriesRouter.post("/models",get_makes_Models);
categoriesRouter.post("/deletemodelname",Delete_makes_Models);
categoriesRouter.post("/updateModel",Update_makes_Models);
module.exports=categoriesRouter;

 