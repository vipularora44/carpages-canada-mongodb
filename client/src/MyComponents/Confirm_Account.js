import React, {useContext, useEffect}  from 'react'
import FooterMain from './FooterMain'
import banner_image from "../images/logo.svg";
import header_logo from "../images/logo-wordmark.svg";
import  '../Mystyles/confirm_accountstyle.css'
import "../Mystyles/signup.css"
import "../Mystyles/headerMain.css"
import { SignupContext } from '../Context/SignupContext';
import {useLocation, Link } from 'react-router-dom';
import {IoPerson} from "react-icons/io5";
import {IoHome} from 'react-icons/io5' ;
import Axios from 'axios';
export default function Confirm_Account() {
 // const { userName } = useContext(SignupContext);
  const {setmail} = useContext(SignupContext);
  const location = useLocation();
  const state = location.state;
  /*
  
  {
    User_email:"vipularora44@gmail.com",
  };
  
  */
  //console.log("///"+state.User_email+"***");
  console.log(useContext(SignupContext));
 
 useEffect(()=>{
  if(state.User_email !="")
  {
    Axios.post("http://localhost:3001/users/signIn",{Email:state.User_email} ).then ((response1) =>{
      console.log(response1);
      
   });
  }
  
 },[])

  return ( 
  
    <div className='signup-bg' style={{maxWidth:"1519.2px"}}>
       <div className='cfa-header header-Border'>
         <div className='cfa-header-0'>
           <div className="cfa-header-1">
              <div className='cfa-header-banner' >
                  <img src={header_logo} alt="" className='home_banner_capages' />
              </div>
              <div className='cfa-header-nav'>
                <Link to={"/signin"} className="cfa-header-nav-loginic"><IoPerson ></IoPerson></Link>
                <Link to={"/"} className="cfa-header-nav-homeic"><IoHome ></IoHome> </Link>
              </div>
           </div>
           </div>
       </div>
      <div className='signup-container fade-bg'>
        <div className='signup-row'>
          <div className='col-small'>
            <div className='form-signup-cont' >
             <div className='align-center signup-banner'>
               <img src={banner_image}  style={{height:"100px",width:"250px"}} alt="" />
             </div>
              <div>
                <span style={{fontSize:"40px",fontFamily:"revert",fontWeight:"400"}} className='align-center signup-in-field'>Confirm Your Account</span>
              </div>
              <hr/>
              <div>
                <p  style={{textAlign:"center"}}>
                You're almost there! We've sent an email to <strong style={{color:"red"}}> {state.User_email !==""?state.User_email:""}</strong> to confirm your account.
                </p>
              </div>
            </div>
         </div>
        </div>
      </div>
      <div style={{marginTop:"-5rem"}}>
          <FooterMain></FooterMain>
          </div>
    </div>
    
  )
}
