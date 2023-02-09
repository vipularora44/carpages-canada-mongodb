const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const saltrounds=10;
const path=require("path");
const create_User_Model=require("../models/userData_model");
const create_User_Counter_Model=require("../models/userData_counter_model");
const browser_devices_Model=require("../models/user_Browser_device");
const crypto =require('crypto'); 
const sid='AC2a1865ec5bf87bd0f0d31e007fb11953';
const auth_token='10c39215c4edf82f68625a4315e9b53a';
const twilio=require('twilio');
const client = new twilio(sid,auth_token);
const mail=require('nodemailer');
const { async } = require("@firebase/util");


var transporterMail = mail.createTransport({
   service:'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth:{
      user:'vipularora44@gmail.com',
      pass:'jpzdetzonwoynpgq',
   },
   tls:{
      rejectUnauthorized:false
   }
});



const verifyJWT=(req,res,next)=>{
  console.log("VERIFY Working"+JSON.stringify(req.body));
  const token=req.headers["x-access-token"];
  if(!token)
  {
  res.send("You need to give us token,Please give us token next time.");
  }
  else{
     jwt.verify(token,"jWTSecret",(err,decoded)=>{
  
  if(err)
  {
     res.json({auth:false,message:"you failed to get authenticate:"});
  }
  else
  {
     req.user_id=decoded.id;
     next();
  }
     })
  }
  };

           const IS_User_Authentiated = async (req,res)=>{
           
           
            res.json({auth:true,message:"Congrats,You are Authenticated:"});
         };

         
           const GetSign_In = async (req,res) =>{

            console.log("REQ"+JSON.stringify(req.session.vipul));
            console.log("req.cookies"+JSON.stringify(req.session.cookie.vipul));
            if(req.session.vipul)
            {
               res.send({LoggedIn:true,user:req.session.vipul});
               console.log(JSON.stringify(req.session.vipul));
            }
            else
            {
               res.send({LoggedIn:false});
               
            }
         };

         const Post_Sign_In = async (req,res) =>
         {
            const email=req.body.Email;
            const password=req.body.passWord;

            console.log("its working here"+email+password);
            
            const logindata= await create_User_Model.findOne({user_email:email});
            console.log("DATA..."+logindata);
              if(logindata)
               {
                  if(logindata.is_verified === "true")
                  {
                      
                     bcrypt.compare(password , logindata.user_password, (error,resp)=>{
                   
                     if(resp)
                     {   const id=logindata.user_id;
                         const token=jwt.sign({id},"jWTSecret",{
                           expiresIn:7200,
                         });
                       
                         req.session.vipul=logindata;
                         req.session.cookie.vipul=logindata;
                         
                         res.json({auth:true,token:token,result:logindata});
                        
                     }
                    
                     else
                     {
                        res.json({auth:false,message:"Wrong Username and Password"});
                     
                     }
                     
         
                  })
                  }
                  else if(logindata.is_verified === "false")
                  {
                     res.json({is_verified:logindata.is_verified,message:"Your Email is not verified ,verify it first"});
                  }
               
               }
               
               else {
                  res.json({auth:false,message:"User Doesn,t Exist"});
                       }
          
         }



const Insert_User = async (req,res)=>
{
  console.log("BODY"+JSON.stringify(req.body));
    let fileName;
    if(!req.files)
  {
   
     fileName="default_profile_image.jpg";
  }
  else
  {
    fileName=Date.now()+"-"+req.files.image.name;
    let newpath=path.join(process.cwd(),'../src/images/dealer-images',fileName);
    req.files.image.mv(newpath);
  }
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;
  const lotno=req.body.lotno;
  const streetname=req.body.streetname;
  const cityname=req.body.cityname;
  const province=req.body.province;
  const postalcode=req.body.postalcode;
  const contact=req.body.contact;
  const altcontact=req.body.altcontact;
  const usertype=req.body.usertype;
  const isVerified=req.body.isVerified;
  const buyFromHome=req.body.buyFromHome;
  const user_status=req.body.user_status;
  const emailToken=crypto.randomBytes(64).toString("hex");

  bcrypt.hash(password,saltrounds,(err,hash)=>{
    if(err)
    {
       console.log("Error");
       //res.send("Error:"+err);
    } 
  try{
    create_User_Counter_Model.findOneAndUpdate(
        {id:"autoval"},{"$inc":{"seq":1}},{new:true},(err,cd)=>{
            let user_ID;
            if(cd==null)
            {
              const firstTime=new create_User_Counter_Model({id:"autoval",seq:1});
              firstTime.save();
              user_ID=1;
            }
            else
            {
                user_ID=cd.seq;
            }
            const data=  new create_User_Model({
                user_id:user_ID,
                user_email:email,
                user_password:hash,
                user_name:username,
                user_province:province,
                user_cityname:cityname,
                user_lotno:lotno,
                user_streetname:streetname,
                user_postalcode:postalcode,
                user_contactno:contact,
                alternate_contact:altcontact,
                user_image:fileName,
                user_type:usertype,
                buy_from_home:buyFromHome,
                is_verified:isVerified,
                email_token:emailToken,
                user_status:user_status,
            });
           data.save();
           res.send("User Saved");

           var mailOptions={
            from:'vipularora44@gmail.com',
            to:useremail,
            subject:'carpgaes-canada - verify your email',
            html:`<h2> ${username}! Thanks for registering on our site </h2>
                  <h4>Please verify your email to continue ....</h4>
                  <a href="http://${req.headers.host}/users/confirm_email?email=${useremail}&token=${emailToken}"> verify your email by clicking here </a>
          
                  `  
           }

           transporterMail.sendMail(mailOptions,function(error,info)
           {
              if(error)
              {
                  console.log(error);
              }
              else
              {
                 console.log("verification email sent to your email account ");
              }
           });
        }
    )
     
      
  }
  catch(err)
  {
  console.log("err"+err);
  }
   });
}

const confirm_email=async(req,res)=>{
                  
                  
   const token=req.query.token;
   const email=req.query.email;
   console.log(email+"token........"+token);
try
{  
    create_User_Counter_Model.find({user_email:email},(err,result)=>
   {
      if(err)
      {
         console.log("ERROR 1"+err);
      }
      else{
         console.log("1  false........");
         console.log("Result"+JSON.stringify(result));
         if(result[0].is_verified === "true")
         {
            console.log(" 2  false........");
            res.redirect("http://carpages-canada-sql-frnt.onrender.com/signin");
         }
         else if(result[0].email_token === token && result[0].is_verified === "false")
         {     console.log("3   false........");
               create_User_Counter_Model.findOneAndUpdate({user_email:email},{$set:{is_verified:"true"}},(err,result)=>
               {
                  if(err)
                  {
                     console.log("ERROR 2"+err);
                  }
                 else if(result)
                  {
                     
                     res.redirect("http://carpages-canada-sql-frnt.onrender.com/signin");
                  }
               });
         }
        
      }
   });
}
catch(err)
{
   console.log("ERROR "+err);
}

  }

const Logout =async(req,res)=>
{
   console.log("Logout Body"+JSON.stringify(req.body));
   console.log("logout Working");
    // req.session.destroy();
   
      res.clearCookie('vipul',{path:"/",domain:'carpages-canada-sql-frnt.onrender.com'});
 

   res.send('user logout successfully');
} 

const getDealerDetails=async(req,res)=>
{
   console.log("Body..."+JSON.stringify(req.body));
  const user_Id=req.body.userId;

  try
  {
   const data = await create_User_Model.findOne({user_id:user_Id});
   res.send([data]);
  }
  catch(err)
  {

  }
}

const getAll_Users =async(req,res)=>
{
 
   try
   {
    const data = await create_User_Model.find();
    res.send(data);
   }
   catch(err)
   {
 
   }
}


const Dealerbycity =async(req,res)=>
{
   console.log("cityname.."+req.body.cityname);
   try
   {
    const data = await create_User_Model.find({user_cityname:req.body.cityname});
    res.send(data);
   }
   catch(err)
   {
 
   }
}


const Dealerbyprovince =async(req,res)=>
{
 console.log("province.."+req.body.province);
   try
   {
    const data = await create_User_Model.find({user_province:req.body.province});
    res.send(data);
   }
   catch(err)
   {
 
   }
}

const getDealerByCity =async(req,res)=>
{
   console.log("getDealerByCity"+JSON.stringify(req.body));
   try
   {
    const data = await create_User_Model.find({user_cityname:req.body.city_name,user_name:{'$regex': req.body.dealer_name, '$options' : 'i'}});
    res.send(data);
   }
   catch(err)
   {
 
   }
}

const getDealerByProvince =async(req,res)=>
{
  console.log("getDealerByProvince"+JSON.stringify(req.body));
 try
   {
    const data = await create_User_Model.find({user_province:req.body.req.body.province,user_name:{'$regex': req.body.dealer_name, '$options' : 'i'}});
    res.send(data);
   }
   catch(err)
   {
 
   }
}

const getDealerByOnlyName =async(req,res)=>
{
 
   try
   {
    const data = await create_User_Model.find({user_name:{'$regex': req.body.dealer_name, '$options' : 'i'}});
    res.send(data);
   }
   catch(err)
   {
 
   }
}

const getDealerByAlphabet =async(req,res)=>
{
 console.log("getDealerByAlphabet"+JSON.stringify(req.body));
 const alphabet=req.body.alphabet;
   try
   {
    const data = await create_User_Model.find({user_name:{$regex: "^"+alphabet+"",$options:'i'}});
    res.send(data); 
   }
   catch(err)
   {
 
   }
}

const updatetBuyFromHome=async(req,res)=>
{
   console.log("updatetBuyFromHome"+JSON.stringify(req.body));
const ID=req.body.userId;
const B_f_M=req.body.B_f_M;
   try
   {
      console.log("Working");
      const data= await create_User_Model.findByIdAndUpdate({_id:ID},{buy_from_home:B_f_M},function (err, docs)
       {
         if (err){
             console.log(err)
         }
         else{
             console.log("Updated User : ", docs);
         }

      });
      res.send("Data"+data);
   }
   catch(err)
   {
      console.log("Error"+err);
   }
}

const updatetuser=async(req,res)=>
{ 
   console.log("Body>>"+JSON.stringify(req.body));
   const ID=req.body.userId;
   const username=req.body.username;
   const user_email=req.body.email;
   const province=req.body.province;
   const lotno=req.body.lotno;
   const streetname=req.body.streetname;
   const cityname=req.body.cityname;
   const postalcode=req.body.postalcode;
   const contact=req.body.contact;
   const altcontact=req.body.altcontact;
   const imageChanged=req.body.imageChanged;
   
   
  try
   {
      console.log("Working");
      if(imageChanged==="No")
      {
         const data= await create_User_Model.findByIdAndUpdate({_id:ID},{user_name:username,user_email:user_email,user_province:province,
            user_cityname:cityname,user_lotno:lotno,user_streetname:streetname,user_postalcode:postalcode,user_contactno:contact,alternate_contact:altcontact},function (err, docs)
          {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
                
              }
            
         });
      }
      else if(imageChanged==="Yes" && req.files)
      {
                  console.log("Image Name"+req.files.image.name);
                  fileName=Date.now()+"-"+req.files.image.name;
                  let newpath=path.join(process.cwd(),'../src/images/dealer-images',fileName);
                  req.files.image.mv(newpath);
         const data= await create_User_Model.findByIdAndUpdate({_id:ID},{user_name:username,user_email:user_email,user_province:province,
            user_cityname:cityname,user_lotno:lotno,user_streetname:streetname,user_postalcode:postalcode,user_contactno:contact,alternate_contact:altcontact,user_image:fileName},function (err, docs)
          {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
                
              }
            
         });
      }
      
      res.send("Data"+data);
   }
   catch(err)
   {
     console.log("Error"+err);
   }
}

const updatePassword=async(req,res)=>
{
   const ID=req.body.userId;
   const user_pass=req.body.user_pass;
   try
   {
      console.log("Working");
      bcrypt.hash(user_pass,saltrounds,(err,hash)=>{
         if(err)
         {
            res.send("Error:"+err);
         } 
         else
         {
            const data= create_User_Model.findByIdAndUpdate({_id:ID},{user_password:hash},function (err, docs)
            {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log("Updated User : ", docs);
            }
   
          });

          res.send("Data"+data);
         }
        
    
       });
   }
   catch(err)
   {
      console.log("Error"+err);
   }
}


const search_bar=async(req,res)=>
{
    const keyword=req.body.keyword;
    const location=req.body.location;
    
    const Index=location?location.indexOf(","):"";
    console.log("Index....."+Index);
    console.log("Index....."+JSON.stringify(req.body));
    try
   {
      console.log("Conditions"+JSON.stringify(req.body));
      if(Index>0)
      {console.log("Conditions  1");
         const data = await create_User_Model.find({user_name:{'$regex': keyword, '$options' : 'i'},user_cityname:{'$regex': location, '$options' : 'i'}});
         console.log(data);
         res.send(data); 
      }
      else if(Index<0)
      {console.log("Conditions  2");
         const data1 = await create_User_Model.find({user_name:{'$regex': keyword, '$options' : 'i'},user_province:{'$regex': location, '$options' : 'i'}});
         console.log(data1);
         res.send(data1); 
      }
      if(!location)
      {console.log("Conditions  3");
         const data3 = await create_User_Model.find({user_name:{'$regex': keyword, '$options' : 'i'}});
         console.log(data3);
         res.send(data3); 
      }
      
   }
   catch(err)
   {
     console.log(err);
   }
    
}


const sendQueryMessagePhone=async(req,res)=>
{
   console.log(JSON.stringify(req.body));
                  
   const queryName=req.body.queryName;
   const queryYear=req.body.queryYear;
   const queryMake=req.body.queryMake;
   const queryModel=req.body.queryModel;
   const queryPhone_No=req.body.queryPhone_No;
   const queryEmail=req.body.queryEmail;
  
   client.messages.create({
      from:"+17622426073",
      to:"+919646807791",
      body:"Hello "+queryName+" You will be contacted soon for "+queryYear+" "+queryMake+" "+queryModel+" that you are interested in buying on Carpages.ca. Thank you."
   }).then((res)=>
   {
    console.log(res.data);
   }).catch((e)=>{
     console.log(e);
   });


   var mailOptions={
      from:'vipularora44@gmail.com',
      to:"vipularora900318@gmail.com",
      subject:'carpgaes-canada - otp to reset Password',
      html:`<h4>Hello Carpages</h4>
            <h5>${queryName}</h5>
             <p>${queryEmail} has requested for ${queryYear} ${queryMake} ${queryModel}. Please contact with your best feedback </p>
             </p>
            `  
     }
     transporterMail.sendMail(mailOptions,function(error,info)
{
   if(error)
   {
       console.log(error);
   }
   else
   {
      console.log("verification email sent to your email account ");
   }
});
}

const forgotCredentials=async(req,res)=>
{
 var conditions={};
 const phone_number=req.body.phone_number;
 const email=req.body.email;
 if(phone_number)
 {
  conditions.user_contactno=phone_number;
 }
 if(email)
 {
  conditions.user_email=email;
 }

 try
 {
   await create_User_Model.find(conditions,(err,result)=>
   {
      if(err)
      {
         res.send(err);
         console.log("Error"+err);
      }
      else if(result)
      {
         res.send(result);
         console.log("Result"+result);
      }
      else if(!result)
      {
          conditions={};
         if(phone_number)
         {
          conditions.user_contactno=phone_number;
         }
          create_User_Model.find(conditions,(err1,result1)=>
         {
            if(err1)
            {
               res.send(err1);
               console.log("Error"+err1);
            }
            else if(result1)
            {
               res.send(result1);
               console.log("Result"+result1);
            }
            
         });
      }
   })

 }
 catch(err)
 {
   console.log("Error"+err);
 }
}

const otpEmail=async(req,res)=>
{
   console.log(JSON.stringify(req.body));
               const otp=req.body.otp;
               const useremail=req.body.email;
               const fullName=req.body.fullName;
              try 
             {     var mailOptions={
                  from:'vipularora44@gmail.com',
                  to:useremail,
                  subject:'carpgaes-canada - otp to reset Password',
                  html:`<h4>Dear Carpages User</h4>
                        
                         <p>We received a request to access your Carpages Account ${useremail} through your email address. Your Google verification code is:</p>
                         <h2>${otp}</h2>
                         <p>If you did not request this code, it is possible that someone else is trying to access the Carpages Account ${useremail}. Do not forward or give this code to anyone.
                         </p>
                        `  
                 }
  
                 transporterMail.sendMail(mailOptions,function(error,info)
                 {
                    if(error)
                    {
                        console.log(error);
                    }
                    else
                    {
                       console.log("OTP sent to your email account ");
                    }
                 });
                 
}
                 catch(err)
                 {
                  console.log(error);
                 }
}

var DeviceDetails={};;
const userDeviceInfo=async(req,res,next)=>
{
  
   //console.log(JSON.stringify(req.session))
   req.session.useragent= {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform
    }
    DeviceDetails=req.session.useragent
 if(DeviceDetails)
 {
    res.send([DeviceDetails]);
 }

}


const InsertuserDeviceInfo=async(req,res)=>
{
   console.log(JSON.stringify(req.body));
   console.log("DeviceDetails"+JSON.stringify(DeviceDetails));
 
    const userId=req.body.userId;
    const Browser= DeviceDetails.browser;
    const version= DeviceDetails.version;
    const os= DeviceDetails.os;
    const platform=DeviceDetails.platform;
      let date_time = new Date();
      let date = ("0" + date_time.getDate()).slice(-2);

      // get current month
      let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

      // get current year
      let year = date_time.getFullYear();
    
   var conditions={};
   var conditions2={};

   if(userId)
   {
      conditions.user_id=userId;
   }
   if(Browser)
   {
      conditions.browser_info=Browser;
   }
   if(version)
   {
      conditions.browser_version=version;
   }
   if(os)
   {
      conditions.operating_system=os;
   }

   if(userId)
   {
      conditions2.user_id=userId;
   }
   if(Browser)
   {
      conditions2.browser_info=Browser;
   }
   if(version)
   {
      conditions2.browser_version=version;
   }
   if(os)
   {
      conditions2.operating_system=os;
   }
   if(platform)
   {
      conditions2.platform_info=platform;
   }
   if(year && month && date)
   {
      conditions2.created=new Date();
   }
   if(year && month && date)
   {
      conditions2.last_signin=new Date();
   }
   console.log("Conditions"+"...."+JSON.stringify(conditions));
  
  
   try
   {
     await browser_devices_Model.find(conditions,(err,result)=>
     { 
        if(err)
        {
          //res.send(result);
          console.log(err+"Result"+result.length);
        }
        if(result.length>0)
        {
         const splitDate=JSON.stringify(result[0].last_signin);
         const a=splitDate;
         
         if(new Date() != a)
         {
            console.log("Working...");
            browser_devices_Model.findByIdAndUpdate({_id:result[0]._id},{last_signin:new Date()},(err,result)=>
            {
                  if(!err)
                  {
                     console.log("Sign In Updated");
                  }
            });
         }
        }
        else if(result.length<=0 )
        { 
          const data = new browser_devices_Model(conditions2);
        
          data.save((err,doc)=>
          {
            if(!err)
            {
              res.send(doc);
            }
            else if(err)
            {
               console.log("err"+err);
            }
          });
        } 
     });
   }
   catch(err)
   {
      console.log("Error...."+err);
   }
}

const GetuserDeviceInfo=async(req,res)=>
{
   console.log(JSON.stringify(req.body));
   console.log("GetuserDeviceInfo +++++  DeviceDetails"+JSON.stringify(DeviceDetails));
 
    const userId=req.body.userId;
    
    try
    {
      await browser_devices_Model.find({user_id:userId},(err,result)=>
      {
         if(!err)
         {
            res.send(result);
         }
      });
    }
    catch(err)
    {
      console.log("Error.."+err);
    }
}

const DeleteuserDeviceInfo=async(req,res)=>
{
   const id=req.body.Id;
   try
   {
      await browser_devices_Model.findByIdAndDelete({_id:id},(err,result)=>
      {


         console.log("Result"+result.length+"..."+JSON.stringify(result));
         if(!err)
         {
              res.send({Message:"Device Deleted.."});
         }
      });
   }
   catch(err)
   {

   }
}




module.exports={Insert_User,IS_User_Authentiated,GetSign_In,Post_Sign_In,verifyJWT,Logout,getDealerDetails,getAll_Users,forgotCredentials,
updatePassword,search_bar,sendQueryMessagePhone,otpEmail,userDeviceInfo,InsertuserDeviceInfo,GetuserDeviceInfo,DeleteuserDeviceInfo,confirm_email,
Dealerbycity,Dealerbyprovince,getDealerByCity,getDealerByProvince,getDealerByOnlyName,getDealerByAlphabet,updatetBuyFromHome,updatetuser};