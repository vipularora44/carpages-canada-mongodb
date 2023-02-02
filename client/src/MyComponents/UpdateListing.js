import React ,{useEffect, useReducer, useState} from 'react'
import AppHeader from './AppHeader.js'
import FooterMain from './FooterMain.js'
import '../Mystyles/updatelisting.css'
import {BiDetail} from 'react-icons/bi';
import {HiSortDescending,HiOutlineDotsVertical} from 'react-icons/hi';
import {MdOutlineFeaturedPlayList,MdAddAPhoto} from "react-icons/md";
import Axios from 'axios';
import demoImg from '../images/dealer-images/demo_img.gif';
import { Link,useNavigate, useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {userInput} from '../actions/index';
const reducer =(state,action)=>
{
  switch(action.type)
  {
    case 'userInput':
      return {...state,[action.field]: action.payload};
      
    default:
      throw new Error();
  }
}


export default function UpdateListing() {
  

const myState=useSelector((state)=>state.setData);
const dispatchR=useDispatch();


  const navigate= useNavigate();
  const [userId,setUserId]=useState("");
  const [userData,setuserData]=useState([]);
  const [updatelistingdata,setupdatelistingdata]=useState([]);
  const [imageGallery,setimageGallery]=useState(false);
  const [imageOpt,setimageOpt]=useState(false);
  const [vehicleImages,setvehicleImages]=useState([]);
  const [imgIndex,setimgIndex]=useState("");
  const [imgIndex1,setimgIndex1]=useState("");
  var Set_updatelistingdata=updatelistingdata;
  const {ListingId}=useParams();
  var CryptoJS = require("crypto-js");
  var bytes1 = CryptoJS.AES.decrypt(ListingId, 'my-secret-key@123');
  var Listing_ID= JSON.parse(bytes1.toString(CryptoJS.enc.Utf8));

  const BodyStyles=[{Body_Style:"Convertible"},{Body_Style:"Sedan"},{Body_Style:"Hatchback"},{Body_Style:"Wheelchair Accessible"},{Body_Style:"Coupe"},{Body_Style:"SUV / Crossover"},{Body_Style:"Motorcycle"},{Body_Style:"Pickup Truck"},{Body_Style:"Commercial"},{Body_Style:"Minivan / Van"},{Body_Style:"Wagon"}];


  useEffect(()=>{
    var Item = JSON.parse(localStorage.getItem('dataItems'));
    console.log("item:"+Item);
    setUserId(Item["userId"]);
    
      Axios.get("http://localhost:3010/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
        console.log(res);
        if(!res.data.auth)
        {
           navigate("/");
        }
       });
       Axios.post("http://localhost:3010/listings/getListingDetail",{ListingId:Listing_ID}).then((res)=>{
        console.log(res.data);
        setupdatelistingdata(res.data);
       });
       VehicleImages();
  
  },[Listing_ID,myState]);
console.log("user_id"+userId);
console.log("userData"+JSON.stringify(userData));

  /*const listing_data={make:"",model:"",trim:"",year:"",mileage:"",price:"",vin_no:"",stock_no:"",exterior_colour:"",interior_colour:"",
  body_style:"",fuel_type:"",drivetrain:"",transmission_type:"",engine_type:"",doors:"",seats:"",vehicle_discription:"",
  cc:"",power:"",torque:"",fuelcapacity:"",fuelconsumptioncity:"",fuelconsumptionhighway:"",vehicle_top_features:""}; 
  const [state,dispatch] = useReducer(reducer,listing_data);*/
 
 
  const [makesList,setmakesList] = useState([]);
  const [modelList,setmodelList] = useState([]);
  const [yearList,setyearList] = useState([]);
  const [sel, setSel]= useState(1);
  const [brakes,setbrakes] = useState("");
  const [getlistingId, setgetlistingId] = useState("");
  const [pictures, setPictures] = useState([]);
   


 useEffect(()=>{
  Axios.get("http://localhost:3010/categories/makes").then((res)=>{
    console.log(res);
    setmakesList(res.data);
  });

  Axios.get("http://localhost:3010/categories/years").then((res1)=>{
    console.log(res1);
    setyearList(res1.data);
  });
  GetListingDetails();
  
 },[buyFromHome,Set_updatelistingdata]);

const [deleteImage,setdeleteImage]=useState('');

console.log("pics=>"+pictures);
useEffect(()=>{

  if(make_name1.length>0)
  {
    console.log("Non state");
    GetModels(make_name1);
  }
  if(myState.make)
  {
    console.log(" state");
    GetModels(myState.make);
  }
  if(pictures.includes(deleteImage))
  {console.log("deleteImage=>"+deleteImage);
     const find=pictures.indexOf(deleteImage);
     console.log("find"+find);
     pictures.splice(find,1);
    setimageOpt(false);
  }
  console.log("pics=>"+pictures);

  


},[make_name1,pictures,deleteImage])

 console.log("GET ID"+getlistingId);
 const [vehsafety,setvehsafety] = useState([]);
 const [vehsafetyID,setvehsafetyID] = useState("");
 const [vehsafetyChecked,setvehsafetyChecked] = useState(false);
 const [vehdriveassistance,setvehdriveassistance] = useState([]);
 const [vehdriveassistanceID,setvehdriveassistanceID] = useState("");
 const [vehdriveassistanceChecked,setvehdriveassistanceChecked] = useState(false);
 const [vehlighting,setvehvehlighting] = useState([]);
 const [vehlightingID,setvehlightingID] = useState("");
 const [vehlightingChecked,setvehlightingChecked] = useState(false);
 const [vehinfotainment,setvehinfotainment] = useState([]);
 const [vehinfotainmentID,setvehinfotainmentID] = useState("");
 const [vehinfotainmentChecked,setvehinfotainmentChecked] = useState(false);
 const [vehconnectivity,setvehconnectivity] = useState([]);
 const [vehconnectivityID,setvehconnectivityID] = useState("");
 const [vehconnectivityChecked,setvehconnectivityChecked] = useState(false);
 const [vehcomfort,setvehcomfort] = useState([]);
 const [vehcomfortID,setvehcomfortID] = useState("");
 const [vehcomfortChecked,setvehcomfortChecked] = useState(false);
 const [vehconvenience,setvehconvenience] = useState([]);
  const [vehconvenienceID,setvehconvenienceID] = useState("");
  const [vehconvenienceChecked,setvehconvenienceChecked] = useState(false);
 useEffect(()=>{
  if(vehsafetyChecked && !vehsafety.includes(vehsafetyID))
  {
    setvehsafety(vehsafety=>[...vehsafety,vehsafetyID]);
    dispatchR(userInput({"safety":vehsafety}));
  }
  else if(!vehsafetyChecked && vehsafety.includes(vehsafetyID))
  {
      const safety=vehsafety.indexOf(vehsafetyID);
      vehsafety.splice(safety,1);
      console.log("safety :"+safety);
      dispatchR(userInput({"safety":vehsafety}));
  }
 
  if(vehdriveassistanceChecked && !vehdriveassistance.includes(vehdriveassistanceID))
  {
    setvehdriveassistance(vehdriveassistance=>[...vehdriveassistance,vehdriveassistanceID]);
    dispatchR(userInput({"driveassistance":mydriver_assistance}));
  }
  else if(!vehdriveassistanceChecked && vehdriveassistance.includes(vehdriveassistanceID))
  {
      const assistance=vehdriveassistance.indexOf(vehdriveassistanceID);
      vehdriveassistance.splice(assistance,1);
      dispatchR(userInput({"driveassistance":vehdriveassistance}));
      console.log("assistance :"+assistance);
  }
  if(vehlightingChecked && !vehlighting.includes(vehlightingID))
  {
    setvehvehlighting(vehlighting=>[...vehlighting,vehlightingID]);
    dispatchR(userInput({"lighting":vehlighting}));
  }
  else if(!vehlightingChecked && vehlighting.includes(vehlightingID))
  {
      const lighting=vehlighting.indexOf(vehlightingID);
      vehlighting.splice(lighting,1);
      dispatchR(userInput({"lighting":vehlighting}));
      console.log("lighting :"+lighting);
  }
  if(vehinfotainmentChecked && !vehinfotainment.includes(vehinfotainmentID))
  {
    setvehinfotainment(vehinfotainment=>[...vehinfotainment,vehinfotainmentID]);
    dispatchR(userInput({"infotainment":vehinfotainment}));
  }
  else if(!vehinfotainmentChecked && vehinfotainment.includes(vehinfotainmentID))
  {
      const infotainment=vehinfotainment.indexOf(vehinfotainmentID);
      vehinfotainment.splice(infotainment,1);
      dispatchR(userInput({"infotainment":vehinfotainment}));
      console.log("infotainment :"+infotainment);
  }
  if(vehconnectivityChecked && !vehconnectivity.includes(vehconnectivityID))
  {
    setvehconnectivity(vehconnectivity=>[...vehconnectivity,vehconnectivityID]);
    dispatchR(userInput({"connectivity":vehconnectivity}));
  }
  else if(!vehconnectivityChecked && vehconnectivity.includes(vehconnectivityID))
  {
      const connectivity=vehconnectivity.indexOf(vehconnectivityID);
      vehconnectivity.splice(connectivity,1);
      dispatchR(userInput({"connectivity":vehconnectivity}));
      console.log("connectivity :"+connectivity);
  }
  if(vehcomfortChecked && !vehcomfort.includes(vehcomfortID))
  {
    setvehcomfort(vehcomfort=>[...vehcomfort,vehcomfortID]);
    dispatchR(userInput({"comfort":vehcomfort}));
  }
  else if(!vehcomfortChecked && vehcomfort.includes(vehcomfortID))
  {
      const comfort=vehcomfort.indexOf(vehcomfortID);
      vehcomfort.splice(comfort,1);
      dispatchR(userInput({"comfort":vehcomfort}));
      console.log("connectivity :"+comfort);
  }
  if(vehconvenienceChecked && !vehconvenience.includes(vehconvenienceID))
    {
      setvehconvenience(vehconvenience=>[...vehconvenience,vehconvenienceID]);
      dispatchR(userInput({"convenience":vehconvenience}));
    }
    else if(!vehconvenienceChecked && vehconvenience.includes(vehconvenienceID))
    {
        const convenience=vehconvenience.indexOf(vehconvenienceID);
        vehconvenience.splice(convenience,1);
        dispatchR(userInput({"convenience":vehconvenience}));
        console.log("connectivity :"+convenience);
    }
    console.log("vehsafety.."+vehsafety);
},[vehsafetyID,vehsafetyChecked,vehdriveassistanceID,vehdriveassistanceChecked,vehlightingID,vehlightingChecked,vehinfotainmentID,vehinfotainmentChecked,vehconnectivityID,vehconnectivityChecked,vehcomfortID,vehcomfortChecked,vehconvenienceID,vehconvenienceChecked]);
  const [vehexterior,setvehexterior] = useState([]);
  const [vehexteriorID,setvehexteriorID] = useState("");
  const [vehexteriorChecked,setvehexteriorChecked] = useState(false);
  const [vehsecurity,setvehsecurity] = useState([]);
  const [vehsecurityID,setvehsecurityID] = useState("");
  const [vehsecurityChecked,setvehsecurityChecked] = useState(false);
  useEffect(()=>{
    if(vehexteriorChecked && !vehexterior.includes(vehexteriorID))
    {
      setvehexterior(vehexterior=>[...vehexterior,vehexteriorID]);
      dispatchR(userInput({"exterior":vehexterior}));
    }
    else if(!vehexteriorChecked && vehexterior.includes(vehexteriorID))
    {
        const exterior=vehexterior.indexOf(vehexteriorID);
        vehexterior.splice(exterior,1);
        dispatchR(userInput({"exterior":vehexterior}));
        console.log("exterior :"+exterior);
    }
    if(vehsecurityChecked && !vehsecurity.includes(vehsecurityID))
    {
      setvehsecurity(vehsecurity=>[...vehsecurity,vehsecurityID]);
      dispatchR(userInput({"security":vehsecurity}));
    }
    else if(!vehsecurityChecked && vehsecurity.includes(vehsecurityID))
    {
        const security=vehsecurity.indexOf(vehsecurityID);
        vehsecurity.splice(security,1);
        dispatchR(userInput({"security":vehsecurity}));
        console.log("connectivity :"+security);
    }
  },[vehexteriorID,vehexteriorChecked,vehsecurityID,vehsecurityChecked]);

console.log("vehdriveassistance..."+vehdriveassistance);
useEffect(()=>
{
  dispatchR(userInput({"safety":vehsafety}));
  dispatchR(userInput({"driveassistance":vehdriveassistance}));
  dispatchR(userInput({"lighting":vehlighting}));
  dispatchR(userInput({"infotainment":vehinfotainment}));
  dispatchR(userInput({"connectivity":vehconnectivity}));
  dispatchR(userInput({"comfort":vehcomfort}));
  dispatchR(userInput({"convenience":vehconvenience}));
  dispatchR(userInput({"exterior":vehexterior}));
  dispatchR(userInput({"security":vehsecurity}));
},[vehsafety,vehdriveassistance,vehlighting,vehinfotainment,vehconnectivity,vehcomfort,vehconvenience,vehexterior,vehsecurity])


  const selectClass=(e)=>
 {
    if(e === 1)
    {
      setSel(1);
    // console.log(e+"11"+sel);
    }
    else if(e === 2)
    {
      setSel(2);
    // console.log(e+"11"+sel);
    }
    else if(e === 3)
    {
      setSel(3);//console.log(e+"11"+sel);
    }
  
 } 

 var UserInfo=userData;
 const [sellerName,setsellerName]=useState("");
 const [sellercity,setsellercity]=useState("");
 const [sellerProvince,setsellerProvince]=useState("");
 const [sellerAddress,setsellerAddress]=useState("");
 const [buyFromHome,setbuyFromHome]=useState("");
 const [newPictures,setnewPictures]=useState("");
 useEffect(()=>{
  sellerDetails();
 },[UserInfo])
 const sellerDetails =()=>
 {
  UserInfo.map((val)=>{
    console.log("DATA.."+JSON.stringify(val));
    setsellerName(val.user_name);
    setsellercity(val.user_cityname  );
    setsellerProvince(val.user_province);
    setsellerAddress(val.user_lotno+val.user_streetname+", "+val.user_cityname);
    setbuyFromHome(val.buy_from_home);
  }) 
 }

 const getPics =(e)=>
 { console.log("Working");
  
  const selectedFIles =[];
      const targetFiles =e.target.files;
        const targetFilesObject= [...targetFiles]
      targetFilesObject.map((file)=>{
         return selectedFIles.push(file);
      })
      setPictures(selectedFIles);
     
 }
 const handleClick = (e) => {
  const { target = {} } = e || {};
  target.value = "";
};

 const BrakesChoose=(e,f)=>
 {

 //setbrakes(e);
   if(vehsafety.includes("4 Wheel Disc") && e==="Front Disc Rear Drum")
   {
      const safety=vehsafety.indexOf("4 Wheel Disc");
      vehsafety.splice(safety,1);
      setvehsafety(vehsafety=>[...vehsafety,e]);
   }
   else if(vehsafety.includes("Front Disc Rear Drum") && e==="4 Wheel Disc")
   {
      const safety=vehsafety.indexOf("Front Disc Rear Drum");
      vehsafety.splice(safety,1);
      setvehsafety(vehsafety=>[...vehsafety,e]);
   }
   
 
 console.log("safety :"+safety);
 }

console.log( "buyFromHome"+ buyFromHome);





const DeleteImage=(e,f,d)=>
{
   console.log("Delete Working");
   Axios.post("http://localhost:3010/listings/deleteListingImages", {objectId:e}).then((res) =>{
        if(res.data)
        {
          VehicleImages();
          setimageOpt(false);
        }
        
    });
}

console.log("imageOpt...."+imageOpt);

const PrimaryImage=(e,f,g,h)=>
{

  Axios.post("http://localhost:3010/listings/updatePrimaryListingImage", {listingId:e,imageName:f,imageId:g,objectId:h}).then((res) =>{
    console.log(res.data );

});
}

const InsertNewImages=()=>
{
  let ImageId=[];
  let max='';
  vehicleImages.map((val)=>
  {
     ImageId.push(val.image_id);
  });
  if(ImageId.length>0)
  {
     max = Math.max(...ImageId);
    console.log(max);
  }
   
  const fd1=new FormData();
   if(pictures.length>0 )
   {
    fd1.append('Listingid',Listing_ID); 
    fd1.append('ImageId',max); 
     for (let index = 0; index < pictures.length; index++)
      {
        fd1.append('images', pictures[index]); 
       }
        Axios.post("http://localhost:3010/listings/insert_New_Images", fd1).then((res) =>{
          console.log(res.data );
          });
   }
   
   console.log("ImageId.."+ImageId);
}
const VehicleImages=()=>
{
  Axios.post("http://localhost:3010/listings/getListingImages",{ListingId:Listing_ID}).then((res1)=>{
    console.log(res1.data);
   setvehicleImages(res1.data);
   
  });
}


const [objectId,setobjectId]=useState(""); 
const [make_name1,setmake_name1]=useState(""); const [model_name1,setmodel_name1]=useState(""); const [trim_name1,settrim_name1]=useState(""); const [model_year1,setmodel_year1]=useState(""); const [mileage1,setmileage1]=useState(""); const [price1,setprice1]=useState("");  const [vin_no1,setvin_no1]=useState("");
const [stock1,setstock1]=useState("");const [exterior_color1,setexterior_color1]=useState("");const [interior_color1,setinterior_color1]=useState("");const [bodystyle1,setbodystyle1]=useState("");const [fuel_type1,setfuel_type1]=useState("");const [drivetrain1,setdrivetrain1]=useState("");const [transmission1,settransmission1]=useState("");
const [transmission_type1,settransmission_type1]=useState("");const [engine1,setengine1]=useState("");const [doors1,setdoors1]=useState(""); const [seats1,setseats1]=useState("");  const [vehicle_description1,setvehicle_description1]=useState("");  const [engine_cc1,setengine_cc1]=useState("");                                                                                                                                                                                                    
const [engine_power1,setengine_power1]=useState("");const [engine_torque1,setengine_torque1]=useState("");const [fuel_capacity1,setfuel_capacity1]=useState(""); const [fuel_consumption_city1,setfuel_consumption_city1]=useState(""); const [fuel_consumption_highway1,setfuel_consumption_highway1]=useState("");
const [vehicle_top_features1,setvehicle_top_features1]=useState([]);
var mySafety="";
var mydriver_assistance="";
var mylighting="";
var myinfotainment="";
var myconnectivity="";
var mycomfort="";
var myexterior="";
var mysecurity="";
var myconvenience="";
var GetListingDetails=()=>
{
  console.log("GetListingDetails Working");
  Set_updatelistingdata.map((val)=>
  { setobjectId(val._id);
    setmake_name1(val.make_name); setmodel_name1(val.model_name); settrim_name1(val.trim_name);{myState.model_Year?setmodel_year1(myState.model_Year):setmodel_year1(val.model_year.toString())}; setmileage1(val.mileage);  setprice1(val.price);  setvin_no1(val.vin_no);
    setstock1(val.stock); setexterior_color1(val.exterior_color); setinterior_color1(val.interior_color); {myState.body_style?setbodystyle1(myState.body_style):setbodystyle1(val.bodystyle)};{myState.fuel_type?setfuel_type1(myState.fuel_type):setfuel_type1(val.fuel_type)};{myState.drivetrain?setdrivetrain1(myState.drivetrain):setdrivetrain1(val.drivetrain)};settransmission1(val.transmission); {myState.transmission_type?settransmission_type1(myState.transmission_type):settransmission_type1(val.transmission_type)};
    {myState.engine_type?setengine1(myState.engine):setengine1(val.engine)}; {myState.doors?setdoors1(myState.doors):setdoors1(val.doors)}; {myState.seats?setseats1(myState.seats) :setseats1(val.seats)}; setvehicle_description1(val.vehicle_description); setengine_cc1(val.engine_cc); setengine_power1(val.engine_power); setengine_torque1(val.engine_torque); setfuel_capacity1(val.fuel_capacity);
    setfuel_consumption_city1(val.fuel_consumption_city); setfuel_consumption_highway1(val.fuel_consumption_highway); setvehicle_top_features1(val.vehicle_top_features); 
     mySafety=val.safety.split(",");
     mydriver_assistance=val.driver_assistance.split(",");
     mylighting=val.lighting.split(",");
     myinfotainment=val.infotainment.split(",");
     myconnectivity=val.connectivity.split(",");
     mycomfort=val.comfort.split(",");
     myexterior=val.exterior.split(",");
     mysecurity=val.security.split(",");
     myconvenience=val.convenience.split(",");
     
     setvehsecurity(mysecurity);
  }) 
  setvehsafety(myState.safety?myState.safety:mySafety);
  setvehdriveassistance(myState.driveassistance?myState.driveassistance:mydriver_assistance);
  setvehvehlighting(myState.lighting?myState.lighting:mylighting);
  setvehinfotainment(myState.infotainment?myState.infotainment:myinfotainment);
  setvehconnectivity(myState.connectivity?myState.connectivity:myconnectivity);
  setvehcomfort(myState.comfort?myState.comfort:mycomfort);
  setvehconvenience(myState.convenience?myState.convenience:myconvenience);
  setvehexterior(myState.exterior?myState.exterior:myexterior);
  setvehsecurity(myState.security?myState.security:mysecurity);
}



console.log(myState.model_Year+"model_Year Name"+model_year1);
useEffect(()=>{

  if(make_name1.length>0)
  {
    console.log("Non state");
    GetModels(make_name1);
  }
  if(transmission1)
  {
    onTransmission(transmission1);
  }
  if(myState.make)
  {
    console.log(" state");
    GetModels(myState.make);
  }
 
},[make_name1,pictures,deleteImage])
const GetModels=(e)=>
{
 Axios.post("http://localhost:3010/categories/models",{makename:e}).then((res) =>{
   console.log(res.data );
   setmodelList(res.data);
 });
}
const [showhorsepower, setshowhorsepower] = useState(false);
const [showtorque, setshowtorque] = useState(false);
const [showbatterypower, setshowbatterypower] = useState(false);
const [showbatteryRange, setshowbatteryRange] = useState(false);

const Fuel_type=(e)=>
{
  if(e==="Electric")
  {
    dispatchR(userInput({"engine_type":"Electric"}));
   
  }

}

const ShowBatteryFalse=()=>
{
  if(fuel_type1==="Electric")
  {
    setshowbatterypower(false);
  }
  
}
const ShowBatteryTrue=()=>
{
  if(fuel_type1==="Electric")
  {
    setshowbatterypower(true);
  }
 
}
const ShowBatteryRangeFalse=()=>
{
  if(fuel_type1==="Electric")
  {
    setshowbatteryRange(false);
  }
  
}
const ShowBatteryRangeTrue=()=>
{
  if(fuel_type1==="Electric")
  {
    setshowbatteryRange(true);
  }
 
}

const [transmission,settransmission]=useState("");
const onTransmission=(e)=>
{ 
  
  if(e ==="Automatic" || e ==="Continuously Variable Transmission" || e==="Dual-Clutch Transmission" || e==="Direct Shift Gearbox")
  {
    settransmission("Automatic");
    
  }
  else if(e==="Manual Transmission" || e ==="Intelligent Manual Transmission")
  {
    settransmission("Manual");
    ;
  }
}




let safety,assistance,lighting,infotainment,connectivity,comfort,convenience,exterior,security="";
const SaveData =()=>
 {
  console.log("transmission1.."+transmission1+"Transmission.."+transmission);
  
 
  
  safety=vehsafety.join()+(",");//+brakes;
  assistance=vehdriveassistance.join();
  lighting=vehlighting.join();
  infotainment=vehinfotainment.join();
  connectivity=vehconnectivity.join();
  comfort=vehcomfort.join(); 
  convenience=vehconvenience.join();
  exterior=vehexterior.join();
  security=vehsecurity.join();
  const fd=new FormData();
    fd.append('objectId',objectId);
    fd.append('ListingId',Listing_ID);
    fd.append('make',myState.make?myState.make:make_name1); 
    fd.append('model',myState.model_Name?myState.model_Name:model_name1);
    fd.append('trim',myState.trim_name?myState.trim_name:trim_name1); 
    fd.append('year',myState.model_Year?myState.model_Year:model_year1);
    fd.append('mileage',myState.mileage?myState.mileage:mileage1); 
    fd.append('price',myState.price?myState.price:price1); 
    fd.append('vin_no',myState.vin_no?myState.vin_no:vin_no1); 
    fd.append('stock_no',myState.stock_no?myState.stock_no:stock1); 
    fd.append('exterior_colour',myState.exterior_colour?myState.exterior_colour:exterior_color1); 
    fd.append('interior_colour',myState.interior_colour?myState.interior_colour:interior_color1);
    fd.append('body_style',bodystyle1);  
    fd.append('fuel_type',fuel_type1); 
    fd.append('drivetrain',drivetrain1); 
    fd.append('transmission',transmission); 
    fd.append('transmission_type',myState.transmission_type?myState.transmission_type:transmission_type1); 
    fd.append('engine_type',engine1); 
    fd.append('doors',doors1); 
    fd.append('seats',seats1); 
    fd.append('vehicle_discription',myState.vehicle_discription?myState.vehicle_discription:vehicle_description1); 
    fd.append('cc',myState.cc?myState.cc:engine_cc1); 
    fd.append('power',myState.power?myState.power:engine_power1);
    fd.append('torque',myState.torque?myState.torque:engine_torque1);
    fd.append('fuelcapacity',myState.fuelcapacity?myState.fuelcapacity:fuel_capacity1);
    fd.append('fuelconsumptioncity',myState.fuelconsumptioncity?myState.fuelconsumptioncity:fuel_consumption_city1);
    fd.append('fuelconsumptionhighway',myState.fuelconsumptionhighway?myState.fuelconsumptionhighway:fuel_consumption_highway1);
    fd.append('safety',safety); 
    fd.append('assistance',assistance);
    fd.append('lighting',lighting);
    fd.append('infotainment',infotainment);
    fd.append('connectivity',connectivity);
    fd.append('comfort',comfort); 
    fd.append('convenience',convenience);
    fd.append('exterior',exterior);
    fd.append('security',security);
    
    fd.append('vehicle_top_features',myState.vehicle_top_features?myState.vehicle_top_features:vehicle_top_features1);
   
    Axios.post("http://localhost:3010/listings/updateListing", fd ).then((res) =>{
        console.log(res.data );
    
    });
   
  }

  return (
    <>
    <AppHeader/>
    
    <div className='ad-ls-main-cont'>
        <div className='ad-ls-main-subcont'>
          <div className='ad-ls-subnav '>
            <div className='ad-ld-bg-wt'>
            <div className='ad-ls-subnav-head ad-ls-padd'>
              <h5>Welcome</h5><p className='ad-ls-user'>Username</p>
            </div>
            <ul className='ad-ls-ulist'>
              <li value="1" className={sel === '1' ?'ad-ls-sidenav-lst-item-1':'ad-ls-sidenav-lst-item'} 
              onClick={(e)=>{selectClass(e.target.value)}}><BiDetail className='ad-ls-sidenav-ico'/>Vehicle Details</li>
              <li value="2" className={sel === '2' ?'ad-ls-sidenav-lst-item-1':'ad-ls-sidenav-lst-item'} 
              onClick={(e)=>{selectClass(e.target.value)}}><HiSortDescending className='ad-ls-sidenav-ico'/>Vehicle Description</li>
              <li value="3" className={sel === '3' ?'ad-ls-sidenav-lst-item-1':'ad-ls-sidenav-lst-item'} 
              onClick={(e)=>{selectClass(e.target.value)}}><MdOutlineFeaturedPlayList className='ad-ls-sidenav-ico'/>Vehicle Features</li>
              
            </ul>
            </div>
          </div>
          <div className='ad-ls-veh-det ad-ls-padd'>
              {sel===1 ?<div className='ad-ls-veh-det-sub-sect'>
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent '>
                  <label htmlFor="" className='ad-ls-mg-bt-lb'>Make Name</label>
                    <select name="" id=""   className='ad-ls-inp-sel'  onChange={(e)=>{{dispatchR(userInput({"make":e.target.value}))/*dispatch({type:'userInput',field:'make',payload:e.target.value})*/};GetModels(e.target.value)}}>
                      <option value="" selected >Choose Make</option>
                      {
                        makesList.map((val)=>{
                          return <option selected={myState.make===val.makes_name?true:make_name1===val.makes_name?true:false} value={val.makes_name}>{val.makes_name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                  <label htmlFor="" className='ad-ls-mg-bt-lb'>Model Name</label>
                    <select name="" id="" className='ad-ls-inp-sel'  onChange={(e)=>{dispatchR(userInput({"model_Name":e.target.value}))}}>
                      <option value="" selected >Choose Model</option>
                      {
                        modelList.map((val)=>{
                          return <option selected={myState.model_Name===val.model_name?true:model_name1===val.model_name?true:false} value={val.model_name}>{val.model_name}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                  <label htmlFor="" className='ad-ls-mg-bt-lb'>Trim Name</label>
                    <input type="text" name="" id="" defaultValue={myState.trim_name?myState.trim_name:trim_name1} placeholder='Progressive ,Sport,LX GL' className='ad-ls-inp'  onChange={(e)=>{dispatchR(userInput({"trim_name":e.target.value}))/*dispatch({type:'userInput',field:'trim',payload:e.target.value})*/}}/>
                  </div>
                </div>
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Model Year</label>
                    <select name="" id="" className='ad-ls-inp-sel'  onChange={(e)=>{dispatchR(userInput({"model_Year":e.target.value}))}}>
                    <option value="" selected disabled>Choose Year</option>
                    {
                        yearList.map((val)=>{
                          return <option selected={model_year1===val.years?true:false} value={val.years}>{val.years}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Mileage</label>
                    <input type="text" name="" id="" defaultValue={myState.mileage?myState.mileage:mileage1} placeholder='10000 KM' className='ad-ls-inp'  onChange={(e)=>{dispatchR(userInput({"mileage":e.target.value}))}} />
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Price</label>
                    <input type="text" name="" defaultValue={myState.price?myState.price:price1} id="" placeholder='40000 $' className='ad-ls-inp'  onChange={(e)=>{dispatchR(userInput({"price":e.target.value}))}}/>
                  </div>
                </div>
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>VIN No.</label>
                    <input type="text" name="" defaultValue={myState.vin_no?myState.vin_no:vin_no1} id="" placeholder='WAUEFRFFXF1XXXXXX' className='ad-ls-inp' 
                    onChange={(e)=>dispatchR(userInput({"vin_no":e.target.value}))}/>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Stock#:</label>
                    <input type="text" name="" id="" defaultValue={myState.stock_no?myState.stock_no:stock1} placeholder='S43XXXX' className='ad-ls-inp'  onChange={(e)=>{dispatchR(userInput({"stock_no":e.target.value}))}}/>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                  <label htmlFor="" className='ad-ls-mg-bt-lb'>Change Pictures</label>
           
                  <label htmlFor="upload pics" className='ad-ls-upl-pics' onClick={()=>{setimageGallery(true)}}>Choose Pictures</label>
                </div>
                </div>
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Exterior Colour </label>
                    <input type="text" name="" id="" defaultValue={myState.exterior_colour?myState.exterior_colour:exterior_color1} placeholder='Metallic Gray' className='ad-ls-inp'  onChange={(e)=>{dispatchR(userInput({"exterior_colour":e.target.value}))}}/>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Interior Colour</label>
                    <input type="text" name="" id="" defaultValue={myState.interior_colour?myState.interior_colour:interior_color1} className='ad-ls-inp' placeholder='Black,Red, Gray'  onChange={(e)=>{dispatchR(userInput({"interior_colour":e.target.value}))}}/>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Body Style</label>
                    <select name="" id="" className='ad-ls-inp-sel'  onChange={(e)=>{dispatchR(userInput({"body_style":e.target.value}))}}>
                    <option value="" selected >Choose Body Style</option>
        
                      {
                        BodyStyles.map((val)=>{
                          return <option selected={bodystyle1===val.Body_Style?true:false} value={val.Body_Style}>{val.Body_Style}</option>
                                               
                        })
                      }
                    </select>
                  </div>
                </div>
                
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Fuel Type </label>
                    <select name="" id="" className='ad-ls-inp-sel'  onChange={(e)=>{dispatchR(userInput({"fuel_type":e.target.value}));Fuel_type(e.target.value)}}>
                    <option value="" selected disabled>Choose Fuel Type</option>
                    <option selected={fuel_type1==="Gas"?true:false} value="Gas">Gas</option>
                    <option selected={fuel_type1==="Diesel"?true:false} value="Diesel">Diesel</option>
                    <option selected={fuel_type1==="Hybrid / Gas"?true:false} value="Hybrid / Gas">Hybrid / Gas</option>
                    <option selected={fuel_type1==="Electric"?true:false} value="Electric">Electric</option>
                    <option selected={fuel_type1==="Hydrogen"?true:false} value="Hydrogen">Hydrogen</option>
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Drive Train</label>
                    <select name="" id="" className='ad-ls-inp-sel'  onChange={(e)=>dispatchR(userInput({"drivetrain":e.target.value}))}>
                    <option value="" selected disabled>Choose Drive Train</option>
                    <option selected={drivetrain1==="Front Wheel Drive"?true:false} value="Front Wheel Drive">Front Wheel</option>
                    <option selected={drivetrain1==="Rear Wheel Drive"?true:false} value="Rear Wheel Drive">Rear Wheel</option>
                    <option selected={drivetrain1==="Four Wheel Drive"?true:false} value="Four Wheel Drive">Four Wheel</option>
                    <option selected={drivetrain1==="All Wheel Drive"?true:false} value="All Wheel Drive">All Wheel</option>
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Transmission</label>
                    <select name="" id="" className='ad-ls-inp-sel' onChange={(e)=>{dispatchR(userInput({"transmission_type":e.target.value}));onTransmission(e.target.value)}} >
                    <option value="" selected disabled>Choose Transmission</option>
                    <option selected={transmission_type1==="Manual Transmission"?true:false} value="Manual Transmission">Manual Transmission</option>
                    <option selected={transmission_type1==="Automatic"?true:false} value="Automatic">Automatic</option>
                    <option selected={transmission_type1==="Continuously Variable Transmission"?true:false} value="Continuously Variable Transmission">Continuously Variable Transmission</option>
                    <option selected={transmission_type1==="Dual-Clutch Transmission"?true:false} value="Dual-Clutch Transmission">Dual-Clutch Transmission</option>
                    <option selected={transmission_type1==="Intelligent Manual Transmission"?true:false} value="Intelligent Manual Transmission">Intelligent Manual Transmission</option>
                    <option selected={transmission_type1==="Direct Shift Gearbox"?true:false} value="Direct Shift Gearbox">Direct Shift Gearbox</option>
                    </select>
                  </div>
                </div>
                <div className='ad-ls-veh-md'>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Engine Type</label>
                    <select name="" id="" className='ad-ls-inp-sel' disabled={fuel_type1==="Electric"?true:false} onChange={(e)=>dispatchR(userInput({"engine_type":e.target.value}))}>
                    <option value="" selected disabled>Choose Engine</option>
                    <option selected={engine1==="Four Cylinder (I-4)"?true:false} value="Four Cylinder (I-4)">Four Cylinder (I-4)</option>
                    <option selected={engine1==="Six Cylinder (V-6)"?true:false} value="Six Cylinder (V-6)">Six Cylinder (V-6)</option>
                    <option selected={engine1==="Eight Cylinder (V-8)"?true:false} value="Eight Cylinder (V-8)">Eight Cylinder (V-8)</option>
                    <option selected={engine1==="Ten Cylinder (V-10)"?true:false} value="Ten Cylinder (V-10)">Ten Cylinder (V-10)</option>
                    <option selected={engine1==="Twelve Cylinder (V-12)"?true:false} value="Twelve Cylinder (V-12)">Twelve Cylinder (V-12)</option>
                    <option selected={engine1==="Sixteen Cylinder (V-16)"?true:false} value="Sixteen Cylinder (V-16)">Sixteen Cylinder (V-16)</option>
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Doors</label>
                    <select name="" id="" className='ad-ls-inp-sel' onChange={(e)=>dispatchR(userInput({"doors":e.target.value}))}>
                    <option value="" selected disabled>Choose Doors</option>
                    <option selected={doors1==="Two Door"?true:false} value="Two Door">Two Door</option>
                    <option selected={doors1==="Four Door"?true:false} value="Four Door">Four Door</option>
                    <option selected={doors1==="Six Door"?true:false} value="Six Door">Six Door</option>
                    <option selected={doors1==="Eight Door"?true:false} value="Eight Door">Eight Door</option>
                    </select>
                  </div>
                  <div className='ad-ls-veh-dt-ent'>
                    <label htmlFor="" className='ad-ls-mg-bt-lb'>Seats</label>
                    <select name="" id="" className='ad-ls-inp-sel' onChange={(e)=>dispatchR(userInput({"seats":e.target.value}))}>
                    <option value="" selected disabled>Choose Seats</option>
                    <option selected={seats1==="Two Seats"?true:false} value="Two Seats">Two Seats</option>
                    <option selected={seats1==="Four Seats"?true:false} value="Four Seats">Four Seats</option>
                    <option selected={seats1==="Five Seats"?true:false} value="Five Seats">Five Seats</option>
                    <option selected={seats1==="Six Seats"?true:false} value="Six Seats">Six Seats</option>
                    <option selected={seats1==="Seven Seats"?true:false} value="Seven Seats">Seven Seats</option>
                    <option selected={seats1==="Eight Seats"?true:false} value="Eight Seats">Eight Seats</option>
                    <option selected={seats1==="Ten Seats"?true:false} value="Ten Seats">Ten Seats</option>
                    <option selected={seats1==="Twelve Seats"?true:false} value="Twelve Seats">Twelve Seats</option>
                    </select>
                  </div>
                </div>
             
                
              </div>:""}
              {sel===2 ?<div className='ad-ls-veh-det-sub-sect'>
                     
                      <h5>Vehicle Description</h5>
                      <textarea name="" id="" defaultValue={myState.vehicle_discription?myState.vehicle_discription:vehicle_description1} cols="120" rows="18" className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"vehicle_discription":e.target.value}))}></textarea>
                      
              </div>:""}
              {sel===3 ?<div className='ad-ls-veh-det-sub-sect'>
                
                         <div className='ad-ls-veh-md mg-top'>
                             <div className='ad-ls-veh-dt-ent' style={{flexFlow:"row",width:"100%"}}>
                              <h5 className='brd-left'>Engine Specifications</h5>
                               {showhorsepower===true?<h5  style={{color:"red",marginLeft:"25px"}}>Please Enter in Horse Power</h5>:""}
                               {showtorque===true?<h5 style={{color:"red",marginLeft:"60px"}}>Please Enter in ft-lb</h5>:""}
                               {showbatterypower===true?<h5 style={{color:"red",marginLeft:"60px"}}>Please Enter in KW</h5>:""}
                               {showbatteryRange===true?<h5 style={{color:"red",marginLeft:"60px"}}>Please Enter Range in KM</h5>:""}
                            </div>
                            </div>
                          <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-ent1'>
                           
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>{fuel_type1==="Electric"?"Battery Power":"Engine Size"}</label>
                            <input type="text" name="Engine CC" id="" onBlur={()=>ShowBatteryFalse()} onFocus={()=>ShowBatteryTrue()} defaultValue={myState.cc?myState.cc:engine_cc1} placeholder='3.5 Litres' className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"cc":e.target.value}))}/>
                            </div>
                          <div className='ad-ls-veh-dt-ent1'>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>Engine Power</label>
                            <input type="text" name="Engine Power" id="" onBlur={()=>setshowhorsepower(false)} onFocus={()=>setshowhorsepower(true)}  className='ad-ls-inp'  defaultValue={myState.power?myState.power:engine_power1} placeholder='250 HP'  onChange={(e)=>dispatchR(userInput({"power":e.target.value}))}/>
                          </div>
                          <div className='ad-ls-veh-dt-ent1'>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>Torque</label>
                            <input type="text" name="Torque" id="" placeholder='Ft-Lb'  onBlur={()=>setshowtorque(false)} onFocus={()=>setshowtorque(true)}  defaultValue={myState.torque?myState.torque:engine_torque1} className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"torque":e.target.value}))}/>
                          </div>
                          <div className='ad-ls-veh-dt-ent1'>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>{fuel_type1==="Electric"?"Battery Range":"Fuel Capacity"}</label>
                            <input type="text" name="Fuel Capacity" placeholder='Litres' onBlur={()=>ShowBatteryRangeFalse()} onFocus={()=>ShowBatteryRangeTrue()}  id="" defaultValue={myState.fuelcapacity?myState.fuelcapacity:fuel_capacity1} className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"fuelcapacity":e.target.value}))}/>
                          </div>
                          </div>
                          <div className='ad-ls-veh-md'>
                            
                          
                          <div className='ad-ls-veh-dt-ent'>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>Fuel Consumption City</label>
                            <input type="text" name="Fuel Consumption City" placeholder='Litres/100 KM' defaultValue={myState.fuelconsumptioncity?myState.fuelconsumptioncity:fuel_consumption_city1}  id="" className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"fuelconsumptioncity":e.target.value}))}/>
                          </div>
                          <div className='ad-ls-veh-dt-ent'>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>Fuel Consumption Highway</label>
                            <input type="text" name="Fuel Consumption Highway" id=""  placeholder='Litres/100 KM' defaultValue={myState.fuelconsumptionhighway?myState.fuelconsumptionhighway:fuel_consumption_highway1} className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"fuelconsumptionhighway":e.target.value}))}/>
                          </div>
                          </div>
                          
                          <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Safety</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"    id="Driver Airbag" defaultChecked={vehsafety.includes("Driver Airbag")?true:false} class="form-check-input mg-rt-sm"  onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}} />
                              
                              <label htmlFor="Driver Airbag" className='ad-ls-mg-bt-lb'>Driver Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature" id="Passenger Airbag" defaultChecked={vehsafety.includes("Passenger Airbag")?true:false}  class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}} />
                              
                              
                              <label htmlFor="Passenger Airbag" className='ad-ls-mg-bt-lb'>Passenger Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"     id="Front Side Airbag" defaultChecked={vehsafety.includes("Front Side Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Front Side Airbag" className='ad-ls-mg-bt-lb'>Front Side Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rear Side Airbag"  defaultChecked={vehsafety.includes("Rear Side Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}} />
                              <label htmlFor="Rear Side Airbag" className='ad-ls-mg-bt-lb'>Rear Side Airbag</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Front Head Airbag" defaultChecked={vehsafety.includes("Front Head Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Front Head Airbag" className='ad-ls-mg-bt-lb'>Front Head Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rear Head Airbag" defaultChecked={vehsafety.includes("Rear Head Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Rear Head Airbag" className='ad-ls-mg-bt-lb'>Rear Head Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Knee Airbag" defaultChecked={vehsafety.includes("Knee Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Knee Airbag" className='ad-ls-mg-bt-lb'>Knee Airbag</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Seat Belt Airbag" defaultChecked={vehsafety.includes("Seat Belt Airbag")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Seat Belt Airbag" className='ad-ls-mg-bt-lb'>Seat Belt Airbag</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="radio" name="brakes-type" id="4 Wheel Disc" defaultChecked={vehsafety.includes("4 Wheel Disc")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{BrakesChoose(e.target.id,e.target.checked)}}/>
                              <label htmlFor="4 Wheel Disc" className='ad-ls-mg-bt-lb'>4 Wheel Disc</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="radio" name="brakes-type" id="Front Disc Rear Drum" defaultChecked={vehsafety.includes("Front Disc Rear Drum")?true:false}class="form-check-input mg-rt-sm" onChange={(e)=>{BrakesChoose(e.target.id,e.target.checked)}}/>
                              <label htmlFor="Front Disc Rear Drum" className='ad-ls-mg-bt-lb'>Front Disc Rear Drum</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="ABS Braking System" defaultChecked={vehsafety.includes("ABS Braking System")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="ABS Braking System" className='ad-ls-mg-bt-lb'>ABS Braking System</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Traction Control" defaultChecked={vehsafety.includes("Traction Control")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Traction Control" className='ad-ls-mg-bt-lb'>Traction Control</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Stability Control" defaultChecked={vehsafety.includes("Stability Control")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Stability Control" className='ad-ls-mg-bt-lb'>Stability Control</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rollover Protection Bars" defaultChecked={vehsafety.includes("Rollover Protection Bars")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Rollover Protection Bars" className='ad-ls-mg-bt-lb'>Rollover Protection Bars</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Child Safety Lock" defaultChecked={vehsafety.includes("Child Safety Lock")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Child Safety Lock" className='ad-ls-mg-bt-lb'>Child Safety Lock</label>
                              </div>
                              
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Emergency Trunk Release" defaultChecked={vehsafety.includes("Emergency Trunk Release")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsafetyID(e.target.id);setvehsafetyChecked(e.target.checked)}}/>
                              <label htmlFor="Emergency Trunk Release" className='ad-ls-mg-bt-lb'>Emergency Trunk Release</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Driver Assistance</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Back-up Camera"  defaultChecked={vehdriveassistance.includes("Back-up Camera")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Back-up Camera" className='ad-ls-mg-bt-lb'>Back-up Camera</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="360 Camera" defaultChecked={vehdriveassistance.includes("360 Camera")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="360 Camera" className='ad-ls-mg-bt-lb'>360 Camera</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Brake Assist" defaultChecked={vehdriveassistance.includes("Brake Assist")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Brake Assist" className='ad-ls-mg-bt-lb'>Brake Assist</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Blind Spot Monitor" defaultChecked={vehdriveassistance.includes("Blind Spot Monitor")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Blind Spot Monitor" className='ad-ls-mg-bt-lb'>Blind Spot Monitor</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Lane Departure Warning" defaultChecked={vehdriveassistance.includes("Lane Departure Warning")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Lane Departure Warning" className='ad-ls-mg-bt-lb'>Lane Departure Warning</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Lane Keeping Assist" defaultChecked={vehdriveassistance.includes("Lane Keeping Assist")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Lane Keeping Assist" className='ad-ls-mg-bt-lb'>Lane Keeping Assist</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Cross-Traffic Alert" defaultChecked={vehdriveassistance.includes("Cross-Traffic Alert")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Cross-Traffic Alert" className='ad-ls-mg-bt-lb'>Cross-Traffic Alert</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rear Parking Aid" defaultChecked={vehdriveassistance.includes("Rear Parking Aid")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Rear Parking Aid" className='ad-ls-mg-bt-lb'>Rear Parking Aid</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Automatic Parking" defaultChecked={vehdriveassistance.includes("Automatic Parking")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Automatic Parking" className='ad-ls-mg-bt-lb'>Automatic Parking</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Tire Pressure Monitor" defaultChecked={vehdriveassistance.includes("Tire Pressure Monitor")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Tire Pressure Monitor" className='ad-ls-mg-bt-lb'>Tire Pressure Monitor</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Cruise Control" defaultChecked={vehdriveassistance.includes("Cruise Control")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Cruise Control" className='ad-ls-mg-bt-lb'>Cruise Control</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Adaptive Cruise Control" defaultChecked={vehdriveassistance.includes("Adaptive Cruise Control")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Adaptive Cruise Control" className='ad-ls-mg-bt-lb'>Adaptive Cruise Control</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Heads-Up Display" defaultChecked={vehdriveassistance.includes("Heads-Up Display")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehdriveassistanceID(e.target.id);setvehdriveassistanceChecked(e.target.checked)}}/>
                              <label htmlFor="Heads-Up Display" className='ad-ls-mg-bt-lb'>Heads-Up Display</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Lighting</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Daytime Running Lights" defaultChecked={vehlighting.includes("Daytime Running Lights")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Daytime Running Lights" className='ad-ls-mg-bt-lb'>Daytime Running Lights</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Automatic Headlights" defaultChecked={vehlighting.includes("Automatic Headlights")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Automatic Headlights" className='ad-ls-mg-bt-lb'>Automatic Headlights</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Night Vision" defaultChecked={vehlighting.includes("Night Vision")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Night Vision" className='ad-ls-mg-bt-lb'>Night Vision</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="HID headlights" defaultChecked={vehlighting.includes("HID headlights")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="HID headlights" className='ad-ls-mg-bt-lb'>HID headlights</label>
                              </div>
                              
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Headlights-Auto-Leveling" defaultChecked={vehlighting.includes("Headlights-Auto-Leveling")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Headlights-Auto-Leveling" className='ad-ls-mg-bt-lb'>Headlights-Auto-Leveling</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Integrated Turn Signal Mirrors" defaultChecked={vehlighting.includes("Integrated Turn Signal Mirrors")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Integrated Turn Signal Mirrors" className='ad-ls-mg-bt-lb'>Integrated Turn Signal Mirrors</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Auto-Dimming Rearview Mirror" defaultChecked={vehlighting.includes("Auto-Dimming Rearview Mirror")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehlightingID(e.target.id);setvehlightingChecked(e.target.checked)}}/>
                              <label htmlFor="Auto-Dimming Rearview Mirror" className='ad-ls-mg-bt-lb'>Auto-Dimming Rearview Mirror</label>
                              </div>
                            </div>

                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Infotainment</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="AM/FM Stereo" defaultChecked={vehinfotainment.includes("AM/FM Stereo")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="AM/FM Stereo" className='ad-ls-mg-bt-lb'>AM/FM Stereo</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="HD Radio" defaultChecked={vehinfotainment.includes("HD Radio")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="HD Radio" className='ad-ls-mg-bt-lb'>HD Radio</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Satellite Radio" defaultChecked={vehinfotainment.includes("Satellite Radio")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Satellite Radio" className='ad-ls-mg-bt-lb'>Satellite Radio</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="CD Player" defaultChecked={vehinfotainment.includes("CD Player")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="CD Player" className='ad-ls-mg-bt-lb'>CD Player</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="MP3 Player" defaultChecked={vehinfotainment.includes("MP3 Player")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="MP3 Player" className='ad-ls-mg-bt-lb'>MP3 Player</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Auxiliary Audio Input" defaultChecked={vehinfotainment.includes("Auxiliary Audio Input")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Auxiliary Audio Input" className='ad-ls-mg-bt-lb'>Auxiliary Audio Input</label>
                              </div>
                              
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Navigation System" defaultChecked={vehinfotainment.includes("Navigation System")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Navigation System" className='ad-ls-mg-bt-lb'>Navigation System</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Hard Disk Drive Media Storage" defaultChecked={vehinfotainment.includes("Hard Disk Drive Media Storage")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Hard Disk Drive Media Storage" className='ad-ls-mg-bt-lb'>Hard Disk Drive Media Storage</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rear Seat Audio Controls" defaultChecked={vehinfotainment.includes("Rear Seat Audio Controls")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Rear Seat Audio Controls" className='ad-ls-mg-bt-lb'>Rear Seat Audio Controls</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Steering Wheel-Audio Controls" defaultChecked={vehinfotainment.includes("Steering Wheel-Audio Controls")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehinfotainmentID(e.target.id);setvehinfotainmentChecked(e.target.checked)}}/>
                              <label htmlFor="Steering Wheel-Audio Controls" className='ad-ls-mg-bt-lb'>Steering Wheel-Audio Controls</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Connectivity</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Smart Device Integration"  defaultChecked={vehconnectivity.includes("Smart Device Integration")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="Smart Device Integration" className='ad-ls-mg-bt-lb'>Smart Device Integration</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Apple CarPlay"  defaultChecked={vehconnectivity.includes("Apple CarPlay")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="Apple CarPlay" className='ad-ls-mg-bt-lb'>Apple CarPlay</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Android Auto"  defaultChecked={vehconnectivity.includes("Android Auto")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="Android Auto" className='ad-ls-mg-bt-lb'>Android Auto</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="WiFi Hotspot" defaultChecked={vehconnectivity.includes("WiFi Hotspot")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="WiFi Hotspot" className='ad-ls-mg-bt-lb'>WiFi Hotspot</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Bluetooth Connection" defaultChecked={vehconnectivity.includes("Bluetooth Connection")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}} />
                              <label htmlFor="Bluetooth Connection" className='ad-ls-mg-bt-lb'>Bluetooth Connection</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Outlet" defaultChecked={vehconnectivity.includes("Power Outlet")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="Power Outlet" className='ad-ls-mg-bt-lb'>Power Outlet</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Wireless Charging" defaultChecked={vehconnectivity.includes("Wireless Charging")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconnectivityID(e.target.id);setvehconnectivityChecked(e.target.checked)}}/>
                              <label htmlFor="Wireless Charging" className='ad-ls-mg-bt-lb'>Wireless Charging</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Comfort</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Air Conditioning" defaultChecked={vehcomfort.includes("Air Conditioning")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Air Conditioning" className='ad-ls-mg-bt-lb'>Air Conditioning</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Climate Control" defaultChecked={vehcomfort.includes("Climate Control")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Climate Control" className='ad-ls-mg-bt-lb'>Climate Control</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Multi-Zone Air Conditioning" defaultChecked={vehcomfort.includes("Multi-Zone Air Conditioning")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Multi-Zone Air Conditioning" className='ad-ls-mg-bt-lb'>Multi-Zone Air Conditioning</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rear Air Conditioning" defaultChecked={vehcomfort.includes("Rear Air Conditioning")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Rear Air Conditioning" className='ad-ls-mg-bt-lb'>Rear Air Conditioning</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Heated Front Seat(s)" defaultChecked={vehcomfort.includes("Heated Front Seat(s")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Heated Front Seat(s)" className='ad-ls-mg-bt-lb'>Heated Front Seat(s)</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Heated Rear Seat(s)" defaultChecked={vehcomfort.includes("Heated Rear Seat(s)")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Heated Rear Seat(s)" className='ad-ls-mg-bt-lb'>Heated Rear Seat(s)</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Cooled Front Seat(s)" defaultChecked={vehcomfort.includes("Cooled Front Seat(s)")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Cooled Front Seat(s)" className='ad-ls-mg-bt-lb'>Cooled Front Seat(s)</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Cooled Rear Seat(s)" defaultChecked={vehcomfort.includes("Cooled Rear Seat(s)")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Cooled Rear Seat(s)" className='ad-ls-mg-bt-lb'>Cooled Rear Seat(s)</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Driver Adjustable Lumbar" defaultChecked={vehcomfort.includes("Driver Adjustable Lumbar")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Driver Adjustable Lumbar" className='ad-ls-mg-bt-lb'>Driver Adjustable Lumbar</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Passenger Adjustable Lumbar" defaultChecked={vehcomfort.includes("Passenger Adjustable Lumbar")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Passenger Adjustable Lumbar" className='ad-ls-mg-bt-lb'>Passenger Adjustable Lumbar</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Seat-Massage" defaultChecked={vehcomfort.includes("Seat-Massage")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Seat-Massage" className='ad-ls-mg-bt-lb'>Seat-Massage</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Heated Steering Wheel" defaultChecked={vehcomfort.includes("Heated Steering Wheel")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehcomfortID(e.target.id);setvehcomfortChecked(e.target.checked)}}/>
                              <label htmlFor="Heated Steering Wheel" className='ad-ls-mg-bt-lb'>Heated Steering Wheel</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Convenience</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Windows" defaultChecked={vehconvenience.includes("Power Windows")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Windows" className='ad-ls-mg-bt-lb'>Power Windows</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Power Door Locks" defaultChecked={vehconvenience.includes("Power Door Locks")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Door Locks" className='ad-ls-mg-bt-lb'>Power Door Locks</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Seat-Massage" defaultChecked={vehconvenience.includes("Keyless Entry")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Keyless Entry" className='ad-ls-mg-bt-lb'>Seat-Massage</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Keyless Start" defaultChecked={vehconvenience.includes("Keyless Start")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Keyless Start" className='ad-ls-mg-bt-lb'>Keyless Start</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Driver Seat" defaultChecked={vehconvenience.includes("Power Driver Seat")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Driver Seat" className='ad-ls-mg-bt-lb'>Power Driver Seat</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Power Passenger Seat" defaultChecked={vehconvenience.includes("Power Passenger Seat")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Passenger Seat" className='ad-ls-mg-bt-lb'>Power Passenger Seat</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Seat Memory" defaultChecked={vehconvenience.includes("Seat Memory")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Seat Memory" className='ad-ls-mg-bt-lb'>Seat Memory</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Mirror(s)" defaultChecked={vehconvenience.includes("Power Mirror(s)")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Mirror(s)" className='ad-ls-mg-bt-lb'>Power Mirror(s)</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Heated Mirrors" defaultChecked={vehconvenience.includes("Heated Mirrors")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Heated Mirrors" className='ad-ls-mg-bt-lb'>Heated Mirrors</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Mirror Memory" defaultChecked={vehconvenience.includes("Mirror Memory")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Mirror Memory" className='ad-ls-mg-bt-lb'>Mirror Memory</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Folding Mirrors" defaultChecked={vehconvenience.includes("Power Folding Mirrors")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Folding Mirrors" className='ad-ls-mg-bt-lb'>Power Folding Mirrors</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Power Liftgate" defaultChecked={vehconvenience.includes("Power Liftgate")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Power Liftgate" className='ad-ls-mg-bt-lb'>Power Liftgate</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Hands-Free Liftgate" defaultChecked={vehconvenience.includes("Hands-Free Liftgate")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Hands-Free Liftgate" className='ad-ls-mg-bt-lb'>Hands-Free Liftgate</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Remote Trunk Release" defaultChecked={vehconvenience.includes("Remote Trunk Release")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Remote Trunk Release" className='ad-ls-mg-bt-lb'>Remote Trunk Release</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Remote Engine Start" defaultChecked={vehconvenience.includes("Remote Engine Start")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Remote Engine Start" className='ad-ls-mg-bt-lb'>Remote Engine Start</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Variable Speed Intermittent Wipers" defaultChecked={vehconvenience.includes("Variable Speed Intermittent Wipers")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Variable Speed Intermittent Wipers" className='ad-ls-mg-bt-lb'>Variable Speed Intermittent Wipers</label>
                              </div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"   id="Rain Sensing Wipers" defaultChecked={vehconvenience.includes("Rain Sensing Wipers")?true:false}class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Rain Sensing Wipers" className='ad-ls-mg-bt-lb'>Rain Sensing Wipers</label>
                              </div>
                              <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                              <input type="checkbox" name="feature"  id="Universal Garage Door Opener" defaultChecked={vehconvenience.includes("Universal Garage Door Opener")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehconvenienceID(e.target.id);setvehconvenienceChecked(e.target.checked)}}/>
                              <label htmlFor="Universal Garage Door Opener" className='ad-ls-mg-bt-lb'>Universal Garage Door Opener</label>
                              </div>
                            </div>
                 
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Exterior</h5></div>
                            </div>
                            
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                            <input type="checkbox" name="feature"  id="Sun/Moon Roof" defaultChecked={vehexterior.includes("Sun/Moon Roof")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehexteriorID(e.target.id);setvehexteriorChecked(e.target.checked)}}/>
                            <label htmlFor="Sun/Moon Roof" className='ad-ls-mg-bt-lb'>Sun/Moon Roof</label>
                            </div>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                            <input type="checkbox" name="feature"  id="Luggage Rack" defaultChecked={vehexterior.includes("Luggage Rack")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehexteriorID(e.target.id);setvehexteriorChecked(e.target.checked)}}/>
                            <label htmlFor="Luggage Rack" className='ad-ls-mg-bt-lb'>Luggage Rack</label>
                            </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top' >
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Security</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                            <input type="checkbox" name="feature"  id="Engine Immobilizer" defaultChecked={vehsecurity.includes("Engine Immobilizer")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsecurityID(e.target.id);setvehsecurityChecked(e.target.checked)}}/>
                            <label htmlFor="Engine Immobilizer" className='ad-ls-mg-bt-lb'>Engine Immobilizer</label>
                            </div>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                            <input type="checkbox" name="feature"  id="Wheels-Locks" defaultChecked={vehsecurity.includes("Wheels-Locks")?true:false} class="form-check-input mg-rt-sm" onChange={(e)=>{setvehsecurityID(e.target.id);setvehsecurityChecked(e.target.checked)}}/>
                            <label htmlFor="Wheels-Locks" className='ad-ls-mg-bt-lb'>Wheels-Locks</label>
                            </div>
                            </div>
                            <div className='ad-ls-veh-md mg-top' >
                            <div className='ad-ls-veh-dt-ent'><h5 className='brd-left'>Vehicle Top Features</h5></div>
                            </div>
                            <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-ent' style={{width:"75%"}}>
                            <label htmlFor="" className='ad-ls-mg-bt-lb'>Vehicle Features Title</label>
                            <input type="text" name="Vehicle Features Title" defaultValue={myState.vehicle_top_features?myState.vehicle_top_features:vehicle_top_features1} id="" placeholder='AWD,Dual-Clutch,Low Mileage,New Tyres,Less Driven,Single Owner,Allow Wheels' className='ad-ls-inp' onChange={(e)=>dispatchR(userInput({"vehicle_top_features":e.target.value}))}/>
                            </div>
                            </div>
                            <hr />
                            <div className='ad-ls-veh-md ' >
                              <button className='ad-ls-sub-data' onClick={()=>SaveData()}>SUBMIT DATA</button>
                            </div>
              </div>:""}
              
                   <div className='ad-ls-nxt-pre'>
                   {sel > 1 && sel < 4 ? <button className='ad-ls-pre-bt' onClick={()=>selectClass(sel-1)}>Previous</button>:"" }
                   {sel <3 ? <button className='ad-ls-next-bt' onClick={()=>setSel(sel+1)}>Next</button> :""} 
                   </div>
          </div>
        </div>
        {
        imageGallery?<div class="my-modal  fade-bg"  tabindex="-1">
        <div style={{maxWidth:"1000px"}} class="modal-dialog">
          <div  class="modal-content">
            <div class="modal-header">
               <label htmlFor='upload new pics' ><MdAddAPhoto className='add-updt-imag-ic'/>
               <input  type="file" name="images"  id="upload new pics" multiple style={{display:"none"}} onClick={(e)=>{handleClick(e)}}  onChange={(e)=>{getPics(e);setnewPictures(e.target.files)}}/>
               </label>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setimageGallery(false);setPictures([])}}></button>
            </div>
            <div class="modal-body">
            <div  className='show-info'>
                {
                  <ul style={{padding:"0"}} className='multi-list'>
                    {vehicleImages.length>0?
                      vehicleImages.map((val,index)=>{
                        return (
                        <li className='lt-item'>
                          <div style={{display:"flex",flexFlow:"row",position:"relative"}}>
                          <img src={require('../images/listing_images/'+val.image_name+'')}    className="img-sect-updt" alt={index}/>
                          <HiOutlineDotsVertical  onClick={()=>{setimageOpt(!imageOpt);setimgIndex(index)}} className='img-opt-menu-dots' />
                          {imageOpt && imgIndex===index ?
                          <div  className='img-opt-menu-ul-sect'>
                            <ul className='img-opt-menu-ul' >
                            <li className='img-opt-menu-litem' style={{borderBottom:"1px solid lightgrey"}} onClick={()=>{PrimaryImage(val.listing_id,val.image_name,val.image_id,val._id)}} >Set Primary Image</li>
                            <li className='img-opt-menu-litem' onClick={()=>{DeleteImage(val._id)}}>Delete Image</li>
                            </ul> 
                          </div>
                        :""}
                          </div></li>
                        )
                        
                      }):""}
                      {pictures.length > 0 ? pictures.map((val,index)=>{
                        return<li className='lt-item'>
                        <div style={{display:"flex",flexFlow:"row",position:"relative"}}>
                        <img src={URL.createObjectURL(val)}   className="img-sect-updt"  />
                        <HiOutlineDotsVertical onClick={()=>{setimageOpt(!imageOpt);setimgIndex("new"+index)}} className='img-opt-menu-dots'/>
                        {imageOpt && imgIndex==="new"+index   ?
                          <div className='img-opt-menu-ul-sect'>
                            <ul className='img-opt-menu-ul'>
                            <li className='img-opt-menu-litem' onClick={()=>{setdeleteImage(val)}}>Delete Image</li>
                            </ul> 
                          </div>
                        :""} </div></li>
                      }):""}
                    
                    </ul>}
                  
       
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  onClick={()=>{setimageGallery(false);setPictures([])}}>Cancel</button>
              <button type="button" class="btn btn-primary" onClick={()=>{setimageGallery(false);InsertNewImages()}}>Update Pictures</button>
            </div>
          </div>
        </div>
      </div>:""
      }
    </div>
    <FooterMain/>
    </>
  )
}
