import React ,{useEffect,useRef, useState} from 'react'
import AppHeader from './AppHeader';
import Footer from './FooterMain';
import  '../Mystyles/searchresults.css';
import { GiCheckMark } from "react-icons/gi";
import {BsCheck} from "react-icons/bs"
import {RiHome2Line} from 'react-icons/ri';
import * as IoIos from 'react-icons/io';
import {HiSortDescending,HiOutlineDotsVertical} from 'react-icons/hi';
import {BiCurrentLocation} from 'react-icons/bi';
import {BiRadioCircle}from 'react-icons/bi';
import Axios from 'axios';
import {BsTelephoneFill} from 'react-icons/bs';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {IoHomeOutline,IoSyncCircleSharp} from 'react-icons/io5';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {FaTruck} from 'react-icons/fa';
import '../Mystyles/findealer.css'
import { Link,useLocation,useNavigate, useParams } from 'react-router-dom';
import {BsSquare} from "react-icons/bs"
import ReactPaginate from 'react-paginate';
import Soldoutpic from '../images/soldout.png'

import { ref, uploadBytes ,getStorage ,getDownloadURL } from 'firebase/storage';




export default function SearchResults() {

  const provincesList =[
    {province_name:"Alberta"},
    {province_name:"British Columbia"},
    {province_name:"Manitoba"},
    {province_name:"Newfoundland and Labrador"},
    {province_name:"New Brunswick"},
    {province_name:"Northwest Territories"},
    {province_name:"Nova Scotia"},
    {province_name:"Nunavut"},
    {province_name:"Ontario"},
    {province_name:"Prince Edward Island"},
    {province_name:"Quebect"},
    {province_name:"Saskatchewan"},
    {province_name:"Yukon"},

  ];
  const BodyStyles=[{Body_Style:"Convertible"},{Body_Style:"Sedan"},{Body_Style:"Wheelchair Accessible"},{Body_Style:"Coupe"},{Body_Style:"SUV / Crossover"},{Body_Style:"Motorcycle"},{Body_Style:"Pickup Truck"},{Body_Style:"Commercial"},{Body_Style:"Minivan / Van"},{Body_Style:"Wagon"}];

  const [sel, setSel]= useState("Automatic");
  const [sel1, setSel1]= useState("any");

  const [vehicleprice,setvehicleprice] = useState([]);
  const [vehicleyears,setvehicleyears] = useState([]);
  const [minyears,setminyears] = useState('');
  const [maxyears,setmaxyears] = useState('');
  const [minprice,setminprice] = useState('');
  const [maxprice,setmaxprice] = useState('');
  const [minmileage,setminmileage] = useState('');
  const [maxmileage,setmaxmileage] = useState('');
  const [drivetrain,setdrivetrain] = useState('');
  const [buyfromHome,setbuyfromHome] = useState(false);
  const [show,setshow] = useState(true);
  const [show1,setshow1] = useState(true);
  const [show2,setshow2] = useState(true);
  const [show3,setshow3] = useState(true);
  const [show4,setshow4] = useState(true);
  const [show5,setshow5] = useState(true);
  const [show6,setshow6] = useState(true);
  const [showmake,setshowmake] = useState(false);
  const [showmodel,setshowmodel] = useState(false);
  const [listStyle,setlistStyle] = useState(false);
  const [listVal,setlistVal] = useState("");
  const [listStyle1,setlistStyle1] = useState(false);
  const [listVal1,setlistVal1] = useState("");
  const [fetchMakes, setfetchMakes] = useState([]);
  const [fetchModels, setfetchModels] = useState([]);
  const [fetchModels1, setfetchModels1] = useState([]);
  const [fetchModels2, setfetchModels2] = useState([]);
  const [fetchMakes1, setfetchMakes1] = useState([]);
  const [fetchLocations, setfetchLocations] = useState([]);
  const [provname, setprovname] = useState(provincesList);
  const [cityname, setCityname] = useState([]);
  const [provincename, setProvincename] = useState([]);
  const [radioGear,setradioGear] = useState("Automatic");
  const [AllMakes, setAllMakes] = useState([]);
  const [togg,settogg] = useState(false);
  const [toggle1,settoggle1] = useState(false);
  const [fetchListings, setfetchListings] = useState([]);
  const [fetchImages, setfetchImages] = useState([]);
  const [pushImages, setpushImages] = useState([]);
  const [sellerID,setsellerID] = useState("");
  const [bodyStyle,setbodyStyle] = useState('');
  const [currentLocation,setcurrentLocation] = useState("");
  const params= useParams();
  const {vehicleClass,makeName,city,type}=useParams();
  const [showModal , setshowModal]= useState(false);
  const [listingDeleteId , setlistingDeleteId]= useState('');
  const [MylistingOptions , setMylistingOptions]= useState(false);
  const [MylistingOptionsIndex , setMylistingOptionsIndex]= useState("");
  const [imageUploa,setImagUpload] = useState(null);


  console.log(JSON.stringify(params));
  let ab,bc="";
  var arr1=[];
  const Navigate=useNavigate(); 
  const MyLocation=useLocation();
  const MyState=MyLocation.state;
  console.log("MyState"+JSON.stringify(MyState));
  const ref11 = useRef();
  var Item;
  const [usertype,setusertype]=useState("");

  useEffect(()=>
  {

    
  Item = JSON.parse(localStorage.getItem('dataItems'));
     if(Item != null)
    {
  Axios.get("https://carpages-canada-mongodb.onrender.com/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
    
     console.log(res.data.auth);
      if(res.data.auth=== true)
      {
        console.log("working"+ JSON.stringify(res));
        setusertype(Item["usertype"]);
      }
     });

    }

    displayListings();
    
    if(!vehicleClass && !makeName && !city && !MyState )
    {
      
        Axios.get("https://carpages-canada-mongodb.onrender.com/listings/get_allListings").then((res)=>{
        console.log(res.data.All_Listings);
        setfetchListings(res.data);
        });
     }
     else if(MyState)
     {
      console.log(MyState.showresult+"image.png"+MyState);
          if(MyState.showresult)
          {
            console.log("User Location"+JSON.parse(localStorage.getItem('User_Choice_Location')));
            var keywordLocation = JSON.parse(localStorage.getItem('User_Choice_Location'));

           Axios.post("https://carpages-canada-mongodb.onrender.com/listings/search_bar",{keyword:MyState.showresult,location:keywordLocation?keywordLocation["SearchBarLocation"]:""}).then((res)=>{
              console.log(res.data);
              setfetchListings(res.data);
              });
          }
     }
     
                  
            Axios.get("https://carpages-canada-mongodb.onrender.com/categories/getprices").then((res2)=>{
            //  console.log(res2.data);
              setvehicleprice(res2.data);
            });
            Axios.get("https://carpages-canada-mongodb.onrender.com/categories/years").then((res3)=>{
         //     console.log(res3.data);
              setvehicleyears(res3.data);
            });
            Axios.get("https://carpages-canada-mongodb.onrender.com/categories/onlycities").then((res1)=>{
            //  console.log(res1.data);
              setfetchLocations(res1.data);
            });
            MakesFetch();
         
  },[]);


  let neWImages = fetchListings;

  


  useEffect(()=>{
    console.log("useeffect");
    if(type)
    { 
      if(type=="private")
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByListingSellertype",{ListingSellertype:"private"}).then((res22)=>{
          console.log(res22.data);
        setfetchListings(res22.data);
         });
      }
      else if(type=="dealer")
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByListingSellertype",{ListingSellertype:"dealer"}).then((res22)=>{
          console.log(res22.data);
        setfetchListings(res22.data);
         });
      }
      else if(type=="sold")
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByListingSellertype",{ListingSellertype:"sold"}).then((res22)=>{
          console.log(res22.data);
        setfetchListings(res22.data);
         });
      }
      
    }
    if(city)
    {
      console.log("IF city");
      console.log("hanji city");
      Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByCityListings",{cityname:city}).then((res11)=>{
        console.log(res11.data);
        setfetchListings(res11.data);
       });
    }
    else if(vehicleClass)
    { console.log("IF vehicleClass");
    console.log("hanji kidan");
      Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByClassListings",{vehicleClass:vehicleClass}).then((res22)=>{
        console.log(res22.data);
      setfetchListings(res22.data);
       });
    }
  
   else if(makeName)
    {console.log("IF makeName");
    console.log("hanji makeName");
      Axios.post("https://carpages-canada-mongodb.onrender.com/listings/FilterByMakeListings",{makename:makeName}).then((res33)=>{
        console.log(res33.data);
        setfetchListings(res33.data);
       });
    }
    else if(MyState && !MyState.showresult)
    {console.log("IF MyState");
    console.log("hanji MyState");
      Axios.post("https://carpages-canada-mongodb.onrender.com/listings/Find_A_Car",MyState).then((res43)=>{
        console.log(res43.data);
        setfetchListings(res43.data);
       });
    }
    
  },[type,vehicleClass,makeName,city,MyState]);
  var Happy=fetchMakes1;
  var Happy1=fetchMakes;
  
  var Myimages =fetchListings;
  var address;
  useEffect(()=>
  {    const checkIfClickedOutside = e => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu
       if (MylistingOptions && MylistingOptionsIndex  && ref11.current && !ref11.current.contains(e.target)) {
          setMylistingOptions(false);
          console.log("menu");
       }
    
   
   
       }
       document.addEventListener("mousedown",checkIfClickedOutside);
      
      return () => {
        // Cleanup the event listener
         document.removeEventListener("mousedown",checkIfClickedOutside);
        }
  
  },[MylistingOptions,MylistingOptionsIndex]);

  const DeleteListing=(e)=>
 {
    console.log("ListingId..."+e);
 }
 const UpdateListing=(e)=>
 {
  var CryptoJS = require("crypto-js");
  
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(e), 'my-secret-key@123').toString();
  Navigate("/update_listing/"+encodeURIComponent(En_listing_id));
 }

 const changeSaleStatus=(ID,status)=>
{
  //alert(JSON.stringify(MyLocation.pathname));
  console.log("ID..."+ID+"status.."+status);
  
  if(status==="unsold")
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/listings/updatetSaleStatus",{ListingId:ID,status:"sold"}).then ((response1) =>{
      console.log(response1.data);
     
   });
  // window.history.replaceState(null, "New Page Title",MyLocation.pathname);
  }
  else if(status==="sold")
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/listings/updatetSaleStatus",{ListingId:ID,status:"unsold"}).then ((response1) =>{
      console.log(response1.data);
     
   });
   
  }
  window.location.reload();
}
useEffect(()=>{
  
      if(listStyle && !fetchMakes1.includes(listVal))
      {
        setfetchMakes1(fetchMakes1=>[...fetchMakes1,listVal]);
      }
      else if(!listStyle && fetchMakes1.includes(listVal))
      {
          const finded=fetchMakes1.indexOf(listVal);
          fetchMakes1.splice(finded,1);
          console.log(listVal+"finded :"+finded);
      }
      if(listStyle1 && !fetchModels1.includes(listVal1))
      {
        setfetchModels1(fetchModels1=>[...fetchModels1,listVal1]);

      }
      else if(!listStyle1 && fetchModels1.includes(listVal1))
      {
          const finded1=fetchModels1.indexOf(listVal1);
          fetchModels1.splice(finded1,1);
       //   console.log(fetchModels1+"finded1 :"+finded1);
      }
        if(fetchMakes1.length>0)
        {
          PushArr(Happy);
        }
          
         displayListings();
        
          CityData();

          
          getImageUrl(neWImages);


},[listStyle,listVal,listStyle1,listVal1,Happy,Myimages,neWImages]);





console.log("fetchImages"+JSON.stringify(fetchImages));
const getImageUrl=async(neWImages)=>
          {
            const storage = getStorage();
           
          
                for(let i=0 ; i < neWImages.length ; i++)
                {
                let  url = await getDownloadURL(ref(storage, "images/listing_images/"+neWImages[i].All_Listings[0].image_name+""));
                console.log("Async func 2..."+url);
                setfetchImages(fetchImages=>[...fetchImages,{url:url,listing_Id:neWImages[i].listing_id}])
                  
              }
                
          }
          console.log("neWImages"+JSON.stringify(neWImages));

const PushArr=(e)=>
{
  if(e.length > 0)
  {
    Axios.post("https://carpages-canada-mongodb.onrender.com/categories/getchoosedmakes",{makesarr:e}).then((res4)=>{
      console.log(res4.data);
      setfetchModels(res4.data); 
    });
  }
  else if(AllMakes.length == fetchMakes.length)
  {
     console.log("AllMakes working");
     Axios.post("https://carpages-canada-mongodb.onrender.com/categories/getchoosedmakes",{makesarr:AllMakes}).then((res4)=>{
      console.log(res4.data);
      setfetchModels(res4.data); 
    });
  }
  else 
  {
    setfetchModels([]); 
  }
  console.log("Fetch ins::"+e);
 
}
const MakesFetch=()=>
{
  Axios.get("https://carpages-canada-mongodb.onrender.com/categories/makes").then((res)=>{
          //   console.log(res.data);
              setfetchMakes(res.data);
            });
}

const onAllMakes=()=>{
  alert(fetchMakes1.length);
  fetchMakes1.length=0;
  settogg(!togg);
  handleAllMakes();
}
const handleSellerId= (e)=>
{
  //setsellerID(e);
  console.log("Results"+e);
  Axios.post("https://carpages-canada-mongodb.onrender.com/users/getDealerDetails",{sellerid:e}).then((res4)=>{
      console.log(res4.data);
    //  setfetchModels(es4.data); 
    });
}
const handleAllMakes=()=>
{
  
  if(!togg){
    fetchMakes1.length=0;
    alert("INSIDE Toggle Check"+togg + "fetch Makes length"+fetchMakes1.length);
    setlistVal("");
    
     fetchMakes.map((Val)=>{
     setAllMakes(AllMakes=>[...AllMakes,Val.makes_name]);
     });
    }
    else if(togg)
      {
      setAllMakes([]);
      }  
}

const [toggModels,settoggModels]=useState("false");
const [allModels,setallModels]=useState([]);
const onAllModels=(e)=>{
  settoggModels(!toggModels);
  
  handleAllModels();
 
}
const handleAllModels=()=>
{
  if(!toggModels){
    setlistVal1("");
    setfetchModels1([]);
     fetchModels.map((Val)=>{
      setallModels(allModels=>[...allModels,Val.model_name]);
     });
    }
    else if(toggModels)
      {
        setallModels([]);
      }  
}
  const onFieldclick=(e)=>
  {
    setshow(e);
  
  }
  const onFieldclick1=(e)=>
  {
    setshow1(e);
       
  }
  const onFieldclick2=(e)=>
  {
    setshow2(e);
       
  }
  const onFieldclick3=(e)=>
  {
    setshow3(e);
      
  }
  const onFieldclick4=(e)=>
  {
    setshow4(e);
  }
  const onFieldclick5=(e)=>
  {
    setshow5(e);
  }
  const onFieldclick6=(e)=>
  {
    setshow6(e);
      
  }

  const selectClass=(e)=>
 {
        if(e === 1)
        {
          setSel("Any");
        // console.log(e+"11"+sel);
        }
        else if(e === 2)
        {
          setSel("Automatic");
        // console.log(e+"11"+sel);
        }
        else if(e === 3)
        {
          setSel("Manual");//console.log(e+"11"+sel);
        }
       
}
console.log("NEW USED"+sel1);
const selectNewUsed=(e)=>
{
  console.log("NEW USED"+e);
       if(e === 11)
       {
         setSel1("new");
      
       }
       else if(e === 12)
       {
         setSel1("used");
       }
       else if(e === 13)
       {
         setSel1("any");
       }
      
}

const [query1, setQuery1] = useState("");
const debouncedQuery1 = useDebouncedValue1(query1, 200);
function useDebouncedValue1(value, wait) {
  const [debouncedValue1, setDebouncedValue1] = useState(value);

  useEffect(() => {
    
    const id = setTimeout(() => setDebouncedValue1(value), wait);
    return () => clearTimeout(id);
  }, [value,query1]);

  return debouncedValue1;
}
const getProvince =(ev)=>{
       
  setQuery1(ev);
  const filtered_province =provname.filter((val)=>{
    return val.province_name.toLowerCase().includes(debouncedQuery1.toLowerCase());
  });
    setProvincename(filtered_province);
}
const getLocation=(e)=>
{
  setQuery1(e);
  const filtered_city = fetchLocations.filter((val1)=>{
    return val1.city_name.toLowerCase().includes(debouncedQuery1.toLowerCase());
  }); 
  if(e==="")
        {
          setCityname([]);
          setProvincename([]);
        }
        else if(filtered_city.length <=0)
        {
          setCityname([]);
          getProvince(e);
        }
        else
        {
          setCityname(filtered_city);
          console.log(JSON.stringify(cityname)+"56565");
        }
}

const setTypedCity=(e)=>
{
  setQuery1(e);
  setCityname([]);
  setProvincename([]);
}

const displayListings = () =>
{
  console.log("Images Names:");
 /* Myimages.map((val,index)=>{
    console.log("Images Names:"+val["images"]+"Index"+index);

  });*/
}






const [lat, setLat] = useState(null);
const [lng, setLng] = useState(null);
const [status, setStatus] = useState(null);
const url="https://api.openweathermap.org/data/2.5/weather?";
const api_key="4d44970004fea6c10f9399a10840b54e";

useEffect(()=>{
  navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
 // navigator.geolocation.getCurrentPosition(success, error, options);
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
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
},[lat,lng])

const CityData=()=>
{
  if(!lat=="" && !lng =="" )
  {
    let  F_api=`${url}lat=${lat}&lon=${lng}&appid=${api_key}`;
    Axios.get(F_api).then((res)=>{
      console.log(res.data);
   // setQuery1(res.data.name);
    });
  }
}





const [seachMake, setsearchMake] = useState("");

const debouncedMake = usedebouncedMake(seachMake, 200);
function usedebouncedMake(value, wait) {
  const [debouncedMakeValue, setdebouncedMakeValue] = useState(value);

  useEffect(() => {
    
    const id = setTimeout(() => setdebouncedMakeValue(value), wait);
    return () => clearTimeout(id);
  }, [value,seachMake]);

  return debouncedMakeValue;
}

const searchMake=(e)=>
{
   setsearchMake(e);
   console.log("filter working");
   const Filtered_Makes=Happy1.filter((val)=>{
    return val.makes_name.toLowerCase().includes(debouncedMake.toLowerCase());
   });
   setfetchMakes(Filtered_Makes);
   if(e ==="")
   {
    console.log("filter reset");
    MakesFetch();
   }
   
}


var Happy2=fetchModels;
const [searchedModel, setsearchedModel] = useState("");
const debouncedModelQuery = useDebouncedModel(searchedModel, 200);
function useDebouncedModel(value, wait) {
  const [debouncedModelValue, setdebouncedModelValue] = useState(value);

  useEffect(() => {
    
    const id = setTimeout(() => setdebouncedModelValue(value), wait);
    return () => clearTimeout(id);
  }, [value,searchedModel]);

  return debouncedModelValue;
}


const searchModel=(e)=>
{
  setsearchedModel(e);
   console.log("Model filter working");
   const Filtered_Model=Happy2.filter((val)=>{
    return val.model_name.toLowerCase().includes(debouncedModelQuery.toLowerCase());
   });
   setfetchModels(Filtered_Model);
   if(e ==="")
   {
    console.log("filter reset");
    PushArr(Happy);
   }
}

    const [pageNumber, setpageNumber] = useState(0);
    const resultsPerPage=15;
    const pagevisited= pageNumber * resultsPerPage;
    const initialRecord=pagevisited + 1;
    const lastlRecord=pagevisited + 1 * 15;
    const PageCount= Math.ceil( fetchListings.length / resultsPerPage );
    const changepage=({selected})=>
    {
        
         setpageNumber(selected);
    }
    const goNavigate = useNavigate();
    
const Results =fetchListings.length > 0 ? fetchListings.slice(pagevisited, pagevisited + resultsPerPage).map((val,index)=>{

  
  const buyFhome=val.Complete[0].buy_from_home;
  const seller_id=val.seller_id;
  const sale_status=val.sale_status;
  var CryptoJS = require("crypto-js");
  var data ="7" ;
  var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();
  console.log(val.Complete.length);
 //if(val.Complete[0].buy_from_home==="no"){

 
  return <div className='shd-delaer-list-sect'>
    
 <Link to={{pathname:"/listing_detail/"+encodeURIComponent(En_listing_id.toString())+"/"+encodeURIComponent(En_seller_id.toString())}}    className='shd-deal-pic' >
      <div style={{position:"relative"}} >
       {val.listing_id === fetchImages.listing_id && (<img src={ fetchImages.url}  style={{width:"150px",height:"105px",objectFit:"contain",borderRadius:"10px",position:"relative",top:"0",left:"0"}} alt="" />)}
{ sale_status==="sold" ?<img src={Soldoutpic} style={{width:"150px",height:"105px",objectFit:"contain",borderRadius:"10px",position:"absolute",top:"0",left:"0"}} alt=""/>:""} 
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
                  <span style={{fontWeight:"700"}}>${new Intl.NumberFormat('en-US').format(val.price)} {status==="sold"?<strong style={{color:"rgb(4, 177, 4)",fontSize:"18px",marginLeft:"10px"}}>SOLD</strong>:""}</span>
                  
            </div>
            <div className='sr-veh-details'>{val.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} KM </div>
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
     {usertype==="admin" || usertype==="employee"? <div  style={{zIndex:"1",width:"100px",display:"flex",flexFlow:"row",position:"relative"}}>
                        <HiOutlineDotsVertical onClick={()=>{setMylistingOptions(true);setMylistingOptionsIndex(+index+1)}} className='img-opt-menu-dots'/>
                        
                          {MylistingOptions && MylistingOptionsIndex ===+index+1?
                          <div ref={ref11} style={{backgroundColor:"#f8f3f3",boxShadow:"3px 3px white"}}  className='img-opt-menu-ul-sect'>
                            <ul style={{width:"max-content",marginBottom:"0"}} className='img-opt-menu-ul'>
                            <li style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{setshowModal(true);setlistingDeleteId(val.listing_id)}}>Delete Listing</li>
                            <li  style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{UpdateListing(val.listing_id)}}>Update Listing</li>
                            {sale_status==="unsold"?<li className='img-opt-menu-litem' onClick={()=>{changeSaleStatus(val.listing_id,sale_status)}}>Sold Vehicle</li>:""}
                            {sale_status==="sold"?<li className='img-opt-menu-litem' onClick={()=>{changeSaleStatus(val.listing_id,sale_status)}}>UnSold Vehicle</li>:""}
                            </ul> 
                          </div>:""}
                        </div>:""}
  </div>
</div>
//}
 }):""

const Apply=()=>
{
 
    const a=minprice.length;
    const b=maxprice.length;
    const aa=minprice.slice(1,a);
    const bb=maxprice.slice(1,b);
   
    if(query1)
    {
      const a=query1.indexOf(",");
     
      if(a>0)
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getFilterListings",{buyfromHome:buyfromHome,cityname:query1,bodyStyle:bodyStyle,allmodels:allModels,allmakes:AllMakes,makename:fetchMakes1,modelname:fetchModels1,minyears:minyears,maxyears:maxyears,minprice:aa,maxprice:bb,minmileage:minmileage,maxmileage:maxmileage,transmission:sel,drivetrain:drivetrain,used_new:sel1}).then((res)=>{
          console.log(res.data);
          setfetchListings(res.data);
          
         });
      }
      else if(a<0)
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getFilterListings",{buyfromHome:buyfromHome,province:query1,bodyStyle:bodyStyle,allmodels:allModels,allmakes:AllMakes,makename:fetchMakes1,modelname:fetchModels1,minyears:minyears,maxyears:maxyears,minprice:aa,maxprice:bb,minmileage:minmileage,maxmileage:maxmileage,transmission:sel,drivetrain:drivetrain,used_new:sel1}).then((res)=>{
          console.log(res.data);
          setfetchListings(res.data);
         });
      }
    }
  //  if(buyfromHome|| query1 || fetchMakes1 || fetchModels1 || minyears || maxyears || aa || bb || minmileage || maxmileage || sel || sel1 ||drivetrain )
    else  
    {
     window.history.replaceState(null, "New Page Title", "/search-results")
     console.log("Working Inside");
     Axios.post("https://carpages-canada-mongodb.onrender.com/listings/getFilterListings",{buyfromHome:buyfromHome,cityname:query1,bodyStyle:bodyStyle,allmodels:allModels,allmakes:AllMakes,makename:fetchMakes1,modelname:fetchModels1,minyears:minyears,maxyears:maxyears,minprice:aa,maxprice:bb,minmileage:minmileage,maxmileage:maxmileage,transmission:sel,drivetrain:drivetrain,used_new:sel1}).then((res)=>{
       console.log(res.data);
       setfetchListings(res.data);
      });
    



  }
 
 
 }
 const [sortFilter,setsortFilter]=useState('');
   useEffect(()=>{},[sortFilter])
   const sortResult=(e)=>
   {
    setsortFilter(e);
   if(fetchListings.length>0)
   {
          if(e ==="price_asc")
          {
            fetchListings.sort((a, b) => a.price - b.price);
            
          }
          else if(e ==="price_desc")
          {
            fetchListings.sort((a, b) => b.price- a.price);
          }
          else if(e ==="year_desc")
          {
            fetchListings.sort((a, b) => b.model_year- a.model_year);
          }
          else if(e ==="year_asc")
          {
            fetchListings.sort((a, b) => a.model_year - b.model_year);
          }
          else if(e ==="mileage_asc")
          {
            fetchListings.sort((a, b) => a.mileage - b.mileage);
          }
          else if(e ==="mileage_desc")
          {
            fetchListings.sort((a, b) => b.mileage- a.mileage);
          }
   }
   }

   const SearchKeyword=(e)=>
   {
      if(e.key==="Enter")
      {
        Axios.post("https://carpages-canada-mongodb.onrender.com/listings/search_bar",{keyword:e.target.value,location:query1}).then((res)=>{
          console.log(res.data);
          setfetchListings(res.data);
          });
      }
   }

   const handleClickAway1 = () => {
    setCityname([]);
    setProvincename([]);
  };


  const imagEupload=()=>
  {

     const imageData = new FormData();
     for(let i=0 ; i < imageUploa.length ; i++)
     {
        imageData.append("fireBase_Images",imageUploa[i]);
     }
    Axios.post("https://carpages-canada-mongodb.onrender.com/listings/firebase_New_Images",imageData).then((res)=>{
    console.log(res);
    })
    
    
 
  }



  return (
      <>
       <AppHeader></AppHeader>
      <div style={{backgroundColor:"lightgray"}}>
    <div className='main-container' >
        <div className='srch-rs-row fd-r srch-rs-row-fd' >
          <div className='search-ftr-main '  >
              <div  style={{fontSize:"14px",fontWeight:"500",paddingLeft:"15px",paddingRight:"15px"}}>
                  <h3 className='align-center'>Filter Results</h3>
                  
                      <hr />
                      <fieldset className='search-fset-d'>
                          <div className='srch-rs-lst'><span>SALE TYPE</span></div>
                             <div style={{display:"flex",marginTop:"5px"}}> 
                             <ul className='  gear-list fd-r'>
                                 <div className='dsp-nwr'>
                                 <li className={sel1==='new' ?'new-used align-center':"gearitem align-item"} value="11" onClick={(e)=>{selectNewUsed(e.target.value)}}>{sel1==='new'?<GiCheckMark className='ico-rad'></GiCheckMark>:<BiRadioCircle className='ico-rad1'></BiRadioCircle>} New</li> 
                                 <li className={sel1==='used' ?'new-used align-item':"gearitem align-item"} value="12" onClick={(e)=>{selectNewUsed(e.target.value)}}>{sel1==='used'?<GiCheckMark className='ico-rad'></GiCheckMark>:<BiRadioCircle className='ico-rad1'></BiRadioCircle>} Used</li>
                                 <li className={sel1==='any' ?'new-used align-item':"gearitem align-item"} value="13" onClick={(e)=>{selectNewUsed(e.target.value)}}>{sel1==='any'?<GiCheckMark className='ico-rad'></GiCheckMark>:<BiRadioCircle className='ico-rad1'></BiRadioCircle>} Any</li>
                                 </div>
                                </ul>
                            </div>
                      </fieldset>
                      <hr />
                      <fieldset>
                        <div className='srch-rs-row srch-rs-lst' id="bfm" onClick={()=>{onFieldclick(!show)}}><span>BUY FROM HOME</span>
                        <span className='new-veh-bt'>NEW</span>
                        <span>{show?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                        </div>
                        {show ?<div className='srch-rs-lst'>
                          <label htmlFor="" className='srch-labl srch-rs-row' >
                            <label onClick={(e)=>setbuyfromHome(!buyfromHome)} className={buyfromHome?"buyfrm-home":""}>Only Show Buy From Home</label>
                            <label className='buy-home-bt' onClick={(e)=>setbuyfromHome(!buyfromHome)}>{buyfromHome?<IoHomeOutline style={{color:"green"}} />:<RiHome2Line ></RiHome2Line>}</label>
                          </label>
                        </div>:""}
                      </fieldset>
                      <hr />
                      <fieldset>
                      <div className='srch-rs-row srch-rs-lst' id="keyword" onClick={()=>{onFieldclick1(!show1)}}><span>KEYWORD SEARCH</span>
                      <span style={{marginLeft:"auto"}}>{show1?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                      {show1 ?<div style={{marginTop:"5px"}}>
                        <input type="text" name="" id="" placeholder='Try "diesel" or "blue sedan"' onKeyDown={(e)=>{SearchKeyword(e)}} className='kwrd-in'/>
                      </div>:""}
                      </fieldset>
                      <hr />
                      <fieldset>
                      <div className='srch-rs-row srch-rs-lst' id="keyword" onClick={()=>{onFieldclick2(!show2)}}><span>LOCATION</span>
                      <span style={{marginLeft:"auto"}}>{show2?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                      {show2? <div>
                          <div className='srch-rs-row align-center srch-rs-lst' style={{marginTop:"5px",justifyContent:"space-between"}}>
                          <ClickAwayListener   onClickAway={handleClickAway1}>  
                          <div className='srch-rs-row srch-rs-lst' style={{position:"relative"}}>
                            <input type="text" name="" id="" placeholder='All Of Canada' value={query1} className='kwrd-in' onChange={(e)=>getLocation(e.target.value)}/>
                            {cityname.length>0 || provincename.length>0 ?<div className='srch-filter-suggestion'>
                                <div className="srch-filter-suggestions" >
                                {cityname.length !="" || cityname ? cityname.slice(0,5).map((val)=>{
                                  return  <div className='srch-filter-suggestions-item' onClick={()=>{setTypedCity(val.city_name)}}>{val.city_name}</div>})
                                  :""                          
                                }
                                {
                                  cityname.length ==="" || provincename ? provincename.map((val1)=>{
                                    return  <div className='srch-filter-suggestions-item' onClick={()=>{setTypedCity(val1.province_name)}}>{val1.province_name}</div>})    
                                :""}
                            </div>
                            </div>:""}
                          </div>
                          </ClickAwayListener  > 
                          <div className='srch-rs-lst'>
                          <button className='loc-bt' onClick={()=>{CityData()}} ><BiCurrentLocation style={{minWidth:"1.1em",minHeight:"1.1em",textAlign:"center"}}></BiCurrentLocation></button>
                          </div>
                          </div>
                          
                            <div className='srch-rs-lst' style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"10px"}} >
                            <span>Within</span>
                            <div  className='sl-km srch-rs-lst'>
                            <select name="" id="" style={{border:"none",padding:"2px 5px",borderRadius:"2px"}}>
                              <option value="">25</option>
                              <option value="">50</option>
                              <option value=""selected="selected">100</option>
                              <option value="">200</option>
                              <option value="">500</option>
                            </select>
                            </div>
                            <span>KM</span>
                            </div>
                        </div>:""}
                      </fieldset>
                      <hr />
                      <fieldset>
                      <div className='srch-rs-row srch-rs-lst' onClick={()=>{onFieldclick3(!show3)}}>
                      <label htmlFor="">BODYSTYLE</label>
                      <span style={{marginLeft:"auto"}}>{show3?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                      {show3?<div className='srch-rs-row srch-rs-lst' style={{marginTop:"10px"}}>
                        <select name="" id="" className='sel-cat-half'onChange={(e)=>{setbodyStyle(e.target.value)}} >
                                <option value="" selected="selected">Choose Bodystyle</option>
                                {
                        BodyStyles.map((val)=>{
                          return <option value={val.Body_Style}>{val.Body_Style}</option>
                                               
                        })
                      }
                         </select>
                      </div>:""}
                      </fieldset>
                      <hr />
                      <fieldset>
                      <div className='srch-rs-row srch-rs-lst' onClick={()=>{onFieldclick4(!show4)}}>
                      <label htmlFor="">MAKE & MODEL</label>
                      <span style={{marginLeft:"auto"}}>{show4?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                      {show4 ?<div>
                          <div className='srch-rs-row srch-rs-lst fd-c' style={{marginTop:"10px"}}>
                           
                            <button className='make-bt1' onClick={()=>{setshowmake(!showmake)}}>{fetchMakes1.length === 0?"All Makes":fetchMakes1.length>0  && fetchMakes1.length<3?fetchMakes1.join():fetchMakes1.length+" of "+fetchMakes.length+" selected"}</button>
                            {showmake? <div><div className='mklst-sect'>
                              <div style={{margin:"8px 0",padding:"0 8px"}}>
                            <input type="text" autoFocus name="allmakes" id=""  className='kwrd-in' onChange={(e)=>{searchMake(e.target.value)}} /></div>
                              <ul className='srch-reslt-mk-md'>
                            <li className={AllMakes.length > 0 ?'liit lab-lnk':'liit'} ><input type="checkbox" name="make12" className='example'  id="All Makes"  
                                            onChange={()=>{onAllMakes()}}
                                            />
                                          {AllMakes.length > 0 ?<BsCheck className='ico-6 ' ></BsCheck>:""}
                                          <label   className={AllMakes.length > 0  ?'make_label1':'make_label'}  htmlFor="All Makes" >All Makes
                                          </label></li>
                                          <li className='li-pop-grp' ><label className='lab-pop-grp' >Popular Makes</label></li>
                            { fetchMakes.map((val)=>{
                                       
                                        return <li className={fetchMakes1.includes(val.makes_name) || AllMakes.length > 0 ?'liit lab-lnk':"liit"}  >
                                          <input type="checkbox" name="make12" className='example'   id={val.makes_name}  
                                            
                                            onChange={(e)=>{setlistVal(e.target.id);setlistStyle(e.target.checked);settoggle1(!toggle1)}} />
                                          {AllMakes.length > 0 ?<BsCheck className='ico-6 ' ></BsCheck>:fetchMakes1.includes(val.makes_name) ?<BsCheck className='ico-7 ' ></BsCheck>:""}
                                          <label  className={AllMakes.length > 0 || fetchMakes1.includes(val.makes_name) ?'make_label1':'make_label'}  htmlFor={val.makes_name} >{val.makes_name}
                                          </label>
                                            </li>
                                      })
                                    }
                            </ul>
                            </div><button className='bt-close' onClick={()=>{setshowmake(!showmake)}} ><span>CLOSE</span></button></div>:""}</div>
                          <div className='srch-rs-row srch-rs-lst fd-c' style={{marginTop:"10px"}}>
                          <button className='make-bt1'  onClick={()=>{setshowmodel(!showmodel)}}>All Models</button>
                          
                         { showmodel ?<div><div>
                          <div style={{margin:"8px 0",padding:"0 8px"}}>
                            <input type="text" autoFocus name="allmodels" id=""  className='kwrd-in' onChange={(e)=>{searchModel(e.target.value)}} /></div>
                         {fetchModels.length > 0 ? <div className='mklst-sect'><ul className='srch-reslt-mk-md'>
                         <li className={allModels.length > 0 ?'liit lab-lnk':'liit'} ><input type="checkbox" name="make123" className='example'  id="All Models"  
                                            onChange={()=>{onAllModels()}}/>
                                          {allModels.length > 0 ?<BsCheck className='ico-6 ' ></BsCheck>:""}
                                          <label   className={allModels.length > 0  ?'make_label1':'make_label'}  htmlFor="All Models" >All Models
                                          </label></li>
                                { fetchModels.map((val)=>{
                                        return <li className={fetchModels1.includes(val.model_name) || allModels.length  ?'liit lab-lnk':"liit"}>
                                          <input type="checkbox" name="make123" className='example'    id={val.model_name}  
                                            onChange={(e)=>{setlistVal1(e.target.id);setlistStyle1(e.target.checked);settoggModels(!toggModels)}} />
                                         {allModels.length > 0 ?<BsCheck className='ico-6 ' ></BsCheck>:fetchModels1.includes(val.model_name) ? <BsCheck className='ico-7'   ></BsCheck>:""}
                                          <label  className={allModels.length > 0 || fetchModels1.includes(val.model_name) ?'make_label1':'make_label'}  htmlFor={val.model_name} >{val.model_name}
                                          </label>
                                            </li>
                                      })
                                     
                                    } 
                            </ul></div>:""}</div><button className='bt-close' onClick={()=>{setshowmodel(!showmodel)}} ><span>CLOSE</span></button></div>:""}
                          </div>
                      </div>:""}
                      </fieldset>
                      <hr />
                      <fieldset>
                      <div className='srch-rs-row srch-rs-lst' onClick={()=>{onFieldclick5(!show5)}}>
                      <label htmlFor="">DETAILS</label>
                      <span style={{marginLeft:"auto"}}>{show5?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                     {show5? <div className='srch-rs-lst'>
                      <div className='srch-rs-lst mg-tp'>
                      <span>YEAR</span>
                            <div className='srch-rs-row fd-r align-center srch-rs-lst'>
                              
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half' onChange={(e)=>setminyears(e.target.value)}>
                              <option value="" selected="selected"  >MIN</option>
                              {
                                vehicleyears.map((val)=>{
                                  return <option value={val.years} >{val.years}</option>
                                })
                              }
                              </select>
                              </div>
                             
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half mg-left' onChange={(e)=>setmaxyears(e.target.value)}>
                              <option value="" selected="selected" >MAX</option>
                              {
                                vehicleyears.map((val)=>{
                                  return <option value={val.years} >{val.years}</option>
                                })
                              }
                              </select>
                              </div>
                            </div>
                        </div>
                        <div className='srch-rs-lst mg-tp'>
                        <span>PRICE</span>
                        <div className='srch-rs-row fd-r align-center srch-rs-lst'>
                              
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half' onChange={(e)=>setminprice(e.target.value)}>
                              <option value="" selected="selected"  >MIN</option>
                              {
                                vehicleprice.map((val)=>{
                                  return <option value={val.prices} >{val.prices}</option>
                                })
                              }
                              </select>
                              </div>
                             
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half mg-left' onChange={(e)=>setmaxprice(e.target.value)}>
                              <option value="" selected="selected" >MAX</option>
                              {
                                vehicleprice.map((val)=>{
                                  return <option value={val.prices} >{val.prices}</option>
                                })
                              }
                              </select>
                              </div>
                            </div>
                        </div>
                        <div className='srch-rs-lst mg-tp'>
                        <span>MILEAGE</span>
                        <div className='srch-rs-row fd-r align-center srch-rs-lst'>
                              
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half' onChange={(e)=>setminmileage(e.target.value)}>
                              <option value="" selected="selected"  >MIN</option>
                                        <option value="10000">10,000</option>
                                        <option value="20000">20,000</option>
                                        <option value="30000">30,000</option>
                                        <option value="40000">40,000</option>
                                        <option value="50000">50,000</option>
                                        <option value="60000">60,000</option>
                                        <option value="70000">70,000</option>
                                        <option value="80000">80,000</option>
                                        <option value="90000">90,000</option>
                                        <option value="100000">100,000</option>
                                        <option value="110000">110,000</option>
                                        <option value="120000">120,000</option>
                                        <option value="130000">130,000</option>
                                        <option value="140000">140,000</option>
                                        <option value="150000">150,000</option>
                                        <option value="160000">160,000</option>
                                        <option value="170000">170,000</option>
                                        <option value="180000">180,000</option>
                                        <option value="190000">190,000</option>
                                        <option value="200000">200,000</option>
                                        <option value="210000">210,000</option>
                                        <option value="220000">220,000</option>
                                        <option value="230000">230,000</option>
                                        <option value="240000">240,000</option>
                                        <option value="250000">250,000</option>
                                        <option value="260000">260,000</option>
                                        <option value="270000">270,000</option>
                                        <option value="280000">280,000</option>
                                        <option value="290000">290,000</option>
                                        <option value="300000">300,000</option>
                                        <option value="310000">310,000</option>
                                        <option value="320000">320,000</option>
                                        <option value="330000">330,000</option>
                                        <option value="340000">340,000</option>
                                        <option value="350000">350,000</option>
                              </select>
                              </div>
                             
                              <div className='srch-rs-row srch-rs-lst' >
                              <select name="" id="" className='sel-cat-half mg-left'  onChange={(e)=>setmaxmileage(e.target.value)}>
                              <option value="" selected="selected" >MAX</option>
                              <option value="10000">10,000</option>
                                        <option value="20000">20,000</option>
                                        <option value="30000">30,000</option>
                                        <option value="40000">40,000</option>
                                        <option value="50000">50,000</option>
                                        <option value="60000">60,000</option>
                                        <option value="70000">70,000</option>
                                        <option value="80000">80,000</option>
                                        <option value="90000">90,000</option>
                                        <option value="100000">100,000</option>
                                        <option value="110000">110,000</option>
                                        <option value="120000">120,000</option>
                                        <option value="130000">130,000</option>
                                        <option value="140000">140,000</option>
                                        <option value="150000">150,000</option>
                                        <option value="160000">160,000</option>
                                        <option value="170000">170,000</option>
                                        <option value="180000">180,000</option>
                                        <option value="190000">190,000</option>
                                        <option value="200000">200,000</option>
                                        <option value="210000">210,000</option>
                                        <option value="220000">220,000</option>
                                        <option value="230000">230,000</option>
                                        <option value="240000">240,000</option>
                                        <option value="250000">250,000</option>
                                        <option value="260000">260,000</option>
                                        <option value="270000">270,000</option>
                                        <option value="280000">280,000</option>
                                        <option value="290000">290,000</option>
                                        <option value="300000">300,000</option>
                                        <option value="310000">310,000</option>
                                        <option value="320000">320,000</option>
                                        <option value="330000">330,000</option>
                                        <option value="340000">340,000</option>
                                        <option value="350000">350,000</option>
                              </select>
                              </div>
                            </div>
                        </div>
                        </div>:"" } 
                      </fieldset>
                      <hr />
                       <fieldset>
                       <div className='srch-rs-row srch-rs-lst mg-tp' onClick={()=>{onFieldclick6(!show6)}}>
                      <label htmlFor="">ENGINE & DRIVES</label>
                      <span style={{marginLeft:"auto"}}>{show6?<IoIos.IoIosArrowDown></IoIos.IoIosArrowDown>:<IoIos.IoIosArrowForward></IoIos.IoIosArrowForward>}</span>
                      </div>
                           {show6?<div className='srch-rs-lst'>
                           
                           <div className='dsp-wr align-item mg-tp srch-rs-lst '>
                            
                           <div className='dsp-wr align-item' style={{width:"100%"}}>
                                <ul className='  gear-list fd-r'>
                                 <div className='dsp-nwr'>
                                 <li className={sel==='Any' ?'gearitem1 align-item':"gearitem align-item"} value="1" onClick={(e)=>{selectClass(e.target.value)}}>{sel==='Any'?<BsCheck className='ico-rad'></BsCheck>:<BiRadioCircle></BiRadioCircle>}Any</li> 
                                 <li className={sel==='Automatic' ?'gearitem1 align-item':"gearitem align-item"} value="2" onClick={(e)=>{selectClass(e.target.value)}}>{sel==='Automatic'?<BsCheck className='ico-rad'></BsCheck>:<BiRadioCircle></BiRadioCircle>}Automatic</li>
                                 <li className={sel==='Manual' ?'gearitem1 align-item':"gearitem align-item"} value="3" onClick={(e)=>{selectClass(e.target.value)}}>{sel==='Manual'?<BsCheck className='ico-rad'></BsCheck>:<BiRadioCircle></BiRadioCircle>}Manual</li>
                                 </div>
                                </ul>
                                </div>
                      
                              </div>
                              <div className='dsp-wr align-item mg-tp srch-rs-lst'>
                              <label htmlFor="">Drivetrain </label>
                              <div className='srch-rs-row srch-rs-lst mg-left' >
                              <select name="" id="" className='sel-cat-half' onChange={(e)=>setdrivetrain(e.target.value)}>
                              <option value="" selected="selected" disabled  >Any</option>
                              <option value="Front Wheel Drive"   >Front Wheel Drive</option>
                              <option value="All Wheel Drive"   >All Wheel Drive</option>
                              <option value="Rear Wheel Drive"   >Rear Wheel Drive</option>
                              <option value="Four Wheel Drive"   >Four Wheel Drive</option>
                              </select>
                              </div>
                              </div>
                              </div>:"" }
                       </fieldset>
                      <hr />
                      <fieldset>
                       <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                          <label class="form-check-label srch-rs-lst" for="flexSwitchCheckDefault">Only show vehicles with prices</label>
                       </div>
                       <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                          <label class="form-check-label srch-rs-lst" for="flexSwitchCheckDefault">Only show cars with photos</label>
                       </div>
                       <div class="form-check form-switch">
                        <input type="file" multiple name="" id=""  class="form-check-input" onChange={(e)=>{setImagUpload(e.target.files)}}/>
                          <label class="form-check-label srch-rs-lst" for="flexSwitchCheckDefault">Upload photos here</label>
                       </div>
                      </fieldset>
                      <hr />
                      
                      <div className='dsp-wr align-item mg-tp srch-rs-lst mg-btm'>
                                <div className='srch-rs-row fd-r align-center ' >
                                <button type="submit" className='apply-btn bg-clr-rst' onClick={()=>{imagEupload()}} >Reset</button>
                                <button type="submit" className='apply-btn bg-clr-apply' onClick={()=>Apply()}>APPLY</button>
                                  </div>
                                </div>
                      
                 
              </div>
          </div>
          <div className='shd-Dealers'>
                <div className='shd-Dealers-sect'>
                    <div className='shd-Dealers-sect-sub'>
                         <div className='shd-Dealers-header' style={{zIndex:"2"}}>
                             <h3 className='shd-Dealers-header-h '>New & Used Car <span style={{color:"green"}}>for Sale</span> {query1 != "" ? "in "+query1:""}</h3>
                             <div className='shd-Dealers-header-sect shd-mg-bott'>
                                <span>Showing {initialRecord <=fetchListings.length ?initialRecord:""}- {lastlRecord <=fetchListings.length ?lastlRecord:fetchListings.length} of {fetchListings.length}</span>
                                <select name="" id="" className='shd-filter-list' onChange={(e)=>{sortResult(e.target.value)}}>
                                  <option value="default">Sort By</option>
                                  <option value="price_asc">Price: Lowest</option>
                                  <option value="price_desc">Price: Highest</option>
                                  <option value="year_desc">Year: Newest</option>
                                  <option value="year_asc">Year: Oldest</option>
                                  <option value="mileage_asc">Odometer: Lowest</option>
                                  <option value="mileage_desc">Odometer: Highest</option>
                                </select>
                            </div>
                         </div>
                    

                        {Results}
                        {fetchListings.length>15 ?<div>
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
                    </div>
                   </div>  
                </div>   
        </div>
    </div>{
        showModal?<div class="my-modal  fade-bg"  tabindex="-1">
        <div class="modal-dialog" style={{maxWidth:"420px"}}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you really wanto Delete This Listing</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setshowModal(false)}}></button>
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
    <Footer></Footer>
    </>
  )
}
