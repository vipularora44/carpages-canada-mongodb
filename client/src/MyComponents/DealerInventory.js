import React from 'react'
import { useState,useEffect } from 'react';
import { IoHomeOutline,IoCheckmarkCircleSharp,IoSyncCircleSharp } from "react-icons/io5";
import {BsInfoCircleFill,BsInfoCircle, BsFillInfoCircleFill} from "react-icons/bs";
import {Link, useLocation,useNavigate, useParams} from 'react-router-dom';
import { FaPaperPlane } from "react-icons/fa";
import {FaTruck} from 'react-icons/fa';
import { HiPhone,HiLocationMarker } from "react-icons/hi";
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import AppHeader from './AppHeader';
import FooterMain from './FooterMain';
import '../Mystyles/dealerInventory.css'
export default function DealerInventory() {
    const [showBFM,setshowBFM]=useState(false);
    const [BFM,setBFM]=useState('');
    const [selleredata,setselleredata]=useState([]);
    const [showContact,setshowContact]=useState(false);
    const [fetchListings, setfetchListings] = useState([]);
    const [fetch_Makes_total, setfetch_Makes_total] = useState([]);
    const [fetch_Models_total, setfetch_Models_total] = useState([]);
    const [years, setyears] = useState([]);
    const {seller_id}=useParams();
    console.log("seller_id:::"+seller_id);
    try
    {}
    catch(error)
    {
       alert(error);
    }
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(seller_id, 'my-secret-key@123');
    var Seller_ID= JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    console.log("Seller_ID:::"+Seller_ID);
    useEffect(()=>{
 
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerDetails",{userId:Seller_ID}).then((res3)=>{
        console.log(res3.data);
       setselleredata(res3.data);
        setBFM(res3.data[0].buy_from_home);
      });
      getDealerListings();
      GetYears();
      GetAllMakes();
     
    },[Seller_ID]);

   const getDealerListings=()=>
   {
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealerListings",{userId:Seller_ID}).then((res3)=>{
      console.log(res3.data);
      setfetchListings(res3.data);
    });
   }
   const GetYears=()=>
   {
    Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/years").then((res3)=>{
      console.log(res3.data);
      setyears(res3.data);
    });
   }
   const GetAllMakes=()=>
   {
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealervehicleCount",{userId:Seller_ID}).then((res3)=>{
      console.log(res3.data);
      setfetch_Makes_total(res3.data);
    });
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
   const getMakeModel=(e)=>
   {

   
    if(e==='All Makes')
    {
      GetAllMakes();
    }
    else
    {
      setselectedMake(e);
    }
    if(bodyStyle)
    {
      Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealervehicleModelCount",{userId:Seller_ID,bodyStyle:bodyStyle,make_name:e}).then((res3)=>{
        console.log(res3.data);
        setfetch_Models_total(res3.data);
      });
    }
    else if(!bodyStyle)
    {
      Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealervehicleModelCount",{userId:Seller_ID,make_name:e}).then((res3)=>{
        console.log(res3.data);
        setfetch_Models_total(res3.data);
      });
    }
   
   }
   const getBodyStyle=(e)=>
   {
    
    if(e==='Choose Body Style')
    {
      GetAllMakes();
    }
    else
    {
      setbodyStyle(e);
    }
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealervehicleCount",{userId:Seller_ID,body_style:e}).then((res3)=>{
        console.log(res3.data);
        setfetch_Makes_total(res3.data);
      });
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
   const [bodyStyle,setbodyStyle]=useState('');
   const [selectedMake,setselectedMake]=useState('');
   const [selectedModel,setselectedModel]=useState('');
   const [selectedMinyear,setselectedMinyear]=useState('');
   const [selectedMaxyear,setselectedMaxyear]=useState('');
   const RefineSearch=()=>
   {
    if(bodyStyle || selectedMake || selectedModel ||selectedMinyear || selectedMaxyear)
    {
      Axios.post("https://carpages-canada-mongofrnt.onrender.com/listings/getDealerRefineInventory",{Seller_ID:Seller_ID,bodyStyle:bodyStyle,selectedMake:selectedMake,selectedModel:selectedModel,selectedMinyear:selectedMinyear,selectedMaxyear:selectedMaxyear}).then((res3)=>{
        console.log(res3.data);
        setfetchListings(res3.data);
      });
    }

   }
const Results =fetchListings.length > 0 ? fetchListings.slice(pagevisited, pagevisited + resultsPerPage).map((val)=>{
  const buyFhome=val.buy_from_home;
  const Seller_ID=val.Seller_ID;
  var CryptoJS = require("crypto-js");
 
  var En_seller_id = CryptoJS.AES.encrypt(JSON.stringify(val.seller_id), 'my-secret-key@123').toString();
  var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(val.listing_id), 'my-secret-key@123').toString();
  return <div className='shd-delaer-list-sect'>
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
  </div>
</div>
 }):""
  return (
          <><AppHeader/>
    <div style={{backgroundColor:"lightgray"}}>
          
      <div className='main-container'>
        
           <div className='main-container-sub'>
           <div className='shd-Dealers' style={{width:"66.666666%",marginTop:"16px"}}>
                <div className='shd-Dealers-sect'>
                    <div className='shd-Dealers-sect-sub'>
                         <div className='shd-Dealers-header'>
                          <div><strong style={{marginLeft:"12px"}}>Current Inventory</strong></div>
                          <div style={{borderLeft:"4px solid #00ab00",padding:"0 8px"}}>
                             <label style={{color:"#090",letterSpacing:"1px",fontWeight:"600",padding:"0 8px"}} >DETAILS</label>
                             <div style={{display:"flex",flexFlow:"row"}}>
                             <div style={{padding:"8px",justifyContent:"normal",width:"60%"}} className='shd-Dealers-header-sect shd-mg-bott'>
                                
                                <div style={{width:"40%"}}>
                                  <select name="" id="" className='shd-filter-list' onChange={(e)=>{getBodyStyle(e.target.value)}}>
                                        <option value="" selected >Choose Body Style</option>
                                        <option value="Convertible" >Convertible</option>
                                        <option value="Sedan" >Sedan</option>
                                        <option value="Wheelchair Accessible" >Wheelchair Accessible</option>
                                        <option value="Coupe" >Coupe</option>
                                        <option value="SUV / Crossover" >SUV / Crossover</option>
                                        <option value="Motorcycle" >Motorcycle</option>
                                        <option value="Hatchback" >Hatchback</option>
                                        <option value="Pickup Truck" >Pickup Truck</option>
                                        <option value="Commercial" >Commercial</option>
                                        <option value="Minivan / Van" >Minivan / Van</option>
                                        <option value="Wagon" >Wagon</option>
                                       </select>
                                  </div>
                                  <div style={{width:"30%"}}>
                                    <select style={{width:"85%"}} name="" id="" className='shd-filter-list' onChange={(e)=>{getMakeModel(e.target.value)}}>
                                   <option value="" selected >All Makes</option>
                                        {fetch_Makes_total.map((val)=>
                                        {
                                          return <option value={val.make_name} >{val.make_name} ({val.Total})</option>
                                        })

                                        }
                                       </select>
                                  </div>
                                  <div  style={{width:"30%"}}>
                                    <select style={{width:"85%"}} name="" id="" className='shd-filter-list' onChange={(e)=>setselectedModel(e.target.value)} >
                                   <option value="" selected >All Models</option>
                                        {fetch_Models_total.map((val)=>
                                        {
                                          return <option value={val.model_name} >{val.model_name} ({val.Total})</option>
                                        })

                                        }
                                       </select>
                                  </div>
                                  </div>
                                  <div style={{padding:"8px",justifyContent:"normal",width:"40%"}} className='shd-Dealers-header-sect shd-mg-bott'>
                                  <div style={{width:"48%"}}>
                                    <select style={{width:"85%"}} name="" id="" className='shd-filter-list' onChange={(e)=>{setselectedMinyear(e.target.value)}}>
                                   <option value="" selected disabled>Min Year</option>
                                        {years.map((val)=>
                                        {
                                          return <option value={val.years}>{val.years}</option>
                                        })

                                        }
                                       </select>
                                  </div>
                                  <div style={{width:"48%"}}>
                                    <select style={{width:"85%"}} name="" id="" className='shd-filter-list' onChange={(e)=>{setselectedMaxyear(e.target.value)}}>
                                   <option value="" selected disabled>Max Year</option>
                                        {years.map((val)=>
                                        {
                                          return <option value={val.years}>{val.years}</option>
                                        })

                                        }
                                       </select>
                                  </div>
                                  </div>
                                  </div>
                                  <div style={{padding:"0 8px"}}>
                                  <button className='refine-results-btn' onClick={()=>{RefineSearch()}}>REFINE</button>
                                  </div>
                                  
                            </div>
                            <div style={{padding:"16px 16px 0 16px"}} className='shd-Dealers-header-sect shd-mg-bott'>
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
           <div className='dealer-details-container'>
                            <div className='dealer-details-sub-container  deal-sect-pos'>
                              <div  style={{padding:"32px 16px",backgroundColor:"white"}}>
                              {BFM ==="yes"?<div>
                             <div className="bd-rad1" >
                                <div style={{display:"flex",flexDirection:"row",alignItems:"center",padding:"16px",backgroundColor:'#5cb35d'}}>
                                
                                <IoHomeOutline style={{color:"white",fontSize:"45px"}} />
                                <h6 style={{color:"white",fontSize:"20px",marginLeft:"10px",fontWeight:"700"}}>Buy From Home Available</h6>
                                < BsFillInfoCircleFill style={{color:"white",marginLeft:"auto",marginTop:"-32px"}}/>
                                </div>
                                <div className='bfm-sect'>
                                  <div style={{display:"flex",flexFlow:"column"}}>
                                  <label style={{fontWeight:"600"}}>Remote Buying Options</label>
                                  <div style={{margin:"10px 0",display:"flex",flexFlow:"column"}}>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>E-Sign Documents</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Local Delivery</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Local Test Drive Delivery</span>
                                  <span ><IoCheckmarkCircleSharp style={{color:"green",fontSize:"22px",marginRight:"8px"}}/>Exchange Policy</span>

                                  </div>
                                  </div>
                                  
                                </div>

                              </div>
                            
                              <p style={{marginTop:"16px",fontSize:"13px",fontWeight:"700",textAlign:"center",color:"#888"}}>* Remote buying options subject to local restrictions due to COVID-19. Please contact dealer for availability.</p>
                              </div> :""}
                              <div style={{padding:" 16px 32px"}}>
                                                        {selleredata.map((val)=>{
                                                                
                                                        return <div style={{display:"flex",flexDirection:"column",flex:"0 0 auto",justifyContent:"center",alignItems:"center"}}>
                                                           <div><img src={require('../images/dealer-images/'+val.user_image+'')} alt="" style={{width:"200px",height:"120px",objectFit:"contain",borderRadius:"10px"}}/></div>
                                                          <div>
                                                            <h4 style={{fontWeight:"800"}}><Link to="#" className='veh-detail-lnk' >{val.user_name}</Link></h4>
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
                                                          
                                                          </div>
                                                           })}
                             {selleredata.map((val)=>{
                            
                              return <div style={{padding:"16px 8px",backgroundColor:"#f2f2f2",borderRadius:"5px"}}>
                                       <h5 style={{textAlign:"center"}}>Email {val.user_name}</h5>
                                <div style={{display:"flex",flexFlow:"column",padding:"16px 8px",borderRadius:"8px"}}>
                                  <input type="text"  placeholder='Your Name' className='lst-dealer-cont-inp' />
                                  <input type="text" placeholder='Your email' className='lst-dealer-cont-inp'/>
                                  <input type="text" placeholder='Phone' className='lst-dealer-cont-inp'/>
                                  <textarea name="" id="" placeholder='Message..' className='lst-dealer-cont-txtar'  ></textarea>
                                                               
                                </div>
                                <div style={{display:"flex",justifyContent:"center"}}><button style={{padding:"8px 24px",fontWeight:"600",color:'white',background:"#15af15",border:"none",borderRadius:"4px"}} >Send Message<FaPaperPlane style={{marginLeft:"10px"}}/></button></div>
                            </div>
                             }) }

                                                        
                                                           
                             
                              </div>
                            </div>
                        </div>
           </div>
        </div>
    </div>
    <FooterMain/>
    </>
  )
}
