const express =require("express");
const userRouter =express.Router();

const {Insert_User,verifyJWT,IS_User_Authentiated,Post_Sign_In,GetSign_In,Logout,getDealerDetails,getAll_Users,Dealerbycity,Dealerbyprovince,
    GetuserDeviceInfo,DeleteuserDeviceInfo,confirm_email
,InsertuserDeviceInfo,userDeviceInfo,otpEmail,forgotCredentials,sendQueryMessagePhone,search_bar,getDealerByCity,getDealerByProvince,getDealerByOnlyName,getDealerByAlphabet,updatetBuyFromHome,updatetuser,updatePassword}=require("../controls/user_control");
userRouter.post("/insertuser",Insert_User);
userRouter.get("/isUserAuthenticated",verifyJWT,IS_User_Authentiated)
userRouter.get("/signIn",GetSign_In)
userRouter.post("/signIn",Post_Sign_In)
userRouter.post("/Logout",Logout)
userRouter.post("/getDealerDetails",getDealerDetails)
userRouter.get("/allUsers",getAll_Users)
userRouter.post("/dealerbycity",Dealerbycity)
userRouter.post("/dealerbyprovince",Dealerbyprovince)
userRouter.post("/getDealerByCity",getDealerByCity)
userRouter.post("/getDealerByProvince",getDealerByProvince)
userRouter.post("/getDealerByOnlyName",getDealerByOnlyName)
userRouter.post("/getDealerByAlphabet",getDealerByAlphabet)
userRouter.post("/updatetBuyFromHome",updatetBuyFromHome)
userRouter.post("/updatetuser",updatetuser)
userRouter.post("/updatePassword",updatePassword)
userRouter.post("/search_bar",search_bar)
userRouter.post("/sendQueryMessagePhone",sendQueryMessagePhone)
userRouter.post("/forgotCredentials",forgotCredentials)
userRouter.post("/otpEmail",otpEmail)
userRouter.get("/userDeviceInfo",userDeviceInfo)
userRouter.post("/InsertuserDeviceInfo",InsertuserDeviceInfo)
userRouter.post("/GetuserDeviceInfo",GetuserDeviceInfo)
userRouter.post("/DeleteuserDeviceInfo",DeleteuserDeviceInfo)
userRouter.get("/confirm_email",confirm_email)
module.exports=userRouter;