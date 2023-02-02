import React, { useState } from 'react'
import Sidebar from './Sidebar'
import SubMenu from './SubMenu';
import '../Mystyles/Pagestyles/sidebar.css'
import { SidebarData } from './SidebarData';
import {IoPerson} from 'react-icons/io5'
import {BiSearchAlt} from 'react-icons/bi'
import {IoHome} from 'react-icons/io5'
import styled from 'styled-components'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import "../Mystyles/headerMain.css";
import "../Mystyles/admintabs.css";
import * as FaICons from 'react-icons/fa'
import * as AiICons from 'react-icons/ai'
import * as IoICons from 'react-icons/io'
import * as RiICons from 'react-icons/ri'
import header_logo from "../images/logo-wordmark.svg";
import DashBoard from '../Pages/DashBoard';
import Categories from '../Pages/Categories';
import AppHeader from './AppHeader';
import { useEffect } from 'react';
import Axios  from 'axios';





export default function Admin(props) {

  
  const [pages , setPage] = useState("1");
  const [usertype,setusertype]=useState("");
  var Item;
  const navigate = useNavigate();
  useEffect(()=>{
    Item = JSON.parse(localStorage.getItem('dataItems'));
    if(Item != null)
     {
     console.log("first"+Item);
      Axios.get("http://localhost:3001/users/isUserAuthenticated",{headers:{"x-access-token":Item["token"]},}).then((res)=>{
        console.log("Response"+JSON.stringify(res));
      if(res.data.auth===true)
       {
        console.log("IF");
         setusertype(Item["usertype"]);
       }
       else if(res.data.auth===false)
       {
        console.log("IFFF ELSE");
        NavigateTO("/signin")
       }
      
       });
      }
     
  },[])


  const handlePage = (event) =>
  {
    setPage(event);

  }
 const NavigateTO=useNavigate();

  return (

    <>
    <AppHeader></AppHeader>
      <div style={{ backgroundColor: "lightgrey" }}>

       


        <div style={{ display: "flex", flex: "1 1 auto", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "100vh" }}>


          <div style={{ display: 'flex', backgroundColor: "white", flex: "1 1 auto", flexDirection: "column", padding:"8px", width: "22%" }}>
            
           {/* <*/}
          
          <div style={{width:"100%",height:"90vh"}}>
   <div class="accordion" id="accordionExample">

   <div class="accordion-item" style={{}}>
    <div className='accd-cont2' >
    <div className='accd-bt-ct useless' >
    <div className='accd-bt-ctdiv' ><FaICons.FaQuestionCircle/></div> 
      <button  className='accd-btself useless' onClick={()=>{setPage("1")}}>Dashboard
      </button>
      </div>
      </div>
  </div>
  <div class="accordion-item" style={{}}>
    <div className='accd-cont2' >
    <div className='accd-bt-ct useless' >
    <div className='accd-bt-ctdiv' ><BiSearchAlt size={20}/></div> 
      <button  className='accd-btself useless' style={{marginLeft:"-5px"}}  onClick={()=>{NavigateTO("/SearchBarResults")}}>Search Here
      </button>
      </div>
      </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button  class="accordion-button useless collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
      <div style={{marginRight:"30px"}}><FaICons.FaShoppingCart/></div> Listings
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    <div className='accd-cont1 lst-item-divbg'>
        <div className='accd-cont2' >
            <ul  className='accd-ul'>
            <div  className='accd-lst-st'><div className='accd-ic-st' ><IoICons.IoIosPaper/></div> <li value="3" onClick={()=>{NavigateTO("/searchResults/private")}}>Private</li></div>
            <hr className='accd-linehr'/>
            <div className='accd-lst-st'><div className='accd-ic-st' ><IoICons.IoIosPaper/></div> <li value="4" onClick={()=>{NavigateTO("/searchResults/dealer")}}>Dealers </li></div>
            </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button useless collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <div style={{marginRight:"30px"}}><FaICons.FaShoppingCart/></div> Products
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <div className='accd-cont1 lst-item-divbg'>
        <div className='accd-cont2' >
            <ul  className='accd-ul'>
            <div  className='accd-lst-st'><div className='accd-ic-st' ><FaICons.FaCartArrowDown/></div> <li value="3" onClick={(e)=>{window.open("https://www.carpages.ca/buy-from-home/",'_blank','')}}>Buy From Home</li></div>
            <hr className='accd-linehr'/>
            <div className='accd-lst-st'><div className='accd-ic-st' ><RiICons.RiShoppingCartFill/></div> <li value="4" onClick={(e)=>{window.open("https://www.carpages.ca/insurance/",
                    '_blank',
                    '')}}>Insurance </li></div>
            <hr className='accd-linehr'/>
            <div className='accd-lst-st'><div className='accd-ic-st' ><RiICons.RiShoppingCartFill/></div> <li value="5" onClick={(e)=>{window.open("https://www.carpages.ca/financing/",'_blank','')}}>Financing </li></div>
            </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button useless collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <div style={{marginRight:"30px"}}><IoICons.IoIosPaper/></div>User Reports
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div className='accd-cont1 lst-item-divbg'>
        <div className='accd-cont2' >
            <ul  className='accd-ul'>
            <div  className='accd-lst-st'><div className='accd-ic-st' ><IoICons.IoIosPaper/></div> <li value="6" onClick={()=>{NavigateTO("/showDealer/dealer")}} >Dealers</li></div>
            <hr className='accd-linehr'/>
            <div className='accd-lst-st'><div className='accd-ic-st' ><IoICons.IoIosPaper/></div> <li value="7" onClick={()=>{NavigateTO("/showDealer/private")}}>Private</li></div>
            </ul>
        </div>
      </div>
    </div>
  </div>
 
  
  
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingSeven">
      <button class="accordion-button useless collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven"
     
      >
      <div style={{marginRight:"30px"}}><FaICons.FaEnvelopeOpenText/></div> Miscelleanoius
      </button>
    </h2>
    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
    <div className='accd-cont1 lst-item-divbg'>
        <div className='accd-cont2' >
            <ul  className='accd-ul'>
            <div  className='accd-lst-st'>
             <div className='accd-ic-st' >
             <FaICons.FaEnvelopeOpenText/>
             </div>
             <li  value="13" onClick={(e)=>{handlePage(e.target.value)}}>Categories</li>
             </div>
            <hr className='accd-linehr'/>
            <div className='accd-lst-st'>
            <div className='accd-ic-st' >
            <FaICons.FaEnvelopeOpenText/>
            </div>
            <li value="14" onClick={(e)=>{NavigateTO("/dealer_signup")}} >Create Dealer Account</li>
            </div>
            {usertype==="admin"? <hr className='accd-linehr'></hr>:""}
            {usertype==="admin"?
            <div className='accd-lst-st'>
            <div className='accd-ic-st' >
            <FaICons.FaEnvelopeOpenText/>
            </div>
            <li value="14" onClick={(e)=>{NavigateTO("/create-team-account")}} >Create Employee Account</li>
            </div>:""}
           </ul>
        </div>
      </div>
    </div>
  </div>
</div>
    
</div>        
          
           </div>
          
          <div style={{
            flex: "0 0 auto", background: "white", padding: "8px", width: "75%", alignItems: "center", justifyContent: "center",
            overFlow: "hidden"
          }}>

                {pages==13 ?<div className='main-cont2'>
                   <Categories/>    
                </div>: null}
                {pages==1 ?<div className='456'>
                <DashBoard/>
                       
                </div>: null}
               
          </div>
         

        </div>
      </div>
    </>
  )
}
