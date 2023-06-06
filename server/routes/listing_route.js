const express =require("express");
const ListingRouter =express.Router();

const {Create_Listings,get_allListings,FilterByCityListings,FilterByClassListings,FilterByMakeListings,getFilterListings,Find_A_Car,
    updateListing,getUserListings, search_bar,getDealervehicleCount,getDealervehicleModelCount,getDealerRefineInventory,getListingImages,
    insert_New_Images,updatePrimaryListingImage,deleteListingImages,getListingDetail,getmoreListings,getDealerListings,
    firebase_images}=require("../controls/listing_control");


ListingRouter.post("/insert_listing",Create_Listings)
ListingRouter.post("/updateListing",updateListing)
ListingRouter.get("/get_allListings",get_allListings)
ListingRouter.post("/FilterByCityListings",FilterByCityListings)
ListingRouter.post("/FilterByClassListings",FilterByClassListings)
ListingRouter.post("/FilterByMakeListings",FilterByMakeListings)
ListingRouter.post("/getFilterListings",getFilterListings)
ListingRouter.post("/Find_A_Car",Find_A_Car)
ListingRouter.post("/getListingDetail",getListingDetail)
ListingRouter.post("/getListingImages",getListingImages)
ListingRouter.post("/getmoreListings",getmoreListings)
ListingRouter.post("/getDealerListings",getDealerListings)
ListingRouter.post("/getDealervehicleCount",getDealervehicleCount)
ListingRouter.post("/getDealervehicleModelCount",getDealervehicleModelCount)
ListingRouter.post("/getDealerRefineInventory",getDealerRefineInventory)
ListingRouter.post("/search_bar",search_bar)
ListingRouter.post("/getUserListings",getUserListings)
ListingRouter.post("/updatePrimaryListingImage",updatePrimaryListingImage)
ListingRouter.post("/deleteListingImages",deleteListingImages)
ListingRouter.post("/insert_New_Images",insert_New_Images)
//ListingRouter.post("/firebase_New_Images",firebase_images)
module.exports=ListingRouter;