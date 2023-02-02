import React, { useRef,useState } from 'react'
import '../Mystyles/showdealers.css'
import AppHeader from './AppHeader'
import FooterMain from './FooterMain'
import {ImTarget} from "react-icons/im";
import {BiRadioCircle}from 'react-icons/bi';
import {BsCheck} from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {BsTelephoneFill} from 'react-icons/bs';
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {IoHomeOutline} from 'react-icons/io5';
import {IoSyncCircleSharp} from 'react-icons/io5'
import {HiSortDescending,HiOutlineDotsVertical} from 'react-icons/hi';
import {FaTruck} from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import { Link,useParams,useNavigate } from 'react-router-dom';
import { borderBottom } from '@mui/system';
import ClickAwayListener from '@mui/base/ClickAwayListener';
export default function ShowDealer() {
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
    const location = useLocation();
    const state = location.state;
    var arra1="";
    const ref = useRef();
    const {type}=useParams();
    const Navigate=useNavigate(); 
    const [locationname, setLocationname] = useState([]);
    const [query1, setQuery1] = useState(state?state.dealer_Location_state:"");
    const [provname, setprovname] = useState(provincesList);
    const [showinventory,setshowInventory]=useState(false);
    const [showContact,setshowContact]=useState("");
    const [locationName,setlocationName]=useState("");
    const [dealerName,setdealerName]=useState("");
    const [contactid,setcontactid]=useState([]);
    const [fshowDealer, setfshowDealer] = useState(false);
    const [showDealer, setshowDealer] = useState(false);
  const [showlocations, setshowlocations] = useState(false);
  const [cityname, setCityname] = useState([]);
  const [provincename, setProvincename] = useState([]);
  const [dealerslist, setdealerslist] = useState([]);
  const [fdealerslist, setfdealerslist] = useState([]); 
  const [MylistingOptions , setMylistingOptions]= useState(false);
  const [MylistingOptionsIndex , setMylistingOptionsIndex]= useState("");
  const [showModal , setshowModal]= useState(false);
  const [UserDeleteId , setUserDeleteId]= useState('');
    var PagedaNo="";
   // console.log("001"+state.dealer_Location_state);
    const [LocName,setLocName]=useState();
    var keywordLocation="";
    
    const [showDealerList, setshowDealerList] = useState([]);
    const [pageNumber, setpageNumber] = useState(0);
    
    const usersPerPage=10;
    const pagevisited= pageNumber * usersPerPage;
    const initialRecord=pagevisited + 1;
    const lastlRecord=pagevisited + 1 * 10;
    const PageCount= Math.ceil( showDealerList.length / usersPerPage );

   
    useEffect(()=>{
      console.log("Type"+type);
      if(state)
      {
        setLocName();
        console.log("state.dealer_Location_state"+JSON.stringify(state));
        keywordLocation = JSON.parse(localStorage.getItem('User_Choice_Location'));
        if(state.showDeal)
        {
          Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/search_bar",{keyword:state.showDeal,location:keywordLocation["SearchBarLocation"]}).then((res)=>{
            console.log(res.data);
            setshowDealerList(res.data);
            });
        }
        if(state.dealer_alphabet)
        {
          Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerByAlphabet",{alphabet:state.dealer_alphabet}).then((res)=>{
            console.log(res.data);
            setshowDealerList(res.data);
            });
        }
        if(state.dealer_Location_state)
        {
          console.log("state.dealer_Location_state Working");
         setArea(state.dealer_Location_state);
        }
        
       
        
      }
      else if(!state)
      {
        
        Axios.get("https://carpages-canada-mongofrnt.onrender.com/users/allUsers").then((res)=>{
            console.log(res.data);
            setshowDealerList(res.data);
            });
      }

     if(LocName==="")
      {
        
        DealersData();
      }
      if(type)
      {
        Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerByType",{userType:type}).then((res)=>{
            console.log(res.data);
            setshowDealerList(res.data);
            });
        
      }
     
       
        
   //console.log(showContact+"%%%"+contactid);
    },[type,state,showContact,contactid]);


    
    const DeleteUser=(e)=>
    {
       console.log("ListingId..."+e);
    }
    const UpdateUser=(e)=>
    {
     var CryptoJS = require("crypto-js");
     
     var En_listing_id = CryptoJS.AES.encrypt(JSON.stringify(e), 'my-secret-key@123').toString();
     Navigate("/update-user/"+encodeURIComponent(En_listing_id));
    }
   
    const changeUserStatus=(ID,status)=>
   {
     //alert(JSON.stringify(MyLocation.pathname));
     console.log("ID..."+ID+"status.."+status);
     
     if(status==="unblock")
     {
       Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/updatetUserStatus",{UserId:ID,status:"block"}).then ((response1) =>{
         console.log(response1.data);
        
      });
     // window.history.replaceState(null, "New Page Title",MyLocation.pathname);
     }
     else if(status==="block")
     {
       Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/updatetUserStatus",{UserId:ID,status:"unblock"}).then ((response1) =>{
         console.log(response1.data);
        
      });
      
     }
     window.location.reload();
   }
    useEffect(()=>
    {    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
         if (MylistingOptions && MylistingOptionsIndex  && ref.current && !ref.current.contains(e.target)) {
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



   
    const DealersData=()=>
    {
        const a=LocName.indexOf(",");
        const b=LocName.slice(a);
        const c=b.length;
        const d=LocName.substring(0,a);
        const f=b.substring(2,c);
        let provinceAbrivation="";
        console.log(a+'....'+b+"..."+c+"..."+d+"..."+f+"....");
            if(LocName ==="")
            {
                Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/allDealers",{dealer:"dealer"}).then((res1)=>{
                    console.log(res1.data);
                    setshowDealerList(res1.data);
                   
                    });
            }
            else if(LocName.length>0)
            {
                if(a>0)
                {
                    Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/dealerbycity",{city_name:LocName}).then((res1)=>{
                    console.log(res1.data);
                    setshowDealerList(res1.data);
                    });
                }
                else if(a<0)
                {
                    if(LocName==="Ontario"){provinceAbrivation="ON";}else if(LocName==="British Columbia"){provinceAbrivation="BC";}else if(LocName==="Manitoba"){provinceAbrivation="MB";}else if(LocName==="Newfoundland and Labrador"){provinceAbrivation="NL";}
                    else if(LocName==="New Brunswick"){provinceAbrivation="NB";}else if(LocName==="Northwest Territories"){provinceAbrivation="NT";}else if(LocName==="Nova Scotia"){provinceAbrivation="NS";}else if(LocName==="Nunavut"){provinceAbrivation="NU";}
                    else if(LocName==="Prince Edward Island"){provinceAbrivation="PE";}else if(LocName==="Quebec"){provinceAbrivation="QC";}else if(LocName==="Saskatchewan"){provinceAbrivation="SK";}
                    else if(LocName==="Yukon"){provinceAbrivation="YT";}
                    Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/dealerbyprovince",{province:LocName}).then((res1)=>{
                    console.log(res1.data);
                    setshowDealerList(res1.data);
                    });
                }
            }
    }
     const InsertContact =(e,f)=>
     {
           // arra1=f;
          // console.log(arra1+"####");
          setshowContact(e);
          setcontactid(contactid=>[...contactid,e]);
     }
     let brokers=[];
     useEffect(()=>{
       Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/onlycities").then((res1)=>{
         console.log(res1.data);
        setLocationname(res1.data);
       });

     
     },[]);
   
   
     const debouncedQuery1 = useDebouncedValue1(query1, 200);
     function useDebouncedValue1(value, wait) {
       const [debouncedValue1, setDebouncedValue1] = useState(value);
     
       useEffect(() => {
         
         const id = setTimeout(() => setDebouncedValue1(value), wait);
         return () => clearTimeout(id);
       }, [value,query1]);
     
       return debouncedValue1;
     }

    
      
      const [query2, setQuery2] = useState(state?state.dealer_Name_state:"");
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
          //setdealerslist([]);
          console.log("INPUT..."+JSON.stringify(locationname));
           setQuery1(ev);
           const filtered_city = locationname.filter((val1)=>{
             return val1.city_name.toLowerCase().includes(debouncedQuery1.toLowerCase());
           }); 

           console.log("filtered_city"+JSON.stringify(filtered_city));
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

    const ShowDealers =()=>
    {
      
      setshowDealer(true);
      //setfshowDealer(true);
      console.log(showDealer+"LIST.."+JSON.stringify(dealerslist));
    }
    const pasteDealerName =(e)=>
    {
      console.log("Paste Name"+e+"Query2"+query2);
      setQuery2(e);
      setshowDealer(false);
      setfshowDealer(false);
    }
    console.log("Query2"+query2);

   const setArea =(e)=>
   {
      setQuery1(e);
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
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/dealerbycity",{cityname:e}).then((res1)=>{
      console.log(res1.data);
      setshowDealerList(res1.data);
    });
   }
   else if(a<0)
   {
    if(e==="Ontario"){provinceAbrivation="ON";}else if(e==="British Columbia"){provinceAbrivation="BC";}else if(e==="Manitoba"){provinceAbrivation="MB";}else if(e==="Newfoundland and Labrador"){provinceAbrivation="NL";}
    else if(e==="New Brunswick"){provinceAbrivation="NB";}else if(e==="Northwest Territories"){provinceAbrivation="NT";}else if(e==="Nova Scotia"){provinceAbrivation="NS";}else if(e==="Nunavut"){provinceAbrivation="NU";}
    else if(e==="Prince Edward Island"){provinceAbrivation="PE";}else if(e==="Quebec"){provinceAbrivation="QC";}else if(e==="Saskatchewan"){provinceAbrivation="SK";}
    else if(e==="Yukon"){provinceAbrivation="YT";}
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/dealerbyprovince",{province:e}).then((res1)=>{
      console.log(res1.data);
      setshowDealerList(res1.data);
    });
   }

      
   } 



   const getDealers = (dl) =>
   {
          
          setshowDealer(false);
          setfshowDealer(true);
           setQuery2(dl);
           brokers=showDealerList;
           console.log("brokers"+brokers);
           
           const filtered_dealer =brokers.filter((val1)=>{
             return val1.user_name.toLowerCase().includes(debouncedQuery2.toLowerCase());
           }); 
           console.log("filtered_dealer"+JSON.stringify(filtered_dealer));
           if(dl==="")
           {
             // setshowDealer(false);
              setfshowDealer(false);
              setfdealerslist([]);
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

   
  const refineSearch=()=>
  {
      console.log("query1"+query1);
      const a=query1.indexOf(",");
      const b=query1.slice(a);
      const c=b.length;
      const d=query1.substring(0,a);
      const f=b.substring(2,c);
      let provinceAbrivation="";
      if(query1.length>0 &&  query2.length>0)
     {  
      if(a>0 )
      {
        //alert("if 1"+query1);
       Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerByCity",{city_name:query1,dealer_name:query2}).then((res1)=>{
         console.log(res1.data);
         setshowDealerList(res1.data);
       });
      }
      else if(a<0  && query2.length>0)
      {
        //alert("else if 2"+query1);
       Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerByProvince",{province:query1,dealer_name:query2}).then((res1)=>{
         console.log(res1.data);
         setshowDealerList(res1.data);
       });
      }}
       if(query1==="" && query2.length>0)
      {
        //alert("else if 2"+query1);
        Axios.post("https://carpages-canada-mongofrnt.onrender.com/users/getDealerByOnlyName",{dealer_name:query2}).then((res1)=>{
          console.log(res1.data);
          setshowDealerList(res1.data);
        });
      }  
  }

  const handleClickAway1 = () => {
    setshowDealer(false);
  };


  const changepage=({selected})=>
  {
       PagedaNo=selected;
       setpageNumber(selected);
  }
 // console.log(PagedaNo+"Page No:"+pageNumber);
  const displayusers=showDealerList.slice(pagevisited, pagevisited + usersPerPage).map((val,index)=>{
                      
      const a= val.user_contactno;
      const b=a.length;
      const user_status=val.user_status;
      const c=a.substring(0,b-4);
      var CryptoJS = require("crypto-js");
      var data ="7" ;
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(val.user_id), 'my-secret-key@123').toString();
     
      console.log(index+"***"+c+"@@@"+arra1);
      return <div className='shd-delaer-list-sect'>
      <Link className='shd-deal-pic'  to={{pathname:"/dealer_inventory/"+encodeURIComponent(ciphertext.toString())}} >
          <img src={require('../images/dealer-images/'+val.user_image+'')}  style={{width:"200px",height:"120px"}} alt="" />
      </Link>
      <div className='shd-deal-info' style={{width:"66.666666%"}}>
          <div className=''>
                  <h5 style={{marginBottom:"-2px"}}><Link to={{pathname:"/dealer_inventory/"+encodeURIComponent(ciphertext.toString())}} className='shd-deal-nm-hd-lk'>{val.user_name}</Link></h5>
                  <p className='shd-deal-nm-city-nm'>{val.user_cityname}, {val.user_province}</p>
          </div>
          <div>
             <button className='shd-bt-cont' value={a} onClick={(e)=>{InsertContact(e.target.value,index)}}><BsTelephoneFill  className='shd-phone-ico'/>{ contactid.includes(val.user_contactno)? a:c+"XXXX (click to show)"}</button>
          </div>
      </div>
      <div className='shd-buy-frm-home' style={{width:"33.333333%"}}>
           <div style={{marginBottom:"10px"}}>
          <AiOutlineUnorderedList className='shd-vinv-icon'/> 
          <a href="" className='shd-rst-filter'> View Inventory</a>
          </div>
          <div>
           <a href="" className='buy-frm-home-lnk' >
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
          </div>
      </div>
      <div  style={{zIndex:"1",width:"100px",display:"flex",flexFlow:"row",position:"relative"}}>
                      <HiOutlineDotsVertical onClick={()=>{setMylistingOptions(true);setMylistingOptionsIndex(+index+1)}} className='img-opt-menu-dots'/>
                      
                        {MylistingOptions && MylistingOptionsIndex ===+index+1?
                        <div ref={ref} style={{backgroundColor:"#f8f3f3",boxShadow:"3px 3px white"}}  className='img-opt-menu-ul-sect'>
                          <ul style={{width:"max-content",marginBottom:"0"}} className='img-opt-menu-ul'>
                          <li style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{setshowModal(true);setUserDeleteId(val.user_id)}}>Delete User</li>
                          <li  style={{borderBottom:"1px solid lightgrey"}} className='img-opt-menu-litem' onClick={()=>{UpdateUser(val.user_id)}}>Update User</li>
                          {user_status==="block"?<li className='img-opt-menu-litem' onClick={()=>{changeUserStatus(val.user_id,user_status)}}>UnBlock User</li>:""}
                          {user_status==="unblock"?<li className='img-opt-menu-litem' onClick={()=>{changeUserStatus(val.user_id,user_status)}}>Block User</li>:""}

                          </ul> 
                        </div>:""}
                      </div>
  </div>
  });


  return (
    <>
    <AppHeader/>
    <div className='shd-maincont'>
        
            <div className='shd-subcont'>
                <div className='shd-sidemenu  '>
                    <div className='shd-pos-st'>
                    <div className='shd-pad-16'>
                    <div className='shd-sidemenu-opt shd-dsp shd-fd '>
                     <h3 className='shd-h-fd'>Find dealers near you</h3>
                      <a href="" className='shd-rst-filter'>Reset Filters</a>
                    </div>
                    <hr className='shd-hr' />
                    <div className='shd-sidemenu-opt shd-dsp shd-fd '>
                     <label htmlFor="" className='shd-sidemenu-lbl shd-mg-bott'>LOCATION</label>
                     <div className='shd-dsp shd-mg-bott' style={{position:"relative"}}>
                     <input type="text" placeholder='All of Canada' value={query1} style={{width:"75%"}}  className='shd-inp' onChange={(e)=>{getLocations(e.target.value)}}/>
                     <button className='shd-bt-loc'><ImTarget ></ImTarget></button>
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
                     <div className='shd-mg-bott'>
                     <span className='shd-span-ft'>Within</span>
                     <select name="" id="" className='shd-sel-km'>
                              <option value="">25</option>
                              <option value="">50</option>
                              <option value=""selected="selected">100</option>
                              <option value="">200</option>
                              <option value="">500</option>
                            </select>
                    <span className='shd-span-ft'>KM</span>
                    </div>
                    </div>
                    <hr className='shd-hr' />
                    <div className='shd-sidemenu-opt shd-dsp shd-fd shd-mg-bott' >
                        <label htmlFor="" className='shd-sidemenu-lbl shd-mg-bott'>DEALER</label>
                        <ClickAwayListener   onClickAway={handleClickAway1}> 
                        <div style={{position:"relative"}}>
                        <input style={{width:"100%"}} type="text" placeholder='Dealer Name' value={query2} className='shd-inp shd-mg-bott' onClick={()=>{ShowDealers()}}  onChange={(e)=>{getDealers(e.target.value);setshowDealer(true)}}/>
                        {fdealerslist.length >0 ?<div className='fd-filter-suggestion'>
                             <div className="fd-filter-suggestions-deal" >
                             { fshowDealer ? fdealerslist.slice(0,5).map((val)=>{
                              return  <div className='fd-filter-suggestions-item' onClick={()=>{pasteDealerName(val.user_name)}}>{val.user_name}</div>})
                              :""                          
                            }
                             </div>
                        </div>:<div className='fd-filter-suggestion'>
                             <div className="fd-filter-suggestions-deal" > 
                             {showDealer? showDealerList.map((val)=>{
                              return  <div style={{fontWeight:"600"}} className='fd-filter-suggestions-item' onClick={()=>{pasteDealerName(val.user_name)}}>{val.user_name}</div>})
                           :""                            
                            }
                              </div>
                               </div>}  
                        </div>
                        </ClickAwayListener>
                        
                        <div className='shd-inv-sect'><button className={showinventory?'shd-bt-inv1':"shd-bt-inv"}
                         onClick={()=>setshowInventory(!showinventory)}>
                            {showinventory?<BsCheck className='shd-chl-ico'/>:<BiRadioCircle className='shd-rad-ico'/>}</button>
                             <span style={{fontSize:"14px"}}> Only show dealers with new inventory</span></div>
                    </div>
                    <hr className='shd-hr' />
                    <div className='shd-sidemenu-opt'>
                        <button className='ref-srch' onClick={()=>refineSearch()}>REFINE SEARCH</button>
                    </div>
                    </div> 
                    </div>
                </div>
                <div className='shd-Dealers'>
                <div className='shd-Dealers-sect'>
                    <div className='shd-Dealers-sect-sub'>
                         <div className='shd-Dealers-header' style={{zIndex:"2"}}>
                             <h3 className='shd-Dealers-header-h '>New & Used Car Dealers in {LocName}</h3>
                             <div className='shd-Dealers-header-sect shd-mg-bott'>
                                <span>Showing {initialRecord <=showDealerList.length ?initialRecord:""}- {lastlRecord <=showDealerList.length ?lastlRecord:showDealerList.length} of {showDealerList.length}</span>
                                <select name="" id="" className='shd-filter-list'>
                                    <option value="">Sort By</option>
                                    <option value="">Name A-Z</option>
                                    <option value="">Name Z-A</option>
                                    <option value="">Closest to me</option>
                                </select>
                            </div>
                       
                       
                         </div>

                    {displayusers}
                    {showDealerList.length>10 ?<div>
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
            {
        showModal?<div class="my-modal  fade-bg"  tabindex="-1">
        <div class="modal-dialog" style={{maxWidth:"420px"}}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you really wanto Delete This User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setshowModal(false)}}></button>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  onClick={()=>{setshowModal(false)}}>Cancel</button>
              <button type="button" class="btn btn-primary" onClick={()=>{DeleteUser(UserDeleteId)}}>Delete Listing</button>
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
