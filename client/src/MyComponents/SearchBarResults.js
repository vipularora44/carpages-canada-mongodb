import React ,{ useEffect,useState } from 'react';
import { useLocation,Link, Navigate, useNavigate } from 'react-router-dom';
import AppHeader from '../MyComponents/AppHeader.js';
import FooterMain from '../MyComponents/FooterMain.js';
import '../Mystyles/searchbarresults.css';
import Axios from 'axios';

import {BsTelephoneFill} from 'react-icons/bs';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {IoHomeOutline} from 'react-icons/io5';
import {IoSyncCircleSharp} from 'react-icons/io5';
import {FaTruck} from 'react-icons/fa';
export default function SearchBarResults() {
    const MyLocation=useLocation();
    const MyState=MyLocation.state;
    const navigate=useNavigate();
    var keywordLocation="";
    const [dealerResults,setDealerResults]=useState([]);
    const [listingsResults,setlistingsResults]=useState([]);
    const [contactid,setcontactid]=useState([]);
    const [showContact,setshowContact]=useState("");
    const [showTab,setshowTab]=useState("1");
    
   useEffect(()=>
   { 
    if(MyState)
    {
      if(MyState.keyWord !=="")
    {  
        keywordLocation = JSON.parse(localStorage.getItem('User_Choice_Location'));
            Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/search_bar",{keyword:MyState.keyWord,location:keywordLocation["SearchBarLocation"]}).then((res)=>{
            console.log(res.data);
            setlistingsResults(res.data);
            });
             Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/search_bar",{keyword:MyState.keyWord,location:keywordLocation["SearchBarLocation"]}).then((res)=>{
             console.log(res.data);
             setDealerResults(res.data);
             });
    }
    else if(MyState.keyWord ==="")
    {
        alert("Empty");
    }}

   },[MyState]);


   const InsertContact =(e,f)=>
     {
           // arra1=f;
          // console.log(arra1+"####");
          setshowContact(e);
          setcontactid(contactid=>[...contactid,e]);
     }

   var PagedaNo="";
   
   const displayusers=dealerResults.length > 0 ?dealerResults.slice(0,10).map((val,index)=>{
                       
       const a= val.user_contactno;
       const b=a.length;
       const c=a.substring(0,b-4);
       var CryptoJS = require("crypto-js");
       var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(val.user_id), 'my-secret-key@123').toString();
      
       return <div className={index ===9?'shd-delaer-list-sect-2':dealerResults.length-1 === index ?'shd-delaer-list-sect-2':'shd-delaer-list-sect'} >
       <Link className='shd-deal-pic'  to={{pathname:"/dealer_inventory/"+encodeURIComponent(ciphertext.toString())}} >
           <img src={require('../images/dealer-images/'+val.user_image+'')}  style={{width:"200px",height:"120px"}} alt="" />
       </Link>
    
       <div className='shd-deal-info'>
           <div className=''>
                   <h5 style={{marginBottom:"-2px"}}><Link to={{pathname:"/dealer_inventory/"+encodeURIComponent(ciphertext.toString())}} className='shd-deal-nm-hd-lk'>{val.user_name}</Link></h5>
                   <p className='shd-deal-nm-city-nm'>{val.user_cityname}, {val.user_province}</p>
           </div>
           <div>
              <button className='shd-bt-cont' value={a} onClick={(e)=>{InsertContact(e.target.value,index)}}><BsTelephoneFill  className='shd-phone-ico'/>{ contactid.includes(val.user_contactno)? a:c+"XXXX (click to show)"}</button>
           </div>
       </div>
       <div className='shd-buy-frm-home'>
            <div style={{marginBottom:"10px"}}>
           <AiOutlineUnorderedList className='shd-vinv-icon'/> 
           <a href="" className='shd-rst-filter'> View Inventory</a>
           </div>
           <div>
            <a href="" className='buy-frm-home-lnk'>
               <div className='shd-buy-frm-home-sect'>
               <IoHomeOutline class="fa-solid fa-house-circle-check shd-house"/>
               </div>
               <div className='shd-buy-hm-lnk'>
               <div className='shd-buy-hm-lnk-sect' style={{display:"inline-flex"}}>
                 <span >Buy from Home Options</span>
               </div>
                <div className='shd-buy-hm-lnk-sect1'> 
                <div style={{width:"50%"}}><FaTruck/></div>
                <div style={{width:"50%"}}><IoSyncCircleSharp/></div>
                </div>
               </div>
            </a>
           </div>
       </div>
   </div>
   }):"";
   const Results =listingsResults.length > 0 ? listingsResults.slice(0,10).map((val,index)=>{
    const buyFhome=val.buy_from_home;
    const seller_id=val.seller_id;
    var CryptoJS = require("crypto-js");
    var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
    var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();
    return <div className={index ===9?'shd-delaer-list-sect-2':listingsResults.length-1 === index ?'shd-delaer-list-sect-2':'shd-delaer-list-sect'}>
        
   <Link to={{pathname:"/listing_detail/"+encodeURIComponent(En_listing_id.toString())+"/"+encodeURIComponent(En_seller_id.toString())}}    className='shd-deal-pic' >
        <div >
          <img src={require('../images/listing_images/'+val.All_Listings[0].image_name+'')}  style={{width:"150px",height:"105px",objectFit:"contain",borderRadius:"10px"}} alt="" />
        </div>
   </Link>
   <div style={{width:"100%",display:"flex",flexFlow:"row"}}>
  
        <div className='shd-deal-info' style={{width:"66.666666%"}}>
            <div className=''>
                    <h5 style={{marginBottom:"-2px",fontSize:"18px",fontWeight:"700"}}><Link className='vehicle-heading-detail' to={{pathname:"/listing_detail/"+encodeURIComponent(En_listing_id.toString())+"/"+encodeURIComponent(En_seller_id.toString())}}>{val.model_year} {val.make_name} {val.model_name}</Link></h5>
                    <p className='shd-deal-nm-city-nm'>{val.vehicle_top_features}</p>
            </div>
            <div style={{display:"flex",flexFlow:"row",width:"auto",alignItems:"center"}}>
              <div className='sr-veh-details' style={{marginLeft:"0",display:"flex",flexDirection:"column"}} >
                    <span style={{fontWeight:"700"}}>${new Intl.NumberFormat('en-US').format(val.price)}</span>
                    
              </div>
              <div className='sr-veh-details'>{new Intl.NumberFormat('en-US').format(val.mileage)} KM</div>
              <div className='sr-veh-details' style={{display:"flex",flexFlow:"row",alignItems:"center"}}>
                <div style={{border:"1px solid lightgrey",borderRadius:"4px",padding:"5px",width:"5px",height:"5px",marginRight:"8px",backgroundColor:val.exterior_color}}>
                  
                </div>
                {val.exterior_color}
                </div>
            </div>
            <label  style={{fontSize:"12px"}}>+ tax & lic</label>
        </div>
        <div className='shd-buy-frm-home' style={{width:"33.333333%"}}>
          
            <div style={{marginBottom:"10px"}}>
                <strong style={{fontSize:"15px"}}>{val.seller_name}</strong>
                <p style={{margin:"0",fontSize:"13px"}}>{val.city_name}</p>
            </div>
            {buyFhome ==="yes" ?<div>
            <a href="" className='buy-frm-home-lnk'>
                <div className='shd-buy-frm-home-sect'>
                <IoHomeOutline class="fa-solid fa-house-circle-check shd-house"/>
                </div>
                <div className='shd-buy-hm-lnk'>
                <div className='shd-buy-hm-lnk-sect'>
                  <span >Buy from Home Options</span>
                </div>
                <div className='shd-buy-hm-lnk-sect1'> 
                <div style={{width:"50%"}}><FaTruck/></div>
                <div style={{width:"50%"}}><IoSyncCircleSharp/></div>
                </div>
                </div>
            </a>
            </div>:""}
        </div>
    </div>
  </div>
   }):""


   console.log("showTab"+showTab);
  return (
    <>
    <div className='main-container'  >
    <AppHeader/>
    <div style={{backgroundColor:"lightgrey",minHeight:"70vh",paddingBottom:"12px"}}>
    <div className='srch-rs-row  srch-rs-row-fd' style={{backgroundColor:"white",flexDirection:"column",borderRadius:"5px"}} >
               <div  style={{padding:"16px"}}>
                <div>
                        <h1 >Search Results for <strong style={{color:"rgb(1, 153, 1)"}}>{MyState?MyState.keyWord:""}</strong> </h1>
                </div>
                <div style={{padding:"8px 16px"}}>
                        <ul class="nav nav-tabs">
                        <li class="nav-item" onClick={()=>{setshowTab("1")}}>
                            <button className={showTab==="1"?"nav-link  fnt-sz":"nav-link  fnt-sz tab-clr"}  >Used & New Inventory ({listingsResults.length>0?listingsResults.length:"0"})</button>
                        </li>
                        
                        <li class="nav-item" onClick={()=>{setshowTab("2")}}>
                            <button className={showTab==="2"?"nav-link  fnt-sz":"nav-link  fnt-sz tab-clr"}  >Dealers ({dealerResults.length>0?dealerResults.length:"0"})</button>
                        </li>
                        </ul> 
                </div>
                </div>
               { showTab==="1"?<div style={{width:"65%",padding:"16px"}}>
                {Results}


                {listingsResults.length>10?<div style={{padding:"16px"}}>
                <button className='fnd-car-bt' style={{padding:"3px 16px"}} onClick={(e)=>{navigate("/search-results",{state:{showresult:MyState.keyWord}})}}>See All Results</button>
                </div>:""}
                
                </div>:""}

                
                {showTab==="2"?<div style={{width:"65%",padding:"16px"}}>
                {displayusers}


                {dealerResults.length>10?<div style={{padding:"16px"}}>
                <button className='fnd-car-bt' style={{padding:"3px 16px"}} onClick={(e)=>{navigate("/showdealer",{state:{showDeal:MyState.keyWord}})}}>See All Results</button>
                </div>:""}
                
                </div>:""}
    </div>
    </div>
    <FooterMain/>
    </div>
    </>
  )
}
