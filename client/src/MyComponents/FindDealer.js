import React, { useEffect, useState } from 'react'
import AppHeader from '../MyComponents/AppHeader'
import Footer from '../MyComponents/FooterMain'
import '../Mystyles/findealer.css'
import * as IoIos from 'react-icons/io';
import {BiCurrentLocation} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import ClickAwayListener from '@mui/base/ClickAwayListener';
export default function FindDealer() {
  
  
  
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
  const Albhabatical=[
    {alphabet_name:"A"},
    {alphabet_name:"B"},
    {alphabet_name:"C"},
    {alphabet_name:"D"},
    {alphabet_name:"E"},
    {alphabet_name:"F"},
    {alphabet_name:"G"},
    {alphabet_name:"H"},
    {alphabet_name:"I"},
    {alphabet_name:"J"},
    {alphabet_name:"K"},
    {alphabet_name:"L"},
    {alphabet_name:"M"},
    {alphabet_name:"N"},
    {alphabet_name:"O"},
    {alphabet_name:"P"},
    {alphabet_name:"Q"},
    {alphabet_name:"R"},
    {alphabet_name:"S"},
    {alphabet_name:"T"},
    {alphabet_name:"U"},
    {alphabet_name:"V"},
    {alphabet_name:"W"},
    {alphabet_name:"X"},
    {alphabet_name:"Y"},
    {alphabet_name:"Z"},

  ];
  const Navigate=useNavigate();
  const [locationname, setLocationname] = useState([]);
  const [provname, setprovname] = useState(provincesList);
  const [showDealer, setshowDealer] = useState(false);
  const [fshowDealer, setfshowDealer] = useState(false);
  const [showlocations, setshowlocations] = useState(false);
  const [cityname, setCityname] = useState([]);
  const [provincename, setProvincename] = useState([]);
  const [dealerslist, setdealerslist] = useState([]);
  const [fdealerslist, setfdealerslist] = useState([]);
//  let enteredcityname,enteredprovince="";
  let brokers=[];
  useEffect(()=>{
    Axios.get("https://carpages-canada-mongodb.onrender.com/categories/onlycities").then((res1)=>{
      console.log(res1.data);
     setLocationname(res1.data);
    });
  },[]);

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
  const [query2, setQuery2] = useState("");
  const debouncedQuery2 = useDebouncedValue2(query2, 200);
  function useDebouncedValue2(value, wait) {
    const [debouncedValue2, setDebouncedValue2] = useState(value);
  
    useEffect(() => {
      
      const id = setTimeout(() => setDebouncedValue2(value), wait);
      return () => clearTimeout(id);
    }, [value,query2]);
  
    return debouncedValue2;
  }
  
  

const getProvince= (ev)=>{
       
        setQuery1(ev);
        const filtered_province =provname.filter((val)=>{
          return val.province_name.toLowerCase().includes(debouncedQuery1.toLowerCase());
        });
          setProvincename(filtered_province);
          
            
}

const getLocations = (ev) =>
{      setshowlocations(true);
       setdealerslist([]);
        setQuery1(ev);
        const filtered_city = locationname.filter((val1)=>{
          return val1.city_name.toLowerCase().includes(debouncedQuery1.toLowerCase());
        }); 
        if(ev==="")
        {
           setCityname([]);
           setProvincename([]);
           setfdealerslist([]);
        }
        else if(filtered_city.length <=0)
        {
          setCityname([]);
          getProvince(ev);
        }
        else
        {
          setCityname(filtered_city);
        }
        
}


const setArea =(e)=>
{
   setQuery1(e);
console.log("city name"+e);
   setCityname([]);
   setProvincename([]);
   const a=e.indexOf(",");
   const b=e.slice(a);
   const c=b.length;
   const d=e.substring(0,a);
   const f=b.substring(2,c);
   let provinceAbrivation="";
    
   if(a>0)
   {
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/dealerbycity",{cityname:e}).then((res1)=>{
      console.log(res1.data);
      setdealerslist(res1.data);
    });
   }
   else if(a<0)
   {
    if(e==="Ontario"){provinceAbrivation="ON";}else if(e==="British Columbia"){provinceAbrivation="BC";}else if(e==="Manitoba"){provinceAbrivation="MB";}else if(e==="Newfoundland and Labrador"){provinceAbrivation="NL";}
    else if(e==="New Brunswick"){provinceAbrivation="NB";}else if(e==="Northwest Territories"){provinceAbrivation="NT";}else if(e==="Nova Scotia"){provinceAbrivation="NS";}else if(e==="Nunavut"){provinceAbrivation="NU";}
    else if(e==="Prince Edward Island"){provinceAbrivation="PE";}else if(e==="Quebec"){provinceAbrivation="QC";}else if(e==="Saskatchewan"){provinceAbrivation="SK";}
    else if(e==="Yukon"){provinceAbrivation="YT";}
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/dealerbyprovince",{province:e}).then((res1)=>{
      console.log(res1.data);
      setdealerslist(res1.data);
    });
   }
}

const getDealers = (dl) =>
{
       
       setshowDealer(false);
       setfshowDealer(true);
        setQuery2(dl);
        brokers=dealerslist;
        console.log("brokers"+brokers);
        
        const filtered_dealer =brokers.filter((val1)=>{
          return val1.user_name.toLowerCase().includes(debouncedQuery2.toLowerCase());
        }); 
       
        if(dl==="")
        {
           setshowDealer(false);
           setfshowDealer(false);
        }
        else
        {
         
          setfdealerslist(filtered_dealer);
          if(filtered_dealer.length<=0)
          {
            console.log("*** if in else");
             
          }
          
        }
        
}

const ShowDealers =()=>
{
  setshowDealer(true);
  console.log(";;;;"+ dealerslist.length);
  
}
const pasteDealerName =(e)=>
{
  setQuery2(e);
}

const find_Dealers =()=>
{
 
  let dealer_Location_state="";
  let dealer_Name_state="";
   if(query1 !="" && query2 !="" )
   {
    
      Navigate('/showdealer',{state:{dealer_Location_state:query1,dealer_Name_state:query2}});
      console.log("Not Empty");
   }
   else if(query1 ==="" && query2 !="" )
   {
    Navigate('/showdealer',{state:{dealer_Name_state:query2}});
    console.log("Empty");
   }
   else if(query1 !="" && query2 ==="" )
   {
   
    Navigate('/showdealer',{state:{dealer_Location_state:query1}});
    console.log("Empty");
   }
   else if(query1 ==="" && query2 ==="" )
   {
    Navigate('/showdealer');
    console.log("Empty");
   }
}
const handleClickAway = () => {
  setshowlocations(false);
};
const handleClickAway1 = () => {
  setshowDealer(false);
};
console.log(";;;;"+ showlocations);
  return (
    <>
    <AppHeader/>
    <div className='bg'>
    
    
    <div className='main-cont'>
        <div className='box-f-deal-disp box box-pad'>
            <div className='ct-find'>
                <div className='ct-find-sub-cont box-pad bdr-rad ht bx-shad bx-image'>
                  <div className='find-deal-dm box-pad'>
                     <div className='clr'>
                        <h1 className='head-fonts'>Dealer Search</h1>
                        <h4 className='par-fonts'>
                            <p>
                            Find a dealer near you. See New and Used vehicle inventory, maps, and more.
                            </p>
                        </h4>
                     </div>
                  </div>
                  <div className='find-deal-dm box-pad'>
                   <div className='clr'>
                   <h4 className='par-fonts'>
                            <p>Search for dealers across Canada</p>
                   </h4>        
                   </div>
                   <div className='clr'>
                   <div>
                      <div className='in-intro' i >Location
                      </div>
                      <ClickAwayListener   onClickAway={handleClickAway}> 
                          <div className='disp-fx inp-st-cont' >
                          
                          <div className='deal-srch-loc ' style={{position:"relative"}}>
                            <input type="text" name="" id="" value={query1} placeholder='All Of Canada' className='inp--st-loc'  onChange={(e)=>{getLocations(e.target.value)}}/>
                            {cityname.length>0 && showlocations || provincename.length>0  ?<div className='fd-filter-suggestion'>
                             <div className="fd-filter-suggestions" >
                             {cityname.length !="" || cityname ? cityname.slice(0,5).map((val)=>{
                              return  <div className='fd-filter-suggestions-item' onClick={()=>{setArea(val.city_name)}}>{val.city_name}</div>})
                              :""                          
                            }
                            {
                              cityname.length ==="" || provincename ? provincename.map((val1)=>{
                                return  <div className='fd-filter-suggestions-item' onClick={()=>{setArea(val1.province_name)}}>{val1.province_name}</div>})    
                            :""}
                             </div>
                            </div>:""}
                          </div>
                          <button className='find-deal-loc-bt' ><BiCurrentLocation ></BiCurrentLocation></button>
                          </div>
                          </ClickAwayListener>   
                       </div>
                       
                       <div>
                      <div className='in-intro mg-top'  >Dealer
                      </div>
                      <ClickAwayListener   onClickAway={handleClickAway1}> 
                      <div className='disp-fx inp-st-cont'>
                      <input type="text" name="" id="" placeholder='Dealer Name'value={query2} className='inp--st-loc'  onClick={()=>{ShowDealers()}}  onChange={(e)=>{getDealers(e.target.value);setshowDealer(true)}} />
                       {fdealerslist.length > 0 && fshowDealer?<div className='fd-filter-suggestion'>
                             <div className="fd-filter-suggestions-deal" >
                             {fdealerslist.length !="" && fdealerslist ? fdealerslist.slice(0,5).map((val)=>{
                              return  <div className='fd-filter-suggestions-item' onClick={()=>{pasteDealerName(val.user_name)}}>{val.user_name}</div>})
                              :""                          
                            }
                             </div>
                        </div>:<div className='fd-filter-suggestion'>
                             <div className="fd-filter-suggestions-deal" > 
                             {showDealer? dealerslist.map((val)=>{
                              return  <div className='fd-filter-suggestions-item' onClick={()=>{pasteDealerName(val.user_name)}}>{val.user_name}</div>})
                           :""                            
                            }
                              </div>
                               </div>}    
                      </div>
                      </ClickAwayListener>  
                      <div className='disp-fx inp-st-cont' >
                      <button className='srch-sb-bt  clr' onClick={()=>find_Dealers()}>Search</button>
                          
                          </div>
                       </div>
                   </div>
                  </div>
                </div>
            </div>
             <div className='ct-find-sub-cont box-pad bdr-rad  align-just bg box-pd-lg'>
                <div className='fcd-alpha mg-bt-lg' >
                  <h5 className='sect-head'>Find Car Dealers Alphabatically</h5>
                    <ul className='ullst-st-grid align-just'>
                        {
                          Albhabatical.map((val)=>{
                            return <li className='lst-item' onClick={()=>{Navigate("/showdealer",{state:{dealer_alphabet:val.alphabet_name}})}}>{val.alphabet_name}</li>
                          })
                        }
                    </ul>
                  
                </div>
                <div className='fcd-alpha'>
                        <h5 className='sect-head'>Web Solutions for Car Dealers</h5>
                <div className='deal-srch-loc mg-top'>
                     <div className='sol-for-dealer mg-rt' >
                      <h5 className='sol-for-dealer-head'>Advertise on <span className='sol-for-dealer-span'>Carpages.ca</span></h5>
                      <p>Find out how you can advertise your inventory to our online audience.</p>
                      <Link className='sol-for-dealer-lnk clr' to="https://dealers.carpages.ca/dealerpage/">Learn More <i class="fa-solid fa-angles-right arr-ic"></i></Link>
                    </div>
                    <div className='sol-for-dealer'>
                    <h5 className='sol-for-dealer-head'>Discover <span className='sol-for-dealer-span'>DealerSite+</span></h5>
                      <p>DealerSite+ is a cost-effective, mobile-friendly, car dealer website solution..</p>
                      <Link className='sol-for-dealer-lnk clr' to="https://dealers.carpages.ca/dealersite/">Learn More <i class="fa-solid fa-angles-right arr-ic"></i></Link>
                    </div>
                </div>
                </div>
             </div>
        </div>

    </div>
    
    
    </div>
    <Footer/>
    </>
  )
}
