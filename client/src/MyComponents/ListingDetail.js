import React, { useRef } from 'react'
import AppHeader from './AppHeader'
import FooterMain from './FooterMain'
import {Link, useLocation,useNavigate, useParams} from 'react-router-dom';
import '../Mystyles/listing_detail.css'
import { useState,useEffect } from 'react';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {IoMdArrowDroprightCircle ,IoMdArrowDropleftCircle,IoIosArrowBack} from "react-icons/io";
import {BsInfoCircleFill,BsInfoCircle, BsFillInfoCircleFill} from "react-icons/bs";
import {TbBracketsOff, TbGauge} from "react-icons/tb";
import {AiOutlineArrowLeft,AiOutlineDollarCircle} from "react-icons/ai";
import {BsArrowLeft,BsCheck,BsTwitter,BsPinterest,BsFillEnvelopeFill} from "react-icons/bs"
import { GrFacebook } from "react-icons/gr";
import { ImPrinter } from "react-icons/im";
import { HashLink } from 'react-router-hash-link'
import { GrClose } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa";
import {RiHome2Line} from 'react-icons/ri';
import { HiPhone,HiLocationMarker } from "react-icons/hi";
import ReactTooltip from "react-tooltip";
import { IoHomeOutline,IoCheckmarkCircleSharp } from "react-icons/io5";
import Soldoutpic from '../images/soldout.png'
import { Label } from '@mui/icons-material';
export default function ListingDetail() {



    const location = useLocation();
    const state = location.state;
     
    const [vehicledata,setvehicledata]=useState([]);
    const [MyvehiclePrice,setMyvehiclePrice]=useState("");
    const [selleredata,setselleredata]=useState([]);
    const [vehicleImages,setvehicleImages]=useState([]);
    const [imgIndex,setimgIndex]=useState(0);
    const [navBar,setnavBar]=useState(false);
    const [moreListings,setmoreListings]=useState([]);
    const [showBFM,setshowBFM]=useState(false);
    const [BFM,setBFM]=useState('');
    const [watchStyle,setwatchStyle]=useState('watch-veh-lb');
    const ref1=useRef();
    const [showContact,setshowContact]=useState(false);
    let imgLength=(vehicleImages.length)-1;
    const navigate = useNavigate();
    const {listing_id,seller_id}=useParams();
    var CryptoJS = require("crypto-js");
    var bytes1 = CryptoJS.AES.decrypt(listing_id, 'my-secret-key@123');
    var bytes2 = CryptoJS.AES.decrypt(seller_id, 'my-secret-key@123');
    var Listing_ID= JSON.parse(bytes1.toString(CryptoJS.enc.Utf8));
    var Seller_ID= JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
    var ENCRYPT_Seller_ID= CryptoJS.AES.encrypt(JSON.stringify(Seller_ID), 'my-secret-key@123').toString();
    let imagesSet="";
    console.log(Listing_ID+"Data.."+seller_id);
    
     useEffect(()=>{
 
            Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getListingDetail",{ListingId:Listing_ID}).then((res)=>{
              console.log(res.data);
              setMyvehiclePrice(res.data[0].price);
              setvehicledata(res.data);
            });
            Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getListingImages",{ListingId:Listing_ID}).then((res1)=>{
              console.log(res1.data);
             setvehicleImages(res1.data);
             
            });
            Axios.post("https://carpages-canada-mongodb.onrender.com/users/getDealerDetails",{userId:Seller_ID}).then((res3)=>{
              console.log(res3.data);
              setselleredata(res3.data);
              setBFM(res3.data[0].buy_from_home);
            });
           Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getmoreListings",{userId:Seller_ID,ListingId:Listing_ID}).then((res2)=>{
              console.log(res2.data);
              setmoreListings(res2.data);
            });

           
    
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
      console.log("Current Location.."+navigator.geolocation.getCurrentPosition(function () {}, function () {}, {}));
    //  navigator.geolocation.getCurrentPosition(success, error, options);
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        console.log("position-  Not");      } 
        
        else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          console.log("position--"+JSON.stringify(position));
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        }, () => {
          setStatus('Unable to retrieve your location');
        },{enableHighAccuracy: true,});
      }
     
     
       
     },[Listing_ID,Seller_ID,lat,lng]);
   useEffect(()=>{

    mileage_price_Set();
    TaxedPrice();
    TaxedPrice2();
   });

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState("");
    const [currentPos, setcurrentPos] = useState(null);
    const url="https://api.openweathermap.org/data/2.5/weather?";
    const api_key="4d44970004fea6c10f9399a10840b54e";
    let sellerNewData=selleredata;
     useEffect(()=>{
      
      getsellerLocation(sellerNewData);
    },[sellerNewData])

    const [Selleraddress,setSelleraddress]=useState("");
    let SELLERADDRESS="";
   const getsellerLocation=(e)=>
   {
      e.map((val)=>{
        SELLERADDRESS=val.user_lotno+","+val.user_streetname+" "+val.user_cityname

      })
      setSelleraddress(SELLERADDRESS);
      console.log("Selleraddress IN"+SELLERADDRESS);
   }


    const CityData=()=>
    {
      if(!lat=="" && !lng =="" )
      {
        let  F_api=`${url}lat=${lat}&lon=${lng}&appid=${api_key}`;
        Axios.get(F_api).then((res)=>{
          console.log(res.data);
        setcurrentPos(res.data.name);
        });
      }
    }
console.log("currentPos..."+currentPos);

     const scrollFunction =()=> {
      
       if(window.scrollY >=80)
       {
            setnavBar(true);
       }
       else
       {
        setnavBar(false);
       }
     }
 
     const ImageFirst =(e)=>
     {
      console.log("if"+ e);
      imagesSet=e;
   
    }

    console.log("BFM......"+BFM);
     const previousImage =()=>
     {
      console.log(imgLength+"..."+imgIndex);
      if(imgIndex>0)
        {
          console.log(imgIndex);
          setimgIndex(imgIndex-1);
        }
     }
     const nextImage =()=>
     {
      console.log(vehicleImages.length+"..."+imgIndex);
      if(imgIndex == 0 || imgIndex <imgLength )
      {
        console.log("next if"+imgIndex);
        setimgIndex(imgIndex+1);
      }
      else if(imgIndex > imgLength)
      {
        console.log(imgIndex);
        setimgIndex(imgIndex-1);
      }
     }
     const onImageListClick=(e)=>
     {
      setimgIndex(e)
     }

     const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });
    };
    
    
   
   window.addEventListener('scroll',scrollFunction);
  
   const details=()=>{
    var element = document.getElementById('vehicle-detail');
      var headerOffset = 45;
        var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    }); 
    //document.getElementById("vehicle-detail").scrollIntoView({behavior: 'smooth'});
   }
   const description=()=>{
    var element = document.getElementById('vehicle-description');
      var headerOffset = 45;
        var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    }); 
   // document.getElementById("vehicle-description").scrollIntoView({behavior: 'smooth'});
   }
   const features=()=>{
    var element = document.getElementById('vehicle-features');
    var headerOffset = 45;
      var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
  });
   // document.getElementById("vehicle-features").scrollIntoView({behavior: 'smooth'});
   }

   const Makeyours =()=>
   {
        ref1.current.focus();
   }

   const AddWatchList=()=>
   {
   const Item = JSON.parse(localStorage.getItem('dataItems'));
  
    Axios.get("https://carpages-canada-mongodb.onrender.com/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
      
       console.log(res.data.auth);
        if(res.data.auth)
        {
          
          Axios.post("https://carpages-canada-mongodb.onrender.com/watchlist/insertWatchList",{userId:Item["userId"],listing_id:Listing_ID}).then((res)=>{
            console.log(res.data);

           });
        }
        setwatchStyle("watch-veh-lb-2");
        });
       setTimeout(()=>{
        setwatchStyle("watch-veh-lb");
       },2000)
        
   }


   const [ShowStructurepayment,setShowStructurepayment]=useState(false);





   console.log("currentPos..."+currentPos+"Address"+Selleraddress);
   const GOOGLE_MAP="https://www.google.com/maps/dir/?api=1&origin="+currentPos+"&destination="+Selleraddress;
   const navigateGoogle=()=>
   {
  
         CityData();
         if(currentPos && Selleraddress)
         {
          window.open(GOOGLE_MAP);
         }
         else{
          alert("Positions not recieved");

         }
   }

  var queryYear="";
  var queryModel="";
  var queryMake="";
  const [queryName,setqueryName]=useState('');
  const [queryPhone_No,setqueryPhone_No]=useState('');
  const [queryEmail,setqueryEmail]=useState('');

  const sendMessage=()=>
   {
    vehicledata.map((val)=>{
      queryYear=val.model_year;
      queryMake=val.make_name;
      queryModel=val.model_name;
    });
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/sendQueryMessagePhone",{queryName:queryName,queryPhone_No:queryPhone_No,queryEmail:queryEmail,queryYear:queryYear,queryMake:queryMake,queryModel:queryModel}).then((res)=>{
      console.log(res.data);
     });
   }
   const [vehicleYear,setvehicleYear]=useState("");
   const [vehicleMake,setvehicleMake]=useState("");
   const [vehicleModel,setvehicleModel]=useState("");
   const [vehicleTrim,setvehicleTrim]=useState("");
   const [vehiclePrice,setvehiclePrice]=useState("");
   const [tradeInPrice,settradeInPrice]=useState("");
   const [vehicleDownpayment,setvehicleDownpaymente]=useState("");
   const [vehicleLeaseDownpayment,setvehicleLeaseDownpayment]=useState("");
   const [revaluedPrice,setrevaluedPrice]=useState("");
   const [saleTax,setsaleTax]=useState("13");
   const [saleTaxValue,setsaleTaxValue]=useState("");
   const [saleTaxValue2,setsaleTaxValue2]=useState("");
   const [paymentTerms,setpaymentTerms]=useState("48");
   const [paymentInterest,setpaymentInterest]=useState("5");
   const [paymentTerms2,setpaymentTerms2]=useState("48");
   const [paymentInterest2,setpaymentInterest2]=useState("5");
   const [leaseResidualValue,setleaseResidualValue]=useState("");
   const [MonthlyPaymentValue,setMonthlyPaymentValue]=useState("");
   const [BiweeklyPaymentValue,setBiweeklyPaymentValue]=useState("");
   const [WeeklyPaymentValue,setWeeklyPaymentValue]=useState("");
   const [MonthlyPaymentValue2,setMonthlyPaymentValue2]=useState("");
   const [BiweeklyPaymentValue2,setBiweeklyPaymentValue2]=useState("");
   const [WeeklyPaymentValue2,setWeeklyPaymentValue2]=useState("");
const mileage_price_Set=()=>
{
  vehicledata.map((val)=>{
    console.log("working Here" );
  
    setvehicleYear(val.model_year);
    setvehicleMake(val.make_name);
    setvehicleModel(val.model_name);
    setvehicleTrim(val.trim_name);
     console.log("Mileage"+val.mileage+"Length"+val.mileage.length);
  });
 
  
 /* console.log("working Here out"+mileage1+"  "+mileage2+"..."+mileage3);
    if(mileage.length ===4)
    {
      console.log("working Here Inside");
      mileage1=mileage.slice(0,1);
      mileage2=mileage.slice(1);
      mileage3=mileage1.concat(",",mileage2);
       setfinalMileage(mileage3);
      console.log("working Here"+mileage1+"  "+mileage2+"..."+mileage3);
    }
    else if(mileage.length ===5)
    {
      console.log("working Here Inside");
      mileage1=mileage.slice(0,2);
      mileage2=mileage.slice(2,5);
      //mileage3=mileage.slice(3,6);
      mileage4=mileage1.concat(",",mileage3);
      setfinalMileage(mileage4);
      console.log("working Here"+mileage1+"  "+mileage2+"..."+mileage3+"..."+mileage4);
    }
    else if(mileage.length ===6)
    {
      console.log("working Here Inside");
      mileage1=mileage.slice(0,1);
      mileage2=mileage.slice(1,3);
      mileage3=mileage.slice(3,6);
      mileage4=mileage1.concat(",",mileage2,",",mileage3);
     setfinalMileage(mileage4);
      console.log("working Here"+mileage1+"  "+mileage2+"..."+mileage3+"..."+mileage4);
    }
    if(price.length ===4)
    {
      console.log("working Here Inside");
      price1=price.slice(0,1);
      price2=price.slice(1);
      price3=price1.concat(",",price2);
      setfinalPrice(price3);
      console.log("working Here"+price1+"  "+price2+"..."+price3);
    }
    else if(price.length ===5)
    {
      console.log("working Here Inside");
      price1=price.slice(0,2);
      price2=price.slice(2,5);
      price3=price1.concat(",",price2);
      setfinalPrice(price3);
      console.log("working Here"+price1+"  "+price2+"..."+price3);
    }
    else if(mileage.length ===6)
    {
      console.log("working Here Inside");
      price1=price.slice(0,1);
      price2=price.slice(1,3);
      price3=price.slice(3,6);
      price4=price1.concat(",",price2,",",price3);
      setfinalPrice(price4);
      console.log("working Here"+price1+"  "+price2+"..."+price3+"..."+price4);
    }*/
}


const TaxedPrice=()=>
{
    var a;
    var aa;
    var aaa;
    console.log("MyvehiclePrice"+MyvehiclePrice+"vehiclePrice"+vehiclePrice);
    if(MyvehiclePrice && !vehiclePrice)
    {
      console.log("MyvehiclePrice"+MyvehiclePrice+"tradeInPrice"+tradeInPrice+"vehicleLeaseDownpayment"+vehicleDownpayment);
      a=MyvehiclePrice-tradeInPrice;
      console.log(a+"tradeInPrice"+parseInt(a));
      aaa=a-vehicleDownpayment;
      aa=aaa*parseInt(saleTax)/100;
      console.log(a+"aa"+aa+"aaa"+aaa);
      setsaleTaxValue(Math.round(aa+parseInt(aaa)));
    }
   if(vehiclePrice && MyvehiclePrice)
   {
    console.log("vehiclePrice"+vehiclePrice+"tradeInPrice"+tradeInPrice+"vehicleLeaseDownpayment"+vehicleDownpayment);
    a=vehiclePrice-tradeInPrice;
    console.log(a+"tradeInPrice"+parseInt(a));
    aaa=a-vehicleDownpayment;
    aa=aaa*parseInt(saleTax)/100;
    console.log(a+"aa"+aa+"aaa"+aaa);
    setsaleTaxValue(Math.round(aa+parseInt(aaa)));
   }
    
   
    console.log("a"+a+"vehiclePrice"+vehiclePrice+"vehicleDownpayment"+vehicleDownpayment);
    console.log("saleTaxValue"+saleTaxValue);
    finalTaxedPrice();
   
}
const finalTaxedPrice=()=>
{    
    
    const Interest_on_vehicle_price=saleTaxValue*parseInt(paymentInterest)/100;
    console.log("Interest_and_vehicle_price"+Interest_on_vehicle_price);
    const Interest_plus_vehicle_price=Interest_on_vehicle_price+saleTaxValue;
    console.log("Interest_plus_vehicle_price"+Interest_plus_vehicle_price);
    const payment_each_month=Interest_plus_vehicle_price/parseInt(paymentTerms);
    console.log("payment_each_month"+payment_each_month);
    const abc=(parseInt(payment_each_month)*parseInt(paymentInterest))/100;
    console.log("abc"+abc);
    setMonthlyPaymentValue(Math.round(payment_each_month+abc));
    //console.log("ab"+ab);
    setBiweeklyPaymentValue(Math.round(MonthlyPaymentValue/2));
    setWeeklyPaymentValue(Math.round(MonthlyPaymentValue/4));
}

const TaxedPrice2=()=>
{
  var a;
  var aa;
  var aaa;
  if(MyvehiclePrice && !vehiclePrice)
  {
    console.log("MyvehiclePrice"+MyvehiclePrice+"tradeInPrice"+tradeInPrice+"vehicleLeaseDownpayment"+vehicleLeaseDownpayment);
     a=MyvehiclePrice-tradeInPrice;
     console.log(a+"tradeInPrice"+parseInt(a));
     aaa=a-vehicleLeaseDownpayment;
     aa=aaa*parseInt(saleTax)/100;
     console.log(a+"aa"+aa+"aaa"+aaa);
     setsaleTaxValue2(Math.round(aa+parseInt(aaa)));
    }
    if(MyvehiclePrice && vehiclePrice)
   {
    console.log("MyvehiclePrice"+vehiclePrice+"tradeInPrice"+tradeInPrice+"vehicleLeaseDownpayment"+vehicleLeaseDownpayment);
     a=vehiclePrice-tradeInPrice;
     console.log(a+"tradeInPrice"+parseInt(a));
     aaa=a-vehicleLeaseDownpayment;
     aa=aaa*parseInt(saleTax)/100;
     console.log(a+"aa"+aa+"aaa"+aaa);
     setsaleTaxValue2(Math.round(aa+parseInt(aaa)));
   }
    
   
   
    console.log("saleTaxValue2"+saleTaxValue2);
  
    finalTaxedPrice2();
}

const finalTaxedPrice2=()=>
{    
    
    const Interest_on_vehicle_price=saleTaxValue2*parseInt(paymentInterest2)/100;
    console.log("Interest_and_vehicle_price"+Interest_on_vehicle_price);
    const Interest_plus_vehicle_price=Interest_on_vehicle_price+saleTaxValue2;
    const finalLeasepayment=Interest_plus_vehicle_price-leaseResidualValue;
    console.log("Interest_plus_vehicle_price"+Interest_plus_vehicle_price+"finalLeasepayment"+finalLeasepayment);

    const payment_each_month=finalLeasepayment/parseInt(paymentTerms2);
    console.log("payment_each_month"+payment_each_month);
    const abc=(parseInt(payment_each_month)*parseInt(paymentInterest))/100;
    console.log("abc"+abc);
    setMonthlyPaymentValue2(Math.round(payment_each_month+abc));
    //console.log("ab"+ab);
    setBiweeklyPaymentValue2(Math.round(MonthlyPaymentValue2/2));
    setWeeklyPaymentValue2(Math.round(MonthlyPaymentValue2/4));
}
console.log("SaleTax value"+saleTaxValue+"MonthlyPaymentValue"+MonthlyPaymentValue);
  return (
    <>
    
      {navBar ?<div id="navbar">
          <div style={{width:"100%",display:"flex",flexWrap:"nowrap",padding:"0 32px",flexFlow:"row",height:"100%",margin:"0 auto",alignItems:"center",justifyContent:"space-between"}}>
             <div style={{width:"25%",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}}>
              <div><BsArrowLeft style={{strokeWidth:"1",fontSize:"25px",color:"white",margin:"0 8px",cursor:"pointer"}} onClick={()=>window.history.back()}/></div>
              {vehicleImages.map((val)=>{
                if(val.image_id === "1")
                {
                  return <div><img src={val.image_name} style={{width:"45px",height:"45px",margin:"0 16px",objectFit:"cover",borderRadius:"50%"}} alt="" /></div>
                }
                
              })}
          {vehicledata.map((val)=>{
                
                  return <div style={{display:"flex",flexFlow:"column",color:"white",fontWeight:"600",justifyContent:"center"}}>
                              <div style={{fontSize:"17px",fontWeight:"600",marginBottom:"-3px"}}>{val.model_year} {val.make_name} {val.model_name}</div>
                              <div style={{fontSize:"16px",fontWeight:"600",marginTop:"-3px"}}>{val.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KM</div>
                         </div>
                
                
              })}

              
             </div>
             <div style={{width:"35%",display:"flex",flexFlow:"row",alignItems:"center",height:"100%",justifyContent:"center"}}>
             
                <button   className='nav-bt' onClick={()=>details()} >Detail</button>
                <button   className='nav-bt' onClick={()=>description()} >Description</button>
                <button  className='nav-bt' style={{marginRight:"0"}} onClick={()=>features()}>Features</button>
             
             </div>
             <div style={{width:"36%",display:"flex",flexFlow:"row",alignItems:"center",height:"100%",justifyContent:"space-between"}}>
             <div style={{width:"33..33333%",display:"flex",flexFlow:"row",alignItems:"center",height:"100%",justifyContent:"center"}}>
                 <ul style={{display:"flex",listStyle:"none",padding:"0"}}>
              <li><GrFacebook className='social-ic-nav' onClick={()=>{window.open("https://www.facebook.com/", "_blank", "noopener noreferrer")}}/></li>
              <li><BsTwitter className='social-ic-nav' onClick={()=>{window.open("https://twitter.com/", "_blank", "noopener noreferrer")}}/></li>
              <li><BsPinterest className='social-ic-nav' onClick={()=>{window.open("https://www.pinterest.com/", "_blank", "noopener noreferrer")}}/></li>
              <li><BsFillEnvelopeFill className='social-ic-nav' onClick={() => window.location = 'mailto:yourmail@domain.com'} /></li>
              <li><ImPrinter  className='social-ic-nav1' onClick={()=>{window.print()}}/></li>
                 </ul>
                 
             </div>
            
             {vehicledata.map((val)=>{
                
                return  <div style={{width:"33..33333%",display:"flex",margin:"0 12px",color:"white",flexFlow:"column",alignItems:"center",height:"100%",justifyContent:"center"}}>
                      <div style={{fontSize:"20px",marginBottom:"-3px",fontWeight:"600"}}>${new Intl.NumberFormat('en-US').format(val.price)}</div>
                              <div style={{fontSize:"12px",marginTop:"-3px"}}>+ tax & licensing
                  </div>
              </div>
              })}

             <div style={{width:"33..33333%",display:"flex",color:"white",alignItems:"center",height:"100%",justifyContent:"center"}}>
              <div>
                <button className='make-yours' onClick={()=>{Makeyours()}}>Make it Yours</button>
              </div>
             </div>
</div>
          </div>
        </div>:""}
     
    
    <AppHeader/>
    
         
    <div style={{backgroundColor:"lightgray"}}>
          
      <div className='main-container'>
        
           <div className='main-container-sub'>
           { vehicledata.map((val)=>{
            
            
            
            const vin_no=val.vin_no;
            const stock_no=val.stock;
            const exterior_color= val.exterior_color;
            const interior_color= val.interior_color;
            const bodystyle= val.bodystyle;
            const drivetrain= val.drivetrain;
            const transmission=val.transmission;
            const doors= val.doors;
            const fuel_type=val.fuel_type;
            const engine= val.engine;
            const seats= val.seats;
            const engine_cc=val.engine_cc;
            const engine_power= val.engine_power;
            const engine_torque= val.engine_torque;
            const fuel_capacity=val.fuel_capacity;
            const fuel_consumption_city=val.fuel_consumption_city;
            const fuel_consumption_highway=val.fuel_consumption_highway;
            const veh_Description=val.vehicle_description;
            const Safety=val.safety.split(",");
            const Driver_Assistance=val.driver_assistance.split(",");
            const lighting=val.lighting.split(",");
            const infotainment=val.infotainment.split(",");
            const connectivity=val.connectivity.split(",");
            const comfort=val.comfort.split(",");
            const convenience=val.convenience.split(",");
            const exterior=val.exterior.split(",");
            const security=val.security.split(",");
            const status=val.sale_status;
            return   <div className='veh-details-main-container'>
                                <div className='veh-details-sub-container'>
                                <div className='bt-brd'>
                                    <div className='veh-title-container'>
                                        <div className='veh-title-sect'>
                                            <h3 className='veh-title-heading1'>{val.model_year} {val.make_name} {val.model_name}</h3>
                                            <h5 className='veh-title-heading2'>{val.vehicle_top_features}</h5>
                                        </div>
                                        <div className='watch-veh'>
                                        <Tippy content={<span><Link to="#" className='watch-veh-lnk'>Sign In</Link> or <Link to="#" className='watch-veh-lnk'>Register</Link> to use this feature.</span>}>
                                            <label className={watchStyle} onClick={()=>{AddWatchList()}} ><i className="fa-solid fa-eye" style={{marginRight:"5px"}}></i>Watch this Vehicle</label>
                                           </Tippy>  
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='bt-brd veh-title-container jc-spbt'>
                                    <div  >
                                        <div >
                                            <button  className='back-rs' onClick={()=>window.history.back()}><IoIosArrowBack style={{marginRight:"8px",paddingBottom:"3px"}}  />Back to search results</button>
                                        </div>
                                     </div> 
                                     <ul className='social-ic'>
                                        <li className='social-ic-it' onClick={()=>{window.open("https://www.facebook.com/", "_blank", "noopener noreferrer")}} ><img src={require('../images/cat-icons/vdp-icon--fb-grey.svg')} alt="" /></li>
                                        <li className='social-ic-it' onClick={()=>{window.open("https://twitter.com/", "_blank", "noopener noreferrer")}}><img src={require('../images/cat-icons/vdp-icon--twitter-grey.svg')} alt="" /></li>
                                        <li className='social-ic-it' onClick={()=>{window.open("https://www.pinterest.com/", "_blank", "noopener noreferrer")}}><img src={require('../images/cat-icons/vdp-icon--pin-grey.svg')} alt="" /></li>
                                        <li className='social-ic-it' onClick={()=>{window.print()}}><img src={require('../images/cat-icons/vdp-icon--print-grey.svg')} alt="" /></li>
                                        <li className='social-ic-it'  onClick={() => window.location = 'mailto:yourmail@domain.com'}><img src={require('../images/cat-icons/vdp-icon--mail-grey.svg')} alt="" /></li>
                                     </ul>
                                </div>
                                <div>
                                  
                                  <div className='img-slide-main'>
                                  {vehicleImages.length>1? <div className='slider-bt-ic'>
                                         <IoMdArrowDropleftCircle className='slider-bt-ic-left' onClick={()=>previousImage()}></IoMdArrowDropleftCircle>
                                            <IoMdArrowDroprightCircle className='slider-bt-ic-right' onClick={()=>nextImage()}></IoMdArrowDroprightCircle>
                                        </div>:""}
                                  <div  className="img-slide-sub-main" >
                                  
                                        <div className="img-map" style={{position:"relative"}}>
                                            
                                          {vehicleImages.map((val,index)=>{
                                            return <div   >
                                              {index === imgIndex && (<img src={val.image_name} style={{position:"relative",top:"0",left:"0"}}   className="slider-img-src" alt={index}/>)}
                                               


                                          </div>
                                          })}
                                          { status==="sold" ?<img src={Soldoutpic} style={{objectFit:"contain",borderRadius:"10px",position:"absolute",margin:"20px",top:"0",left:"0"}} alt=""/>:""}
                                        </div>
                                        
                                      </div>
                                      
                                  </div>

                                  <div className='img-veh-list-main'>
                                    <div className='img-veh-list'>
                                    {vehicleImages.map((val,index)=>{
                                      if(val.image_id === "1")
                                      {
                                        ImageFirst(val.image_name);  
                                      }
                                      return  <div>
                                        <img src={val.image_name} title={val.image_name} className="images-veh-list"  onClick={()=>{onImageListClick(index)}} />
                                      </div>
                                    })}
                                    </div>
                                  </div>
                                  
                                       <div className='veh-details-km-price-head'>
                                            <div>
                                              <div>
                                              <h2 style={{fontWeight:"600"}}>${new Intl.NumberFormat('en-US').format(val.price)}</h2>
                                              <p style={{fontSize:"13px",margin:"0"}}>+ taxes & licensing</p>
                                              </div>
                                              <div style={{fontSize:"16px"}}>
                                                <div ><TbGauge style={{fontSize:"21px",color:"gray",paddingBottom:"3px",marginRight:"8px"}}/><span style={{fontWeight:"400"}}>{val.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KM</span></div>
                                                <div ><BsInfoCircleFill style={{fontSize:"21px",color:"gray",paddingBottom:"3px",marginRight:"8px"}}/><span style={{fontWeight:"400"}}>Used</span></div>
                                              </div>
                                            </div>
                                        <div className='veh-detail-quotes'>
                                           <ul style={{listStyle:"none",marginBottom:"0",padding:"8px"}}>
                                            <li onClick={()=>setShowStructurepayment(true)}><label  className='veh-detail-quotes-payment'><AiOutlineDollarCircle style={{fontSize:"21px",marginRight:"8px",paddingBottom:"3px"}} />Calculate Payments</label></li>
                                            <li style={{marginTop:"16px"}}><Link to="https://www.lowestrates.ca/insurance/auto?partner=carpages" className='veh-detail-quotes-insurance'>Get Insurance Quotes</Link></li>
                                           </ul>
                                        </div>
                                       </div>
                                       <div style={{marginTop:"16px",padding:"0 32px"}}>
                                           {vin_no.length>0 && stock_no.length>0 ?<ul className='veh-detail-vin'>
                                            <li><strong>Stock #:</strong>  {val.stock}</li>
                                            <li style={{marginLeft:"30px"}}><strong>VIN:</strong>  {val.vin_no}</li>
                                            
                                           </ul>:""}
                                       </div>
                                       
                                       <div id='vehicle-detail'  style={{padding:"32px 0"}}>
                                        <div style={{padding:"16px 32px"}}>
                                          <h3>Vehicle Details</h3>
                                          <div style={{width:"50px",height:"6px",background:"green"}}></div>
                                        </div>
                                        <div  style={{padding:"0 32px"}}>
                                        <ul className='veh-primary-feature' style={{}}>
                                          {exterior_color.length>0?<li className='veh-primary-feature-item'><strong>Exterior Color</strong><span>{val.exterior_color}</span></li>:""}
                                          {interior_color.length>0?<li className='veh-primary-feature-item'><strong>Interior Color</strong><span>{val.interior_color}</span></li>:""}
                                          {bodystyle.length>0?<li className='veh-primary-feature-item'><strong>Body Style</strong><span>{val.bodystyle}</span></li>:""}
                                          {drivetrain.length>0?<li className='veh-primary-feature-item'><strong>Drivetrain</strong><span>{val.drivetrain}</span></li>:""}
                                          {transmission.length>0?<li className='veh-primary-feature-item'><strong>Transmission</strong><span>{val.transmission}</span></li>:""}
                                          {doors.length>0?<li className='veh-primary-feature-item'><strong>Doors</strong><span>{val.doors}</span></li>:""}
                                          {fuel_type.length>0?<li className='veh-primary-feature-item'><strong>Fuel Type</strong><span>{val.fuel_type}</span></li>:""}
                                          {engine.length>0?<li className='veh-primary-feature-item'><strong>Engine</strong><span>{val.engine}</span></li>:""}
                                          {seats.length>0?<li className='veh-primary-feature-item'><strong>Passengers/Seats</strong><span>{val.seats}</span></li>:""}
                                          {engine_cc.length>0?<li className='veh-primary-feature-item'><strong>{fuel_type==="Electric"?"Battery Power":"Engine Displacement"}</strong><span>{val.engine_cc} {fuel_type==="Electric"?"KW":"litre"}</span></li>:""}
                                          {engine_power.length>0?<li className='veh-primary-feature-item'><strong>Horsepower</strong><span>{val.engine_power} HP</span></li>:""}
                                          {engine_torque.length>0?<li className='veh-primary-feature-item'><strong>Torque</strong><span>{val.engine_torque} FT/LB</span></li>:""}
                                          {fuel_capacity.length>0?<li className='veh-primary-feature-item'><strong>{fuel_type==="Electric"?"Battery Range":"Fuel Capacity"}</strong><span>{fuel_capacity} {fuel_type==="Electric"?"KM":"litre"}</span></li>:""}
                                          {fuel_consumption_city.length>0?<li className='veh-primary-feature-item'><strong>Economy City</strong><span>{val.fuel_consumption_city} litre/100 KM</span></li>:""}
                                          {fuel_consumption_highway.length>0?<li className='veh-primary-feature-item'><strong>Economy Highway</strong><span>{val.fuel_consumption_highway} litre/100 KM</span></li>:""}
                                        </ul >
                                        </div>
                                       </div>
                                       
                                       {veh_Description.length>0? <section id='vehicle-description'><div  style={{background:"rgb(236, 229, 229)",padding:"32px 0"}}>
                                       <div style={{padding:"16px 32px"}}>
                                          <h3>Vehicle Description</h3>
                                          <div style={{width:"50px",height:"6px",background:"green"}}></div>
                                        </div>
                                        <div style={{padding:"0 32px"}}>
                                           <p style={{textAlign:"justify"}}>{val.vehicle_description}</p>
                                        </div>
                                       </div></section>:""}
                                       <section id='vehicle-features'>
                                       <div   style={{padding:"32px 0"}}>
                                        <div style={{padding:"16px 32px"}}>
                                          <h3>Vehicle Features</h3>
                                          <div style={{width:"50px",height:"6px",background:"green"}}></div>
                                        </div>
                                        {Safety.length>1?<div style={{padding:"16px 32px"}}>
                                         <input type="checkbox" name='features'  className='features_input' id="1" />
                                          <label className='features_label' htmlFor="1">SAFETY</label>
                                          <div className='veh-feature-list' >
                                          { Safety.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}{Safety.length}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {Driver_Assistance.length>1 ?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="2" />
                                          <label className='features_label' htmlFor="2">DRIVER ASSISTANCE</label>
                                          <div className='veh-feature-list' >
                                          {Driver_Assistance.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {lighting.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="3" />
                                          <label className='features_label' htmlFor="3">LIGHTING</label>
                                          <div className='veh-feature-list' >
                                          {lighting.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                       {infotainment.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="4" />
                                          <label className='features_label' htmlFor="4">INFOTAINMENT</label>
                                          <div className='veh-feature-list' >
                                          {infotainment.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {connectivity.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="5" />
                                          <label className='features_label' htmlFor="5">CONNECTIVITY</label>
                                          <div className='veh-feature-list' >
                                          {connectivity.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {comfort.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="6" />
                                          <label className='features_label' htmlFor="6">COMFORT</label>
                                          <div className='veh-feature-list' >
                                          {comfort.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {convenience.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="7" />
                                          <label className='features_label' htmlFor="7">CONVENIENCE</label>
                                          <div className='veh-feature-list' >
                                          {convenience.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {exterior.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="8" />
                                          <label className='features_label' htmlFor="8">EXTERIOR</label>
                                          <div className='veh-feature-list' >
                                          {exterior.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                        {security.length>1?<div style={{padding:"16px 32px"}}>
                                          <input type="checkbox" name='features'  className='features_input' id="9" />
                                          <label className='features_label' htmlFor="9">SECURITY</label>
                                          <div className='veh-feature-list' >
                                          {security.map((val)=>{
                                            
                                           return <div style={{display:"flex",justifyItems:"center",padding:"5px 0"}}><BsCheck className='veh-feature-ico'/>
                                           <span style={{fontSize:"17px"}}> {val}</span> </div>
                                                })}
                                          </div>
                                        </div>:""}
                                      </div>
                                      </section>
                                </div>
                                <div style={{display:"flex",flex:"1 1 auto",justifyContent:"center",padding:"32px 32px 0px 32px",borderTop:"1px solid lightgray"}}>
                          <p style={{textAlign:"justify",fontWeight:"600",fontSize:"18px",color:"#5a5656"}}>Please contact the seller to confirm pricing, features, odometer, and availability of this vehicle.
                            <br /> See the<Link to="#" className='veh-detail-lnk'> Carpages.ca Terms & Conditions</Link> for more details.</p>
                        </div>
                          <div style={{display:"flex",flex:"1 1 auto",justifyContent:"center",padding:"32px",borderBottom:"1px solid lightgray"}}>
                          <button style={{padding:"8px 32px",fontWeight:"600",color:'white',background:"#15af15",border:"none",borderRadius:"4px"}} onClick={()=>scrollToTop()}>Back to Top</button>
                        </div>
                                <div style={{padding:"16px "}}>
                                <label style={{fontSize:"16px",fontWeight:"600"}} >More inventory From </label><Link to={{pathname:"/dealer_inventory/"+encodeURIComponent(ENCRYPT_Seller_ID.toString())}} className='veh-detail-lnk'> <strong>{val.seller_name}</strong></Link>
                                </div>
                                <div style={{padding:"16px ",display:"flex",flexDirection:"row"}}>
                                   {
                                    moreListings.map((val)=>
                                    {
                                       var CryptoJS = require("crypto-js");
                                       var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
                                       var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();

                                      return <div style={{display:"flex",flexFlow:"row",justifyContent:"space-between"}}>
                                            <Link to={{pathname:"/listing_detail/"+encodeURIComponent(En_listing_id.toString())+"/"+encodeURIComponent(En_seller_id.toString())}}  ><img src={require('../images/listing_images/'+val.All_Listings[0].image_name+'')} style={{width:"100px",height:"80px",objectFit:"contain",borderRadius:"10px"}} alt="" /></Link>
                                            <div style={{display:"flex",flexFlow:"column",padding:"8px 16px"}} >
                                             <span><h5 style={{fontSize:"17px",marginBottom:"3px",display:"flex",width:"100%"}}><Link className='veh-detail-lnk' to={{pathname:"/listing_detail/"+encodeURIComponent(En_listing_id.toString())+"/"+encodeURIComponent(En_seller_id.toString())}}  >{val.model_year} {val.make_name} {val.model_name}</Link></h5></span>
                                             <span style={{fontSize:"14px",display:"flex",width:"100%",alignItems:"center"}}>{val.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KM</span>
                                             <span style={{display:"flex",flexFlow:"row",fontSize:"15px"}}><strong>${val.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> <p style={{fontSize:"13px"}}>+ tax & lic</p></span>
                                             
                                            </div>
                                            </div>

                                    })

                                   }
                                </div>

                        </div>
                                
                                
                            </div>}) } 
                        <div className='dealer-details-container'>
                            <div className='dealer-details-sub-container'>
                              <div style={{padding:"32px 16px",backgroundColor:"white"}}>
                              {BFM ==="yes"?<div>
                             <div className={!showBFM?'bd-rad':"bd-rad1"} >
                                <div style={{display:"flex",flexDirection:"row",alignItems:"center",padding:"16px",backgroundColor:'#5cb35d'}}>
                                
                                <IoHomeOutline style={{color:"white",fontSize:"45px"}} />
                                <h6 style={{color:"white",fontSize:"20px",marginLeft:"10px",fontWeight:"700"}}>Buy From Home Available</h6>
                                < BsFillInfoCircleFill style={{color:"white",marginLeft:"auto",marginTop:"-32px"}}/>
                                </div>
                                <div className='bfm-sect'>
                                  <div style={{width:"60%",display:"flex",flexFlow:"column"}}>
                                  <label style={{fontWeight:"600"}}>Remote Buying Options</label>
                                  <div style={{margin:"10px 0",display:"flex",flexFlow:"column"}}>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>E-Sign Documents</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Local Delivery</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Local Test Drive Delivery</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Exchange Policy</span>

                                  </div>
                                  </div>
                                  <div style={{width:"40%"}}>
                                   {!showBFM ? <button className='buy-frm-hm-see-details' onClick={()=>{setshowBFM(!showBFM)}}>See All Options</button>
                                  :  <button className='buy-frm-hm-hide-details' onClick={()=>{setshowBFM(!showBFM)}}>Hide Options</button>}
                                    </div>
                                </div>

                              </div>
                              {!showBFM ?<div className='blur-sect'></div>:""}
                              <p style={{marginTop:"16px",fontSize:"13px",fontWeight:"700",textAlign:"center",color:"#888"}}>* Remote buying options subject to local restrictions due to COVID-19. Please contact dealer for availability.</p>
                              </div> :""}
                             {selleredata.map((val)=>{
                            
                              return <div style={{padding:"16px 8px",backgroundColor:"#f2f2f2",borderRadius:"5px"}}>
                                       <h5 style={{textAlign:"center"}}>Email {val.user_name}</h5>
                                <div style={{display:"flex",flexFlow:"column",padding:"16px 8px",borderRadius:"8px"}}>
                                  <input type="text" ref={ref1} placeholder='Your Name' className='lst-dealer-cont-inp' onChange={(e)=>{setqueryName(e.target.value)}} />
                                  <input type="text" placeholder='Your email' className='lst-dealer-cont-inp' onChange={(e)=>{setqueryEmail(e.target.value)}}/>
                                  <input type="text" placeholder='Phone' className='lst-dealer-cont-inp' onChange={(e)=>{setqueryPhone_No(e.target.value)}}/>
                                  {vehicledata.map((val)=>{
                             const a=val.model_year;
                             const b=val.make_name;
                             const c=val.model_name;
                            
                             const d ="Please contact me about the "+a+" "+b+" "+c+" that you are advertising on Carpages.ca. Thank you.";
                             return <textarea name="" id="" placeholder='Message..' className='lst-dealer-cont-txtar' defaultValue={d} >
                                                 </textarea>
                             })}
                                  
                                </div>
                                <div style={{display:"flex",justifyContent:"center"}}>
                                  <button onClick={()=>{sendMessage()}} style={{padding:"8px 24px",fontWeight:"600",color:'white',background:"#15af15",border:"none",borderRadius:"4px"}} >Send Message<FaPaperPlane style={{marginLeft:"10px"}}/></button></div>
                            </div>
                             }) }

                             <div style={{padding:" 16px 32px"}}>
                              {selleredata.map((val)=>{
                                 var CryptoJS = require("crypto-js");
                                 var data ="7" ;
                                 var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(val.user_id), 'my-secret-key@123').toString();      

                             return <div style={{display:"flex",flexDirection:"column",flex:"0 0 auto",justifyContent:"center",alignItems:"center"}}>
                                                           <div><img src={val.user_image} alt="" style={{width:"200px",height:"120px",objectFit:"contain",borderRadius:"10px"}}/></div>
                                                          <div>
                                                            <h4 style={{fontWeight:"800"}}><Link to={{pathname:"/dealer_inventory/"+encodeURIComponent(ciphertext.toString())}} className='veh-detail-lnk' >{val.user_name}</Link></h4>
                                                          </div>
                                                          <div  style={{fontSize:"16px",fontWeight:"700"}}>
                                                            <span>{val.user_cityname}</span>
                                                          </div>
                                                          <div style={{fontSize:"15px"}}>
                                                          <HiLocationMarker/> {val.user_lotno} {val.user_streetname} {val.user_cityname} {val.user_province} {val.user_postalcode}
                                                          </div>
                                                          </div>
                              
                                                           })}
                                                     </div>      
                                                   {selleredata.map((val,index)=>{
                                                      const a= val.user_contactno;
                                                      const b=a.length;
                                                      const c=a.substring(0,b-4);
                                                         
                                                      return <div  style={{padding:" 16px 32px",background:"#f2f2f2",textAlign:"center"}}>
                                                          
                                                          <div style={{textAlign:"center"}}><span><strong>Call Seller</strong></span></div>
                                                          <div onClick={(e)=>{setshowContact(true)}} name={a} style={{width:"100%",display:"flex",flexDirection:"column",cursor:"pointer",textAlign:"center",color:"#4a90e2",fontWeight:"700"}}>
                                                          <h4 style={{marginBottom:"0"}}><HiPhone style={{paddingBottom:"5px",marginLeft:"10px"}} />{showContact ?a:c+"XXXX"}</h4>
                                                          <div style={{fontSize:"12px",fontWeight:"400",color:"black"}}><span>(click to show)</span></div>
                                                          </div>
                                                          <div style={{padding:"16px 0",textAlign:"center"}}>
                                                           <div style={{textAlign:"center"}}><span><strong>Quick Links</strong></span></div>
                                                             <div style={{display:"flex",width:"100%",flexDirection:"row",borderRadius:"4px",justifyContent:"space-between",background:"rgb(223 236 250)"}}> 
                                                              <span onClick={()=>{navigateGoogle()}}  target="_blank" className='seller-quick-Links' >Directions</span>
                                                              <Link to="#" className='seller-quick-Links'>Website</Link>
                                                              <Link to={{pathname:"/dealer_inventory/"+encodeURIComponent(seller_id.toString())}} className='seller-quick-Links'>Inventory</Link>
                                                             </div>
                                                           </div>
                                                          </div>
                                                           })}
                                                           
                             
                              </div>
                            </div>
                        </div>
                        
                </div>
         
        
      </div>

    </div>
    <FooterMain/>
    {ShowStructurepayment?<div style={{backgroundColor:"white"}} className="payment-structure-main">
                <div  style={{position:"relative",width:"60%",minHeight:"65vh",margin:"0 auto 0 auto",padding:"16px",boxShadow:" 0 2px 12px -2px rgb(0 0 0 / 1)"}}>
                <GrClose style={{top:"16px",right:"16px",position:"absolute",cursor:"pointer",minWidth:"1em",minHeight:"1em",textAlign:"center"}} onClick={()=>setShowStructurepayment(false)}/>
                  <div>
                    <h4 style={{textAlign:"center",fontWeight:"300",fontSize:"25px",margin:"0 0"}}>{vehicleYear} {vehicleMake} {vehicleModel}</h4>
                    <p style={{textAlign:"center",fontWeight:"500",margin:"0 0",color:"#090"}}>{vehicleTrim}</p>
                  </div>
                  <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px",backgroundColor:"black"}}>
                        <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                            <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div><label style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Vehicle Price</label></div>
                              <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center",paddingBottom:"4px"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>$</span>
                                <input className='paymnet-inp' defaultValue={MyvehiclePrice?MyvehiclePrice:vehiclePrice} style={{outline:"none",fontSize:"13px",border:"none",textAlign:"right",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} type="text"  onChange={(e)=>{setvehiclePrice(e.target.value);TaxedPrice();TaxedPrice2()}}/>
                              </div>
                            </div>
                            <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                            <div><label style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Trade-In Price</label></div>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center",paddingBottom:"4px"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>$</span>
                                <input className='paymnet-inp' style={{outline:"none",border:"none",fontSize:"13px",textAlign:"right",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={tradeInPrice} type="text" onChange={(e)=>{settradeInPrice(e.target.value);TaxedPrice();TaxedPrice2()}} />
                                </div>
                            </div>
                            <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                            <div><label style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Sales Tax</label></div>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center",paddingBottom:"4px"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>%</span>
                                <input className='paymnet-inp' style={{outline:"none",border:"none",fontSize:"13px",textAlign:"right",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={saleTax} type="text" onChange={(e)=>{setsaleTax(e.target.value);TaxedPrice();TaxedPrice2()}} />
                                </div>
                            </div>
                        </div>
                  </div>

                  <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                      <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div style={{margin:"auto 0px 0px 0px"}}><label style={{fontSize:"13px",fontWeight:"500"}}>Down Payment</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div><label style={{fontSize:"13px",fontWeight:"500"}}>Finance</label></div>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>$</span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={vehicleDownpayment} type="text" onChange={(e)=>{setvehicleDownpaymente(e.target.value);TaxedPrice()}} />
                                </div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div><label style={{fontSize:"13px",fontWeight:"500"}}>Lease</label></div>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>$</span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={vehicleLeaseDownpayment} type="text" onChange={(e)=>{setvehicleLeaseDownpayment(e.target.value);TaxedPrice2()}} />
                                </div>
                              </div>
                      </div>
                  </div>
                  <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                      <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div style={{margin:"auto 0"}}><label style={{fontSize:"13px",fontWeight:"500"}}>Estimated Residual</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                             
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>$</span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} type="text" onChange={(e)=>{setleaseResidualValue(e.target.value)}} />
                                </div>
                              </div>
                      </div>
                  </div>
                  <hr style={{height:".25px",margin:"5px 0"}} />
                  <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                      <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div style={{margin:"auto 0"}}>
                                <label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>Balance to Finance/Lease</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {saleTaxValue}</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {saleTaxValue2}</label></div>
                              </div>
                      </div>
                  </div>
                  <hr style={{height:".25px",margin:"5px 0"}} />
                  <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                      <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div style={{margin:"auto 0"}}><label style={{fontSize:"13px",fontWeight:"500"}}>Term (months)</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}> </span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={paymentTerms} type="text" onChange={(e)=>{setpaymentTerms(e.target.value)}} />
                                </div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}> </span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={paymentTerms2} type="text" onChange={(e)=>{setpaymentTerms2(e.target.value)}} />
                                </div>
                              </div>
                      </div>
                      </div>
                      <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                      <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                              <div style={{margin:"auto 0"}}><label style={{fontSize:"13px",fontWeight:"500"}}>Interest Rate</label></div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>%</span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} type="text" defaultValue={paymentInterest} onChange={(e)=>{setpaymentInterest(e.target.value)}} />
                                </div>
                              </div>
                              <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                <div style={{display:"flex",flexFlow:"row",position:"relative",alignItems:"center"}}>
                                <span style={{margin:"auto 4px",position:"absolute",fontSize:"13px",color:"grey"}}>%</span>
                                <input className='paymnet-inp2' style={{outline:"none",border:"none",fontSize:"13px",padding:"4px 16px",paddingLeft:"24px",width:"100%",borderRadius:"4px"}} defaultValue={paymentInterest2} type="text" onChange={(e)=>{setpaymentInterest2(e.target.value)}} />
                                </div>
                              </div>
                              </div> 
                      </div>
                  
                  <hr style={{height:".25px",margin:"5px 0"}} />
                          <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0px 16px"}}>
                            <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div style={{margin:"auto 0"}}>
                                      <label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>Monthly Payments</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {MonthlyPaymentValue}</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {MonthlyPaymentValue2}</label></div>
                                    </div>
                            </div>
                        </div>
                        <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0px 16px"}}>
                            <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div style={{margin:"auto 0"}}>
                                      <label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>Bi-weekly Payments</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {BiweeklyPaymentValue}</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {BiweeklyPaymentValue2}</label></div>
                                    </div>
                            </div>
                        </div>
                        <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"0 16px 0 16px"}}>
                            <div style={{padding:"4px 16px",display:"flex",flexFlow:"row",width:"100%",justifyContent:"space-between"}}>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div style={{margin:"auto 0"}}>
                                      <label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>Weekly Payments</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {WeeklyPaymentValue}</label></div>
                                    </div>
                                    <div style={{width:"32%",display:"flex",flexFlow:"column"}}>
                                    <div><label style={{fontSize:"13px",fontWeight:"500",color:"#090"}}>$ {WeeklyPaymentValue2}</label></div>
                                    </div>
                            </div>
                        </div>
                        <hr style={{height:".25px",margin:"5px 0"}} />
                        <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"8px 16px"}}>
                        <button style={{borderRadius:"4px",border:"1px solid transparent",backgroundColor:"#090",padding:"8px 16px",color:"white"}} onClick={()=>{TaxedPrice();TaxedPrice2()}}>Calculate</button>
                        </div>
                        <div style={{display:"flex",flex:"0 0 auto",borderRadius:"4px",flexDirection:"row",padding:"4px 16px"}}>
                          <p style={{width:"100%",padding:"8px",border:"1px solid #375e8a",borderRadius:"4px",backgroundColor:"#d1ddeb",fontSize:"13px"}}>
                            <span>
                              Interest rates shown above are for demonstration purposes only. Rates are not guaranteed by Carpages.ca or the seller of this vehicle.
                            </span>
                          </p>
                        </div>
                </div>
           </div>:""}
    </>
  )
}
