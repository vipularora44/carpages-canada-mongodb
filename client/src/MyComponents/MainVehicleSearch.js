import React, { useEffect,useRef, useState } from 'react'
import  '../Mystyles/mainvehiclesearch.css';
import {ImTarget} from "react-icons/im";
import  cplifestyle from  '../images/cp-lifestyle-2x.jpg';
import  convertible from  '../images/cat-icons/convertible-v2.svg';
import  coupe from  '../images/cat-icons/coupe-v2.svg';
import  hatch from  '../images/cat-icons/hatchback-v2.svg';
import  hybrid from  '../images/cat-icons/hybrid-electric-v2.svg';
import  minivan from  '../images/cat-icons/minivan-v2.svg';
import  pickup from  '../images/cat-icons/pickup-v2.svg';
import  sedan from  '../images/cat-icons/sedan-v2.svg';
import  suv from  '../images/cat-icons/suv-v2.svg';
import  wagon from  '../images/cat-icons/wagon-v2.svg';
import devices from '../images/devices.png';
import gplay from '../images/google-play.png';
import ios from '../images/ios.png';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'


export default function MainVehicleSearch() {

  
  const [makes, setmakes] = useState([]);
  const [models, setmodels] = useState([]);
  const [price, setprice] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredcities, setFilteredCities] = useState([]);
  const [showedcities, setshowedCities] = useState([]);
  const [provinces,setprovinces] = useState([]);
  const ref = useRef();
  const ref1 = useRef();
  let searchedcity,firstcity="";
  let placeholder=false;
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDivOpen, setIsDivOpen] = useState(false)
  const NavigateTo=useNavigate();
  const provincesList =[
    {city_name:"Alberta"},
    {city_name:"British Columbia"},
    {city_name:"Manitoba"},
    {city_name:"Newfoundland and Labrador"},
    {city_name:"New Brunswick"},
    {city_name:"Northwest Territories"},
    {city_name:"Nova Scotia"},
    {city_name:"Nunavut"},
    {city_name:"Ontario"},
    {city_name:"Prince Edward Island"},
    {city_name:"Quebect"},
    {city_name:"Saskatchewan"},
    {city_name:"Yukon"},

  ];
  useEffect(() => {
   
    const SearchBarLocation={SearchBarLocation:query};
    localStorage.setItem("User_Choice_Location",JSON.stringify(SearchBarLocation));
    
    Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/getprices").then((res)=>{
      setprice(res.data);
      console.log(res.data);
      })
      Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/makes").then((res1)=>{
        setmakes(res1.data);
        console.log(res1.data);
      })
        Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/popularcities").then((res2)=>{
          setshowedCities(res2.data);
          console.log(res2.data);
     })
      showcities();
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen  && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        console.log("menu");
         }
         else if(isDivOpen && ref.current && !ref.current.contains(e.target))
         {
          setIsDivOpen(false);
          console.log("div");
         }
     
         }
    document.addEventListener("mousedown",checkIfClickedOutside);
    
    return () => {
      // Cleanup the event listener
       document.removeEventListener("mousedown",checkIfClickedOutside);
      }
      
    }, [isMenuOpen,isDivOpen])

  useEffect(()=>{
    SECTRET_Coding();
  })
    const menuOpen =(e)=>
    {
         if(e.target.value.length ===0)
      {
        setIsMenuOpen(true);
      }
                }

  const showcities=()=>{
    Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/onlycities").then((res2)=>{
      setCities(res2.data);
      console.log(res2.data);
  })
  };

  const showmodels=(e)=>{
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/models",{makename:e}).then((res)=>{
      setmodels(res.data);

  })
  };

 
    const [query, setQuery] = useState("Toronto, ON");
    const debouncedQuery = useDebouncedValue(query, 200);
    function useDebouncedValue(value, wait) {
      const [debouncedValue, setDebouncedValue] = useState(value);
    
      useEffect(() => {
        
        const id = setTimeout(() => setDebouncedValue(value), wait);
        return () => clearTimeout(id);
      }, [value]);
    
      return debouncedValue;
    }


    const[fetchProvince,setfetchProvince]=useState([]);
    const onChange = (event) => 
        {
            if(event.length>0)
            {
              setIsMenuOpen(false);
            }
             
              setQuery(event);
             const SearchBarLocation={SearchBarLocation:query};
             localStorage.setItem("User_Choice_Location",JSON.stringify(SearchBarLocation));
              const filteredEmployees = cities.filter((val) => {
              return val.city_name.toLowerCase().includes(debouncedQuery.toLowerCase());
          });
          const filteredProvinces=provincesList.filter((val) => {
            return val.city_name.toLowerCase().includes(debouncedQuery.toLowerCase());
        });
        const Joined=[].concat(filteredEmployees,filteredProvinces);
       
          if(debouncedQuery==="")
          {
                setFilteredCities([]);
                setfetchProvince([]);
          }
        
          else 
          { 
              setFilteredCities(Joined);
              setIsDivOpen(true);
          } 

  }

    const clickme = (e) => {
      setQuery(e);
      setFilteredCities([]);
      
    };
    const clickme1 = (e) => {
      setQuery(e);
      setIsMenuOpen(false);
    };
    
    
const SECTRET_Coding=()=>
{
  var CryptoJS = require("crypto-js");
  var data ="7" ;
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();

  var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
  var decryptedData= JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log("ciphertext.."+ciphertext);
  console.log("decryptedData.."+decryptedData);
}



const [getmake,setgetmake]=useState('');
const [getModel,setgetModel]=useState('');
const [getMinYears,setgetMinYears]=useState('');
const [getMaxYears,setgetMaxYears]=useState('');
const [getMinprice,setgetMinprice]=useState('');
const [getMaxprice,setgetMaxprice]=useState('');
const [getMinMileage,setgetMinMileage]=useState('');
const [getMaxMileage,setgetMaxMileage]=useState('');

const navigateMe=useNavigate();

const FetchResult=()=>
{
  console.log("query"+query);
    const a=getMinprice.length;
    const b=getMaxprice.length;
    const aa=getMinprice.slice(1,a);
    const bb=getMaxprice.slice(1,b);

  if(query.length <=0)
  {
   
   navigateMe("/search-results",{state:{Make_name:getmake,Model_name:getModel,Min_price:aa,Max_price:bb}});
  }
  else
  {
    const a=query.indexOf(",");
    if(a>0)
    {
      navigateMe("/search-results",{state:{Make_name:getmake,Model_name:getModel,City_name:query,Min_price:aa,Max_price:bb}});
    }
    else if(a<0)
    {
      navigateMe("/search-results",{state:{Make_name:getmake,Model_name:getModel,province_name:query,Min_price:aa,Max_price:bb}});
    }
    

  }
}



  return (
    
     <div className='main-container'>
  
        <div className='main-container-vehsearch vehsearch-backimage' >
         
        
        <div  className='vehsearch-container' >
         <div  className='vehsearch-search-section'>

           <div className='vehsearch-seethrough-section box-black--see-through'>
              <div className='vehsearch-form-heading'>
                <div className='vehsearch-form-text'>
                 <h4>Car Shopping Made Easy</h4>
                 <p>
                   Search <span></span>
                   vehicles across canada
                 </p>
                </div>
                </div>
                 <div className='vehsearch-form-filter'>
                   <div className='vehsearch-form-filter-container'>
                     <div className='vehsearch-form-filter-make-model'>
                           <div className='select veh-search-size vehsearch-make-model-sel vehsearch-make-model-option-sel '>
                            <select name="vehicleMake" onChange={(e)=>{showmodels(e.target.value);setgetmake(e.target.value)}}>
                              <option value="" selected>All Make</option>
                              <optgroup label="Popular Makes">
                                {
                                  makes.map((val)=>{

                                    return <option >{val.makes_name}</option>
                                  })
                                }  </optgroup>
                           </select>
                            </div>
                          
                          <div className='select veh-search-size vehsearch-make-model-sel vehsearch-make-model-option-sel '>
                          <select name="vehicleModel" onChange={(e)=>{showmodels(e.target.value);setgetModel(e.target.value)}} >
                              <option value selected>All Models</option>
                              {
                                  models.map((val)=>{

                                    return <option value={val.model_name}>{val.model_name}</option>
                                  })
                                } 
                              </select>
                       </div> 
                     </div>      
                     </div>
                 </div>
                      <span className='location-filter'  ref={ref} >
                        <span className='location-filter-inn'>
                        <input type="text" className='text-input' placeholder="All of canada" value={query}  
                         onClick={(e)=>{menuOpen(e)}} onChange={(e)=>{onChange(e.target.value)}} ></input>
                         
                        <pre aria-hidden="true" className='pre-style'></pre>
                      <div className='filter-suggestion'>
                          <div className="filter-suggestions" >
                           {query.length > 0 && isDivOpen && filteredcities.length>0  ?  filteredcities.slice(0,5).map((val)=>{
                              return( <div className='filter-suggestions-item' onClick={()=> {clickme(val.city_name)}} >{val.city_name}</div>)
                           }):""}
                        
                        </div>
                        </div>
                        {isMenuOpen ? <div className='loc-sugg' >
                        <div className='loc-sugg-sb' >
                        <div className='filter-suggestions-item' id="Calgary, AB"  onClick={(e)=>{clickme1(e.target.id)}}>Calgary, AB</div>
                        <div className='filter-suggestions-item' id="Edmonton, AB" onClick={(e)=>{clickme1(e.target.id)}}>Edmonton, AB</div>
                        <div className='filter-suggestions-item' id="Montreal, QC" onClick={(e)=>{clickme1(e.target.id)}}>Montreal, QC</div>
                        <div className='filter-suggestions-item' id="Quebec, QC"   onClick={(e)=>{clickme1(e.target.id)}}>Quebec, QC</div>
                        <div className='filter-suggestions-item' id="Winnipeg, MB" onClick={(e)=>{clickme1(e.target.id)}}>Winnipeg, MB</div>
                        </div>
                          </div>:""}
                        </span>
                        
                      <a className='location-ic-lnk' ><ImTarget size={"20px"}></ImTarget></a> 
                      
                        
                      </span>
                   <div className='veh-price-fltr'>
                     <div className='select veh-price-min-max vhp-bdr-rt'>
                       <select className='vehprice '  onChange={(e)=>{setgetMinprice(e.target.value)}}>
            <option value="">Min Price</option>
                            
                         {
                         price.map((val)=>{
                          return (<option value={val.prices}>{val.prices}</option>)
                          })
                          }
                        <option value="">No Limit</option>
                       </select>
                     </div>
                     <div className='select veh-price-min-max vhp-bdr-lt'>
                       <select className='vehprice ' onChange={(e)=>{setgetMaxprice(e.target.value)}}>
            <option value="">Max Price</option>
                            {
                         price.map((val)=>{
                          return (<option value={val.prices}>{val.prices}</option>)
                          })
                          }
                        <option value="">No Limit</option>
                       </select>
                     </div>
                   </div>
                   <div className='sch-sub'>
                    <button  className='fnd-car-bt' onClick={()=>FetchResult()}>FIND A CAR</button>
                    <Link  className="adv-srch" to={{pathname:"/search-results"}} > Advanced Search</Link>
                   </div>
                         
           </div>
         </div>
        </div>
        </div>
        <div className='v-category'>
             <div className='v-cat-container'>
               <div className='v-cat-row pad-double-ends'>
                  <div className='v-cat-adj align-center'>
                    <div className='v-cat-heading'>
                     <h4>Find a Vehicle By Body Style</h4>
                     <p>Select a body style to find all vehicles of that type.</p>
                    </div>
                    <div className='v-cat-jellybeans push-none-large-bottom pad-half-sides'>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Convertible"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={convertible} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Convertible
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank"  to={{pathname:"/searchResultsClass/Coupe"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={coupe} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Coupe
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Sedan"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={sedan} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Sedan
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Electric"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={hybrid} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                        Electric
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Hybrid"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={hybrid} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                        Hybrid / Gas
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Hatchback"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={hatch} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Hatch/Wagon
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/SUV"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={suv} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          SUV
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Pickup"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={pickup} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Pickup truck
                        </span>
                      </Link>
                      
                      <Link className='v-catg-jellybeans  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Crossover"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={wagon} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Crossover
                        </span>
                      </Link>
                      <Link className='v-catg-jellybeans  city-class-make-lnk  city-class-make-lnk category-jellybeans align-center' target="_blank" to={{pathname:"/searchResultsClass/Van"}}>
                        <span className='ve-cat-icon' style={{position:"relative"}} >
                         <img src={minivan} alt="" style={{position:"absolute",top:"0",left:"0",width:"100%"}} />
                        </span>
                        <span className='v-cat-label'>
                          Van/Minivan
                        </span>
                      </Link>
                    </div>
                  </div>
               </div>
             </div>
       </div>
       <div className='bg-city-make'>
         <div className='v-cat-container ' >
           <div className='col-lg-8' >
              <div className='brw-pop'  >
                <div className='col-2'>
                <h5 className='brw-by-pop brw-head push-bottom'>Browse Popular Makes</h5>
                <div className='show-info'>
                {makes.length !==0 ?
                  <ul className='multi-list'>
                    {
                      makes.map((val)=>{
                        return (
                        <li className='lt-item'><Link className='city-class-make-lnk' to={{pathname:"/searchResultsMake/"+val.makes_name}} target="_blank">{val.makes_name}</Link></li>
                        )
                      })
                    }
                    </ul>:""}
       
                </div>
                </div>
              </div>
              <div>
                <div className='col-2' >
                <h5  className='brw-by-pop brw-head push-bottom'> Browse Popular Cities</h5>
                <div className='show-info'>
                {showedcities.length !==0 ?
                  <ul className='multi-list'>
                    {
                      showedcities.map((val)=>{
                        const indx=val.city_name;
                        const comma=indx.indexOf(',');
                        const cityName= indx.substring(0,comma);
                        
                        return (
                        <li className={val.location_type === 'Major'? 'lt-item-mj': 'lt-item'}><Link className='city-class-make-lnk' target="_blank" to={{pathname:"/searchResultsCity/"+val.city_name}}>{cityName}</Link></li>
                        )
                      })
                    }
                    </ul>:""}
                    
                  
                </div>
                </div>
              </div>
           </div>
           <div className='col-lg-4'>

           </div>
         </div>
       </div>
       <div className='app-box'>
         <div className='v-cat-container'>
           <div className='app-bx v-cat-row img-devices-min-height align-center rel'>
             <div className='app-col app-image'>
           <div className=' img-clipped'>
             <img src={devices} alt="" style={{maxWidth:"420px",position:"absolute",right:"0"}} />
           </div>
           
           </div>
           <div className='shop-app col-lg-6'>
               <h4 className='shop-head-algn-txt'>Shop on Carpages.ca from anywhere.</h4>
                <hr className='shop-app-hr'/>
                <p className='shop-p-algn-txt'>
                Browse through thousands of cars, trucks, and other vehicles anytime, anywhere. Download the Carpages.ca app today! Not sure what to buy? Check out our 
                <a href="" style={{textDecoration:"none"}}> Used Car Buying Guide</a>.
                </p>
                <div style={{display:"flex",justifyContent:"flex-start"}}>
                  <a href="" className=''>
                    <img src={gplay} alt="" style={{height:"48px",width:"150px",marginRight:"10px"}} />
                  </a>
                  <a href="">
                    <img src={ios} alt="" style={{height:"48px",width:"150px"}} />
                  </a>
                </div>
           </div>
           </div>

         </div>

       </div>
       </div>
    
  )
}
