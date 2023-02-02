const express =require("express");
const watchlist_router =express.Router();

const {insertWatchList,getUserWatchList,getUserWatchList1,deleteWatchList}=require("../controls/watchlist_control");

watchlist_router.post("/insertWatchList",insertWatchList)
watchlist_router.post("/getUserWatchList",getUserWatchList)
watchlist_router.post("/getUserWatchList1",getUserWatchList1)
watchlist_router.post("/deleteWatchList",deleteWatchList)



module.exports=watchlist_router;