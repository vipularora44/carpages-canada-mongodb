import React, { useEffect, useState,useRef }   from 'react'
import '../Mystyles/userpage.css'
import AppHead from '../MyComponents/AppHeader.js'
import Footer from '../MyComponents/FooterMain.js'
import styled from 'styled-components'
import Axios from 'axios';

import {HiSortDescending,HiOutlineDotsVertical} from 'react-icons/hi';
import ReactPaginate from 'react-paginate';
import {IoHomeOutline} from 'react-icons/io5';
import {IoSyncCircleSharp} from 'react-icons/io5';
import {FaTruck,FaClipboardList} from 'react-icons/fa';
import { Link,useNavigate ,useParams} from 'react-router-dom'

export default function UserPage() {

  const [sel, setSel]= useState("1");
  const [sel1, setSel1]= useState(false);
  const [userName , setuserName]= useState('');
  const ref = useRef();
  const ref1 = useRef();
  const [userId , setuserId]= useState('');
  const [userData , setuserData]= useState([]);
  const [province , setprovince]= useState('');
  const [email , setemail]= useState('');
  const [email1 , setemail1]= useState('');
  const [cityName , setcityName]= useState('');
  const [cityName1 , setcityName1]= useState('');
  const [lotNo , setlotNo]= useState('');
  const [lotNo1 , setlotNo1]= useState('');
  const [streetNo , setstreetNo]= useState('');
  const [streetNo1 , setstreetNo1]= useState('');
  const [postalCode , setpostalCode]= useState('');
  const [postalCode1 , setpostalCode1]= useState('');
  const [contactNo , setcontactNo]= useState('');
  const [contactNo1 , setcontactNo1]= useState('');
  const [altcontactNo , setaltcontactNo]= useState('');
  const [altcontactNo1 , setaltcontactNo1]= useState('');
  const [image , setimage]= useState('');
  const [B_f_M , setB_f_M]= useState('');
  const [userOBJID , setuserOBJID]= useState('');
  const [oldprovince , setoldprovince]= useState('');
  const [password , setpassword]= useState('');
  const [password1 , setpassword1]= useState('');
  const [newpassword , setnewpassword]= useState('');
  const [userType , setuserType]= useState('');
  const [getListings , setgetListings]= useState([]);
  const [watchList , setwatchList]= useState([]);
  const [deviceList , setdeviceList]= useState([]);
  const [myListings , setmyListings]= useState([]);
  const [showModal , setshowModal]= useState(false);
  const [listingDeleteId , setlistingDeleteId]= useState('');
  const [MylistingOptions , setMylistingOptions]= useState(false);
  const [MyWatchlistOptions, setMyWatchlistOptions]= useState(false);
  const [MylistingOptionsIndex , setMylistingOptionsIndex]= useState("");
  const [MyWatchlistOptionsIndex, setMyWatchlistOptionsIndex]= useState("");
  let vehC=0;
  var USERDATA=userData;
  var Item;
  const navigate= useNavigate();
  const {menu}=useParams();
  let pass;
 
  const LoginSetting=()=>{
    console.log("menu"+JSON.stringify(menu));
    if(menu === "Watchlist")
    {
      console.log("if"+JSON.stringify(menu));
      setSel("1");
    }
    else if(menu === "Setting")
    {
     console.log("else"+JSON.stringify(menu));
      setSel("3");
    }
  }
  
  const [browser_info, setbrowser_info]= useState('');
  const [browser_version , setbrowser_version]= useState('');
  const [operating_system, setoperating_system]= useState('');
  const [platform_info   , setplatform_info]= useState('');
  
   useEffect(()=>{
 
  Item = JSON.parse(localStorage.getItem('dataItems'));
  
  Axios.get("https://carpages-canada-mongodb.onrender.com/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
    
     console.log(res.data.auth);
      if(!res.data.auth)
      {
        console.log("working");
         navigate("/");
      }
      else
      {
        LoginSetting();
        setuserName(Item["username"]);
        setuserId(Item["userId"]);
        setuserType(Item["usertype"]);
      }
     });
     Axios.post("https://carpages-canada-mongodb.onrender.com/users/getDealerDetails",{userId:Item["userId"]}).then((res)=>{
      console.log(res.data);
      setuserData(res.data);
     });

  Axios.get("https://carpages-canada-mongodb.onrender.com/users/userDeviceInfo").then((res)=>{
    console.log(res.data);
    setbrowser_info(res.data[0].browser);
    setbrowser_version(res.data[0].version);
    setoperating_system(res.data[0].os);
    setplatform_info(res.data[0].platform);
  });
  Axios.post("https://carpages-canada-mongodb.onrender.com/users/InsertuserDeviceInfo",{userId:Item["userId"]}).then((res)=>{
    console.log(res.data);
  });
  GetuserDeviceInfo();
console.log("USER ID"+userId);




},[userId,menu]);

useEffect(()=>{
  
  getUserIwatchListID();
  getMyListings();
  RollData();
  if(watchList.length>0)
  {
    RollID();
  }
},[USERDATA])



useEffect(()=>
{    const checkIfClickedOutside = e => {
  // If the menu is open and the clicked target is not within the menu,
  // then close the menu
     if (MyWatchlistOptions && ref.current && !ref.current.contains(e.target)) {
        setMyWatchlistOptions(false);
        console.log("menu");
     }
      if(MylistingOptions  && ref1.current && !ref1.current.contains(e.target))
     {
        setMylistingOptions(false);
         console.log("div");
     }
 
 
     }
     document.addEventListener("mousedown",checkIfClickedOutside);
    
    return () => {
      // Cleanup the event listener
       document.removeEventListener("mousedown",checkIfClickedOutside);
      }

},[MylistingOptions,MylistingOptionsIndex,MyWatchlistOptions,MyWatchlistOptionsIndex]);



const getMyListings=()=>
{
  Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getUserListings",{userId:userId}).then((res)=>{
    console.log(res.data);
    setmyListings(res.data);
});
}
const getUserIwatchListID=()=>
{
  Axios.post("https://carpages-canada-mongodb.onrender.com/watchlist/getUserWatchList",{userId:userId}).then((res1)=>{
    console.log(res1.data);
    setwatchList(res1.data);
});
}
let watchLength=watchList.length;
console.log("getListings"+getListings.length+"watchLength"+watchLength);
console.log("USER ID"+userId);

useEffect(()=>{
  if(watchList.length>0)
  {
    RollID();
  }
  else if(getListings.length !== watchLength )
  {
    setgetListings([]);
  }
 
},[watchList,watchLength])
var IDs=[];
const RollID=()=>
{
  watchList.map((val)=>{
    IDs.push(val.listing_id);
  })
  if(IDs.length>0)
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/watchlist/getUserWatchList1",{listings:IDs}).then((res1)=>{
      console.log(res1.data);
      setgetListings(res1.data);
});
  }
 
}
 
const RollData=()=>
{
  USERDATA.map((val)=>{
   
    setpassword1(val.user_password);
    setoldprovince(val.user_province);
    setemail1(val.user_email);
    setlotNo1(val.user_lotno);
    setcityName1(val.user_cityname);
    setstreetNo1(val.user_streetname);
    setpostalCode1(val.user_postalcode);
    setcontactNo1(val.user_contactno);
    setaltcontactNo1(val.alternate_contact);
    setB_f_M(val.buy_from_home);
    setuserOBJID(val._id);
  })
 
}

 const selectClass=(e)=>
 {
  if(e === 1)
  {
    setSel("1");
 
  }
  else if(e === 2)
  {
    setSel("2");
  
  }
  else if(e === 3)
  {
    setSel("3");
    
  }
  else if(e === 4)
  {
    setSel("4");
    navigate("/addlisting");
  }
  else if(e === 5)
  {
    setSel("5");
  }
  
 }   

 const checkfocusOut=()=>
 {
   
   if(password.length > 0 )
   {
    console.log(password+"...checkfocusOut..."+password1 );
    if(password1 !== password)
    {
      alert("pasword not matched")
    }
   }
 }

 const ChooseProvince =(e)=>
 {
     
     setprovince(e);
 }
 const changePass=()=>
 {
  Axios.post("https://carpages-canada-mongodb.onrender.com/users/updatePassword",{userId:userOBJID,user_pass:newpassword}).then((res)=>{
      console.log(res.data);
      
    });
 }
 const changeProfile=()=>
 {
  alert(userOBJID);
  
  const formData =new FormData();
  if(image)
  {
    
   
     formData.append('userId',userOBJID);
     formData.append('username',userName);
     formData.append('email',email.length>0?email:email1);
     formData.append('lotno',lotNo.length>0?lotNo:lotNo1);
     formData.append('streetname',streetNo.length>0?streetNo:streetNo1);
     formData.append('cityname',cityName.length>0?cityName:cityName1);
     formData.append('province',province.length>0?province:oldprovince);
     formData.append('postalcode',postalCode.length>0?postalCode:postalCode1);
     formData.append('contact',contactNo.length>0?contactNo:contactNo1);
     formData.append('altcontact',altcontactNo.length>0?altcontactNo:altcontactNo1);
     formData.append('image', image);
     formData.append('usertype',userType);
     formData.append('imageChanged',"Yes");
      Axios.post("https://carpages-canada-mongodb.onrender.com/users/updatetuser", formData ).then ((response1) =>{
         console.log(response1);
      });
  }
  else if(image.length === 0)
    {
      alert("Do you want to continue witout uploading ");
      
      formData.append('userId',userOBJID);
      formData.append('username',userName);
      formData.append('email',email.length>0?email:email1);
      formData.append('lotno',lotNo.length>0?lotNo:lotNo1);
      formData.append('streetname',streetNo.length>0?streetNo:streetNo1);
      formData.append('cityname',cityName.length>0?cityName:cityName1);
      formData.append('province',province.length>0?province:oldprovince);
      formData.append('postalcode',postalCode.length>0?postalCode:postalCode1);
      formData.append('contact',contactNo.length>0?contactNo:contactNo1);
      formData.append('altcontact',altcontactNo.length>0?altcontactNo:altcontactNo1);
     // formData.append('image', oldimage);
      formData.append('usertype',userType);
      formData.append('imageChanged',"No");
       Axios.post("https://carpages-canada-mongodb.onrender.com/users/updatetuser", formData ).then ((response1) =>{
          console.log(response1.data.affectedRows);
         
       });
    }
 }
 const DeleteWatchlist=(e)=>
 {
  alert("DeleteWatchlist works"+e);
  Axios.post("https://carpages-canada-mongodb.onrender.com/watchlist/deleteWatchList",{userId:userId,listing_id:e}).then ((response1) =>{
         console.log(response1.data);
         if(response1.data[0].message === "Watchlist Deleted")
         {
          console.log("Loading works");
          setTimeout(()=>{
            getUserIwatchListID();
            setSel("1");
          setMyWatchlistOptions(false);
          },1500)
           
         }
        
      });
 }
 const DeleteListing=(e)=>
 {
    console.log("ListingId..."+e);
 }
 const UpdateListing=(e)=>
 {
  var CryptoJS = require("crypto-js");
  
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(e), 'my-secret-key@123').toString();
    navigate("/update_listing/"+encodeURIComponent(En_listing_id));
 }
 const Update_Buy_From_Home=(e)=>
 {
  alert(e)
  if(e===true)
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/updatetBuyFromHome",{userId:userOBJID,B_f_M:"yes"}).then ((response1) =>{
      console.log(response1.data);
     
   });
  }
  else if(e===false)
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/updatetBuyFromHome",{userId:userOBJID,B_f_M:"no"}).then ((response1) =>{
      console.log(response1.data);
     
   });
  }
  

 }
  const changeSaleStatus=(ID,status)=>
{

  console.log("ID..."+ID+"status.."+status);
  if(status==="unsold")
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/listings/updatetSaleStatus",{ListingId:ID,status:"sold"}).then ((response1) =>{
      console.log(response1.data);
     
   });
  }
  else if(status==="sold")
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/listings/updatetSaleStatus",{ListingId:ID,status:"unsold"}).then ((response1) =>{
      console.log(response1.data);
     
   });
  }
  window.history.replaceState(null, "New Page Title", "#")
}

const GetuserDeviceInfo=()=>
{
  Item = JSON.parse(localStorage.getItem('dataItems'));
  Axios.post("https://carpages-canada-mongodb.onrender.com/users/GetuserDeviceInfo",{userId:Item["userId"]}).then((res)=>{
    console.log(res.data);
    setdeviceList(res.data);
  });
}
const DeleteDevices_Browser=(e)=>
{
  Axios.post("https://carpages-canada-mongodb.onrender.com/users/DeleteuserDeviceInfo",{Id:e}).then((res)=>{
    console.log(res.data);
    GetuserDeviceInfo();
  });
}






//console.log("MyWatchlistOptions"+MyWatchlistOptions);

 const [pageNumber, setpageNumber] = useState(0);
 const resultsPerPage=10;
 const pagevisited= pageNumber * resultsPerPage;
 const initialRecord=pagevisited + 1;
 const lastlRecord=pagevisited + 1 * 10;
 const PageCount= Math.ceil( getListings.length / resultsPerPage );
 const changepage=({selected})=>
 {
     
      setpageNumber(selected);
 }
 const goNavigate = useNavigate();
console.log("Modal working.."+showModal);
 
const Results =getListings.length > 0 ? getListings.slice(pagevisited, pagevisited + resultsPerPage).map((val,index)=>{
const buyFhome=val.Complete[0].buy_from_home;
const seller_id=val.seller_id;
var CryptoJS = require("crypto-js");

  var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();
return <div style={{display:"flex",flexDirection:"column",borderBottom:"1px solid lightgray"}}><div className='shd-delaer-list-sect' style={{border:"none"}}>
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
       <div style={{display:"flex",flexFlow:"row",width:"auto"}}>
         <div className='sr-veh-details' style={{marginLeft:"0",display:"flex",flexDirection:"column"}} >
               <span style={{fontWeight:"700"}}>${val.price}</span>
               <label  style={{fontSize:"12px"}}>+ tax & lic</label>
         </div>
         <div className='sr-veh-details'>{val.mileage} KM</div>
         <div className='sr-veh-details'>{val.exterior_color}</div>
       </div>
   </div>
   <div className='shd-buy-frm-home' style={{width:"33.333333%"}}>
     
       <div style={{marginBottom:"10px"}}>
           <strong style={{fontSize:"15px"}}>{val.seller_name}</strong>
           <p style={{margin:"0",fontSize:"13px"}}>{val.city_name}</p>
       </div>
       {buyFhome ==="yes" ?<div>
       <a href="" className='buy-frm-home-lnk'>
           <div className='shd-buy-frm-home-sect' >
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
   
   <div  style={{width:"30px",display:"flex",flexFlow:"row",position:"relative"}}>
                        <HiOutlineDotsVertical onClick={()=>{setMyWatchlistOptions(true);setMyWatchlistOptionsIndex(+index+1)}} className='img-opt-menu-dots'/>
                        
                          {MyWatchlistOptions &&  MyWatchlistOptionsIndex ===+index+1?
                          <div ref={ref} className='img-opt-menu-ul-sect' style={{backgroundColor:"#f8f3f3",boxShadow:"3px 3px white"}}>
                            <ul className='img-opt-menu-ul' style={{width:"max-content",marginBottom:"0"}}>
                            <li className='img-opt-menu-litem' onClick={()=>{DeleteWatchlist(val.listing_id)}}>Delete WatchList</li>
                            </ul> 
                          </div>:""}
                        </div>
                        
</div>
 
</div>


</div>
}):""


const [pageNumber1, setpageNumber1] = useState(0);
const resultsPerPage1=10;
const pagevisited1= pageNumber1 * resultsPerPage1;
const initialRecord1=pagevisited1 + 1;
const lastlRecord1=pagevisited1 + 1 * 10;
const PageCount1= Math.ceil( myListings.length / resultsPerPage1 );
const changepage1=({selected})=>
{
    
     setpageNumber1(selected);
}



const MyListingsResults =myListings.length > 0 ? myListings.slice(pagevisited1, pagevisited1 + resultsPerPage1).map((val,index)=>{
  const buyFhome=val.Complete[0].buy_from_home;
  const seller_id=val.seller_id;
  const status=val.sale_status;
  var CryptoJS = require("crypto-js");

  var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();
  return <div style={{display:"flex",flexDirection:"column",borderBottom:"1px solid lightgray"}}><div className='shd-delaer-list-sect' style={{border:"none"}}>
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
         <div style={{display:"flex",flexFlow:"row",width:"auto"}}>
           <div className='sr-veh-details' style={{marginLeft:"0",display:"flex",flexDirection:"column"}} >
                 <span style={{fontWeight:"700"}}>${val.price}</span>
                 <label  style={{fontSize:"12px"}}>+ tax & lic</label>
           </div>
           <div className='sr-veh-details'>{val.mileage} KM</div>
           <div className='sr-veh-details'>{val.exterior_color}</div>
         </div>
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
    
     <div  style={{width:"100px",display:"flex",flexFlow:"row",position:"relative"}}>
                        <HiOutlineDotsVertical onClick={()=>{setMylistingOptions(true);setMylistingOptionsIndex(+index+1)}} className='img-opt-menu-dots'/>
                        
                          {MylistingOptions && MylistingOptionsIndex ===+index+1?
                          <div ref={ref1} style={{backgroundColor:"#f8f3f3",boxShadow:"3px 3px white"}}  className='img-opt-menu-ul-sect'>
                            <ul style={{width:"max-content",marginBottom:"0"}} className='img-opt-menu-ul'>
                            <li style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{setshowModal(true);setlistingDeleteId(val.listing_id)}}>Delete Listing</li>
                            <li  style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{UpdateListing(val.listing_id)}}>Update Listing</li>
                            {status==="sold"?<li className='img-opt-menu-litem' onClick={()=>{changeSaleStatus(val.listing_id,status)}}>UnSold Vehicle</li>:""}
                            </ul> 
                          </div>:""}
                        </div>
                        
  </div>
  </div>
  <div className='rmv-veh-sect' style={{justifyContent:"flex-end",alignItems:"end"}}> 
  </div>
  
  </div>
  }):""
  return (
    <>
    <AppHead></AppHead>
    <div className='usp-main'>
      <div className='usp-sub-cnt'>
        <div className='usp-sub-cnt1'>
            <div className='usp-side-menu'>
              <div className='usp-bg-white'>
               <div className='usp-pad'>
                <h5 className='usp-sidenav-hed'>Welcome <strong>{userName}</strong></h5>
               </div>
               <ul className='usp-sidenav-lst' >
                <li value="1" className={sel === '1' ?'usp-sidenav-lst-item-1':'usp-sidenav-lst-item'} onClick={(e)=>{selectClass(e.target.value);setSel1(!sel)}}><i class="fa-solid fa-eye usp-clr-bl"></i>Watchlist</li>
                <li value="2" className={sel === '2' ?'usp-sidenav-lst-item-1':'usp-sidenav-lst-item'} onClick={(e)=>{selectClass(e.target.value);setSel1(!sel)}}><i class="fa-solid fa-mobile-screen-button usp-clr-bl"></i>Devices</li>
                <li value="3" className={sel === '3' ?'usp-sidenav-lst-item-1':'usp-sidenav-lst-item'} onClick={(e)=>{selectClass(e.target.value);setSel1(!sel)}}><i class="fa-solid fa-gear usp-clr-bl"></i>Settings</li>
                <li value="4" className={sel === '4' ?'usp-sidenav-lst-item-1':'usp-sidenav-lst-item'} onClick={(e)=>{selectClass(e.target.value);setSel1(!sel)}}><i class="fa-solid fa-car-side usp-clr-bl"></i>Sell Car</li>
                <li value="5" className={sel === '5' ?'usp-sidenav-lst-item-1':'usp-sidenav-lst-item'} onClick={(e)=>{selectClass(e.target.value);setSel1(!sel)}}><FaClipboardList className="usp-clr-bl" />Your Listings</li>
               </ul>
            </div>
            </div>
            { USERDATA.map((val)=>{
    
    const user_name=val.user_name;
    const user_email=val.user_email;
    const user_province=val.user_province;
    const user_cityname=val.user_cityname;
    const user_lotno=val.user_lotno;
    const user_streetname=val.user_streetname;
    const user_postalcode=val.user_postalcode;
    const user_contactno=val.user_contactno;
    const alternate_contact=val.alternate_contact;
    const b_f_m=val.buy_from_home;
    const user_image=val.user_image;
    const password=val.user_password;
   
    return  <div className='usp-user-sect'>
              {sel=== "1" && getListings.length <=0  ?<div style={{padding:"0 8px"}}>
                    <div className='usp-bg-white alg-txt mg-bot'>
                      <h2 className='usp-ct-sect-h'>Your Watchlist</h2>
                      <p className='u-watch clr-green'>You are currently watching {vehC} vehicles</p>
                      </div>
                      <div className='usp-veh-lst usp-bg-white mg-bot-big'>
                        <div className='usp-pad'>
                            <div className='alg-txt  '>
                                  <h4 className='usp-ct-sect-h clr-green'>It looks like there aren't any vehicles in your watch list yet.</h4>
                            </div>
                        </div>  
                        <div className=''>
                          <div className='alg-txt  usp-sect-like'>
                            <div className='usp-pad '>
                            <a className='but-like  '><i class="fa-solid fa-eye mg-lft-small"></i>Watch This Vehicle</a>
                            </div>
                            <div className='clr-graay'>
                                <p className='u-watch '>To add vehicles to your watch list, look out for this button on any vehicle listing page.</p>
                            </div>
                            </div> 
                            <div className='alg-txt usp-pad'>
                              <a className='usp-find-veh' href="">Find some vehicles to watch</a>
                            </div> 
                        </div> 
                      </div>
                </div>:sel=== "1" && getListings.length >0 ? <div style={{backgroundColor:"white"}}>
                <div className='shd-Dealers-header' style={{zIndex:"2"}}>
                             <h3 className='shd-Dealers-header-h '>You Have <span style={{color:"green"}}>{getListings.length} </span>vehicles  in your watchlist</h3>
                             
                         </div>
                  {Results}
                  {getListings.length>10 ?<div>
                    <ReactPaginate
                    previousLabel={"<-"}
                    nextLabel={"->"}
                    pageCount={PageCount}
                    
                    onPageChange={changepage}
                    containerClassName={"pagebuttons"}
                    previousLinkClassName={"previousbutton"}
                    nextLinkClassName={"nextbutton"}
                    activeClassName={"pageactive"}
                    />
                    </div>:""}
                  </div>:""}
                
            {   sel==="2"?<div>
                  <div class="usp-bg-white alg-txt usp-pad mg-bot" style={{textAlign:"start",marginBottom:"16px"}}>
                    <h2 >Manage Devices</h2>
                    <p class="u-watch clr-green">You have previously authenticated {deviceList.length} devices..</p>
                    <p style={{fontSize:"14px"}}>The following devices are known to belong to you. Any device not in the list will require you to log in using Two-Factor Authentication (2FA).</p>
                  </div>
                 {deviceList.length>0 ? deviceList.map((val)=>{
                  const moment = require('moment');
                  const today = moment();
                  const versionCut=val.browser_version.indexOf(".");
                  const fversionCut=val.browser_version.slice(0,versionCut+2);
                  const lastSignIn=val.last_signin.slice(0,10);
                  const created=val.created.slice(0,10);
                  const flastSignIn= moment(lastSignIn, 'YYYY.MM.DD').fromNow();
                  const fcreated=moment(created, 'YYYY.MM.DD').fromNow();
         
                  
                  return <div style={{display:"flex",flexFlow:"row",alignItems:"center",marginBottom:"0px",border:"0.5px solid lightgrey"}} class="usp-bg-white alg-txt usp-pad mg-bot">
                      <div style={{display:"flex",flexFlow:"row",width:"100%",textAlign:"start",alignItems:"center",justifyContent:"space-around"}} >
                            <div style={{display:"flex",flexFlow:"column",width:"50%"}} >
                            <div style={{display:"flex",flexFlow:"row",alignItems:"center"}}><h5 style={{margin:"0"}}>{val.browser_info} {fversionCut}</h5> <span style={{fontSize:"15px",fontWeight:"600"}} class="u-watch clr-green">&nbsp;{val.browser_info===browser_info && val.browser_version===browser_version && val.operating_system===operating_system && val.platform_info===platform_info ? "  CURRENT":""}</span></div>
                                  <p style={{fontSize:"13px",margin:"0"}}>{val.operating_system} </p>
                            </div>
                            <div style={{display:"flex",flexFlow:"row",width:"40%",justifyContent:"end"}}>
                                  <div style={{display:"flex",flexFlow:"column",marginRight:"20px"}}>
                                  <span style={{fontSize:"10px",fontWeight:"500"}}>CREATED</span>
                                  <span style={{fontSize:"12px"}}>{fcreated }</span>
                                  </div>
                                  <div style={{display:"flex",flexFlow:"column"}}>
                                  <span style={{fontSize:"10px",fontWeight:"500"}}>LAST SIGNED IN</span>
                                  <span style={{fontSize:"12px"}}>{flastSignIn}</span>
                                  </div>
                            </div>
                      </div>
                      <div>
                        <button style={{padding:"6px 12px",border:"1px solid transparent",borderRadius:"4px",backgroundColor:"#d63a3a",color:"white"}} onClick={()=>{DeleteDevices_Browser(val._id)}}>Deactivate</button>
                      </div>
                  </div>}):""}
                  </div>
                  :""
                }  
                {sel=== "3" ?<div style={{padding:"0 8px"}}>
                    <div className='usp-bg-white alg-txt usp-pad mg-bot'>
                      <h2 className='usp-ct-sect-h'>Edit Your Profile</h2>
                      <p className='u-watch clr-green'>Update your name, email and password & other information.</p>
                      </div>
                             <div className='usp-bg-white  usp-pad mg-bot'>
                             <div style={{display:"flex",flexFlow:"row"}} ><h5 >Vehicle Delievery</h5>
                             <p style={{marginLeft:"10px",padding:"4px 0 0 0"}} className='u-watch clr-green'>( In case you want to sell your car & deliever to customer address. )</p>
                             </div>
                             <div className='ad-ls-veh-md'>
                            <div className='ad-ls-veh-dt-chk-fts1 ad-ls-ff-r'>
                            <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" defaultChecked={B_f_M ==='yes'?true:false} role="switch" id="buyfromHome" onChange={(e)=>{Update_Buy_From_Home(e.target.checked)}}/>
                          <label class="form-check-label " for="buyfromHome">Deliever to Customer</label>
                           </div>
                            <label htmlFor="buy_from_home" className='ad-ls-mg-bt-lb'></label>
                            </div>
                            </div>
                            
                            </div>
                            
                      <div className='usp-edit-main'>
                          <div className='usp-edit-profile usp-bg-white'>
                             <div className='usp-pad'>
                              <label className='lab-profile-main'>Edit Your Profile</label>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Name</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_name} onChange={(e)=>setuserName(e.target.value)}/>
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Email</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_email} onChange={(e)=>setemail(e.target.value)}/>
                              </div>
                              <div className='usp-prof-fields'>
                              <label htmlFor="">Province</label>
                              <div className='d-cat-name-inp'>
                                <select className={user_province==""? "d-select-inp usp-inp-fields":"d-select-inp2 usp-inp-fields"} name="provinces" id="" onChange={(e)=>ChooseProvince(e.target.value)} >
                                <option className='color123' value="" disabled selected>Choose Province</option>
                                                    
                                    <option className='color321' selected={user_province==="Alberta" ?true:false} value="Alberta">Alberta</option>
                                    <option className='color321' selected={user_province==="British Columbia" ?true:false} value="British Columbia" >British Columbia</option>
                                    <option className='color321' selected={user_province==="Manitoba" ?true:false} value="Manitoba">Manitoba</option>
                                    <option className='color321' selected={user_province==="Newfoundland and Labrador" ?true:false} value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option className='color321' selected={user_province==="New Brunswick" ?true:false} value="NB">New Brunswick</option>
                                    <option className='color321' selected={user_province==="Northwest Territories" ?true:false} value="Northwest Territories">Northwest Territories</option>
                                    <option className='color321' selected={user_province==="Nova Scotia" ?true:false} value="Nova Scotia">Nova Scotia</option>
                                    <option className='color321' selected={user_province==="Nunavut" ?true:false} value="Nunavut">Nunavut</option>
                                    <option className='color321' selected={user_province==="Ontario" ?true:false} value="Ontario">Ontario</option>
                                    <option className='color321' selected={user_province==="Prince Edward Island" ?true:false} value="Prince Edward Island">Prince Edward Island</option>
                                    <option className='color321' selected={user_province==="Quebec" ?true:false} value="Quebec">Quebec</option>
                                    <option className='color321' selected={user_province==="Saskatchewan" ?true:false} value="Saskatchewan">Saskatchewan</option>
                                    <option className='color321' selected={user_province==="Yukon" ?true:false} value="Yukon">Yukon</option>

                                </select>
                               </div>
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">City Name</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_cityname} onChange={(e)=>setcityName(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Suite No/Unit No</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_lotno} onChange={(e)=>setlotNo(e.target.value)}  />
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Street Name</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_streetname} onChange={(e)=>setstreetNo(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Postal Code</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_postalcode} onChange={(e)=>setpostalCode(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Contact No</label>
                                <input type="text" className='usp-inp-fields' defaultValue={user_contactno} onChange={(e)=>setcontactNo(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Alternate Contact No</label>
                                <input type="text" className='usp-inp-fields' defaultValue={alternate_contact} onChange={(e)=>setaltcontactNo(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields' style={{justifyContent:"space-between",alignItems:"center",flexFlow:"row"}}>
                                <div >
                                <label htmlFor="image_change" className='user-img-change'>Change Image</label>
                                <input type="file" name="" id="image_change" style={{display:"none"}} onChange={(e)=>{setimage(e.target.files[0])}}/>
                                </div>
                                  <div className='usp-prof-fields'>
                                    
                                    <img src= {image?URL.createObjectURL(image):require('../images/dealer-images/'+val.user_image+'')} alt=""  style={{width:"110px",height:"80px",marginRight:"25px"}}/>
                                  </div>
                                  
                              </div>
                              <div className='usp-prof-fields'>
                                <button className='profile-setting-bt' onClick={()=>{changeProfile()}}>Update Profile</button>
                              </div>
                             </div>
                          </div>
                          <div className='usp-upd-pass usp-bg-white'>
                          <div className='usp-pad'>
                              <label className='lab-profile-main'>Change Your Password</label>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">Current Password</label>
                                <input type="password" className='usp-inp-fields' onBlur={(e)=>checkfocusOut(e)} onChange={(e)=>setpassword(e.target.value)}/>
                              </div>
                              <div className='usp-prof-fields'>
                                <label htmlFor="">New Password</label>
                                <input type="password" className='usp-inp-fields'  onChange={(e)=>setnewpassword(e.target.value)} />
                              </div>
                              <div className='usp-prof-fields'>
                                <button className='profile-setting-bt' onClick={()=>{changePass()}}>Submit</button>
                              </div>
                             </div>
                          </div>
                      </div>
                </div>:""}

                {
                  sel=== "5" && myListings.length >0 ? <div  style={{backgroundColor:"white"}}>
                  <div className='shd-Dealers-header' style={{zIndex:"2"}}>
                               <h3 className='shd-Dealers-header-h '>You Have Added <span style={{color:"green"}}>{myListings.length} </span>vehicles in Listings</h3>
                               
                           </div>
                    {MyListingsResults}
                    {myListings.length>10 ?<div>
                      <ReactPaginate
                      previousLabel={"<-"}
                      nextLabel={"->"}
                      pageCount={PageCount1}
                      
                      onPageChange={changepage1}
                      containerClassName={"pagebuttons"}
                      previousLinkClassName={"previousbutton"}
                      nextLinkClassName={"nextbutton"}
                      activeClassName={"pageactive"}
                      />
                      </div>:""}
                    </div>:sel=== "5" && myListings.length <=0 ?<div style={{padding:"0 8px"}}>
                    <div className='usp-bg-white alg-txt mg-bot'>
                      <h2 className='usp-ct-sect-h'>Your Listings</h2>
                      <p className='u-watch clr-green'>You have added {myListings.length} vehicles for sale</p>
                      </div>
                      <div className='usp-veh-lst usp-bg-white mg-bot-big'>
                        <div className='usp-pad'>
                            <div className='alg-txt  '>
                                  <h4 className='usp-ct-sect-h clr-green'>It looks like there aren't any vehicles for sale as listings yet.</h4>
                            </div>
                        </div>  
                        <div className=''>
                          <div className='alg-txt  usp-sect-like'>
                            {/*<div className='usp-pad '>
                            <a className='but-like  '><i class="fa-solid fa-eye mg-lft-small"></i>Watch This Vehicle</a>
                              </div>*/}
                            <div className='clr-graay'>
                                <p className='u-watch '>To add vehicles to sale as Listing, go to Sell Car page on your navigation.</p>
                            </div>
                            </div> 
                            <div className='alg-txt usp-pad'>
                              <Link to="/addlisting" className='usp-find-veh' href="">Add some vehicles to listings</Link>
                            </div> 
                        </div> 
                      </div>
                </div>:""
                    }
            </div>})}
        </div>
      </div>
      {
        showModal?<div class="my-modal  fade-bg"  tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you really wanto Delete This Listing</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setshowModal(false)}}></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  onClick={()=>{setshowModal(false)}}>Cancel</button>
              <button type="button" class="btn btn-primary" onClick={()=>{DeleteListing(listingDeleteId)}}>Delete Listing</button>
            </div>
          </div>
        </div>
      </div>:""
      }
    </div>
  <Footer/>
    </>
  )
}

