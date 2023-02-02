import React, { useEffect } from 'react'

import   "../Mystyles/headerMain.css";
import   '../Mystyles/buyFromHome.css';
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import {IoPerson} from "react-icons/io5";
import banner_image from "../images/logo-wordmark.svg"
import PropTypes from 'prop-types'
import { Link,useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import Axios  from 'axios';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {RESET_ACTION} from '../actions/index';
import myStore from '../store';
import { useCookies } from 'react-cookie';


export default function AppHeader(props) {
  var Item;
  const [logIn,setLogIn]=useState(false);
  const [userName,setuserName]=useState(false);
  const [usertype,setusertype]=useState("");
  const [searchToggle,setsearchToggle]=useState("");
  const [searchkeyword,setsearchkeyword]=useState("");
  const [makes, setmakes] = useState([]);
  
   
 
  const navigate = useNavigate();
   useEffect(()=>{
  Item = JSON.parse(localStorage.getItem('dataItems'));
  
 if(Item != null)
 {
  console.log("first"+Item);
 
    Axios.get("http://localhost:3010/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
      if(res.data.auth)
       {
         setLogIn(true);
         setuserName(Item["username"]);
         setusertype(Item["usertype"]);
       }
     });
    }
    
  Axios.get("http://localhost:3010/categories/makes").then((res1)=>{
    setmakes(res1.data);
    console.log(res1.data);
  });

},[]);

const myState=useSelector((state)=>state.SetUserData);
const myDispatch=useDispatch();
const SignOut =()=>{
  console.log("its working"+Item);
  const currentURL = window.location.href // returns the absolute URL of a page

  const pathname = window.location.pathname //returns the current url minus the domain name
  
  localStorage.removeItem('dataItems');
  myStore.dispatch(RESET_ACTION);
  setLogIn(false);
  Axios.post("http://localhost:3010/users/Logout",{pathname: pathname}).then((res1)=>{
    
    console.log(res1.data);
  });
  navigate("/");
}
const SignOut_team =()=>{
  console.log("its working"+Item);
  localStorage.removeItem('dataItems');
  myStore.dispatch(RESET_ACTION);
  setLogIn(false);
  Axios.post("http://localhost:3010/Logout").then((res1)=>{
    
    console.log(res1.data);
  });
  navigate("/carpages-team/login");
}

const diagnoseKey=(e)=>
{
  if(e.key === "Enter")
  {
    
    navigate('/SearchBarResults',{state:{keyWord:e.target.value}});
  }
}
console.log("USERTYPE"+usertype+"logIn"+logIn+"userName"+userName);
  return (
    
   <div className='header-Border'>
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{width:"80%",margin:"0px auto"}}>
    <div className="container-fluid" style={{margin:"0px auto"}} >
      <Link to="/" className="navbar-brand" href="#"><img src={banner_image} className="home_banner_capages" alt=""  /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/*<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >*/}
       <div className='navbar-ul-opt'>
        <ul className="navbar-nav ms-auto  mb-2 mb-lg-0" >
        
          <li  className="option_look">
            <a className="nav-link  dropdown-toggle"  href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              BUY A VEHICLE
            </a>
            <ul className="dropdown-menu"  aria-labelledby="navbarDropdown" style={{left:"-150%",marginTop:"16px"}}>
              <div style={{padding:"0 16px"}}>
            <label  > Browse by Make</label>
                <div className='show-info' style={{textAlign:"left"}}>
                {
                 <ul className='multi-list' style={{padding:"0",columns:"3"}}>
                 {
                   makes.map((val)=>{
                     return (
                     <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsMake/"+val.makes_name}} target="_blank">{val.makes_name}</Link></li>
                     )
                   })
                 }
                 </ul>}
                    
                  
                </div>
                </div>
                <div style={{padding:"0 16px"}}>
            <label  > Browse by BodyStyle</label>
                <div className='show-info' style={{textAlign:"left"}}>
                {
                 <ul className='multi-list' style={{padding:"0",columns:"3"}}>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Convertible"}} target="_blank">Convertible</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Sedan"}} target="_blank">Sedan</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Coupe"}} target="_blank">Coupe</Link></li> 
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/SUV"}} target="_blank">SUV</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Hatchback"}} target="_blank">Hatchback</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Pickup"}} target="_blank">PickUp</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Van"}} target="_blank">Van</Link></li>
                 <li style={{padding:"8px 32px 8px 0"}} ><Link to={{pathname:"/searchResultsClass/Crossover"}} target="_blank">Crossover</Link></li>
                 </ul>}
                    
                  
                </div>
                </div>
            </ul>
          </li>
          <li  className="option_look" >
            <Link to="/finddealer" className="nav-link"  tabIndex="1" aria-current="page" aria-disabled="false"><fieldset>FIND A DEALER</fieldset></Link>
          </li>
          <li  className="option_look">
            <a className="nav-link " aria-current="page" href="https://www.carpages.ca/insurance/">GET INSURANCE</a>
          </li>
          <li  className="option_look">
            <a className="nav-link "  href="https://www.carpages.ca/financing/">GET FINANCING</a>
          </li>
        

        <div className='account-border'>
        <li className='nav-item dropdown'>
        <a className="account nav-link" id="login" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"  ><IoPerson style={{fontSize:"20px"}}></IoPerson></a>
        
        {logIn  ? <ul className="dropdown-menu"  style={{width:"250px",marginTop:"15px",zIndex:"23"}} aria-labelledby="navbarDropdown" id="dropdown-overrides"  data-bs-popper="false" >
         <div style={{zIndex:"3",padding:"8px"}}>
               <div style={{display:"flex",flexFlow:"column",width:"100%",marginBottom:"8px", padding:"8px",borderRadius:"4px",backgroundColor:"rgba(0,153,0,.05)",justifyContent:"center"}}>
                <span style={{textAlign:"center",marginBottom:"8px"}}><IoPerson style={{fontSize:"25px",}}></IoPerson></span>
                <span style={{textAlign:"center",marginBottom:"8px"}}>{userName}</span>
               </div>
              <li ><Link to="/user/Watchlist" className="dropdown-item" style={{display:"flex",padding:"5px 8px",borderRadius:"4px"}}>Watchlist</Link></li>
              <li><Link to="/user/Setting" className="dropdown-item" style={{display:"flex",padding:"5px 8px",borderRadius:"4px"}} href="#">Setting</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a  className="dropdown-item" style={{display:"flex",padding:"5px 8px",borderRadius:"4px"}}  role="button" onClick={()=>SignOut()}>Sign Out</a></li>            
              </div>
            </ul>:
          <ul className="dropdown-menu" style={{width:"250px",marginTop:"15px",zIndex:"23"}} aria-labelledby="navbarDropdown" id="dropdown-overrides"  data-bs-popper="false" >
         <div style={{zIndex:"3",padding:"8px"}}>
              <li ><Link to="/signin" className="dropdown-item" style={{display:"flex",padding:"5px 8px",borderRadius:"4px"}}>Watchlist</Link></li>
              <li><Link to="/signin" className="dropdown-item" style={{display:"flex",padding:"5px 8px",borderRadius:"4px"}} >Setting</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link to="/signin" className="buyFromHome-findout" style={{display:"flex",textDecoration:"none",justifyContent:"center",padding:"7px 20px",textAlign:"center"}}  role="button" >Sign In</Link></li>            
              </div>
            </ul>}
          
          
            </li>
            
        </div>
        </ul>
        </div>
        <div className='searchConent1'>
          <div  className={searchToggle?'searchBar searchBar-active searchBar-trans':'searchBar searchBar-trans'}>
            <div style={{display:"flex",flex:"1 1 auto",flexDirection:"row"}}>
        <button  className="search__button"  type="submit" onClick={(e)=>{setsearchToggle(!searchToggle)}}  ><BsSearch></BsSearch></button>
          <div style={{display:"flex",flex:"1 1 auto",justifyContent:"center",marginLeft:"8px"}}>
          <input id="siteSearch" onKeyDown={(e)=>{diagnoseKey(e)}} className="searchBoxInput" type="search" placeholder="Enter Your Search" aria-label="Search"/> 
          <button  className="close__button" onClick={(e)=>{setsearchToggle(!searchToggle)}}  ><GrClose></GrClose></button></div>
         </div>
        </div>
        </div>
     {/* </div>*/}
     
    </div>
    
  </nav>
    
  </div>
  
  )
    

}