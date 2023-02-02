import React,{useState} from 'react'
import app from '../FireBase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, updatePassword  } from "firebase/auth";
import '../Mystyles/forgot_password.css'
import banner_image from "../images/logo-wordmark.svg";
import phoneGif from "../images/account-recovery-sms-pin.gif";
import Axios from 'axios'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import validator from 'validator'
import { async } from '@firebase/util';

const auth = getAuth(app);
//Auth.auth().settings.isAppVerificationDisabledForTesting = TRUE


export default function ForgotPassword() {


    const [showSection,setshowSection]=useState("");
    const [phoneNumber,setphoneNumber]=useState("");
    const [userId,setuserId]=useState("");
    const [GetaltphoneNumber,setGetaltphoneNumber]=useState("");
    const [email,setemail]=useState("");
    const [Getemail,setGetemail]=useState("");
    const [fullName,setfullName]=useState("");
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [TfirstName,setTfirstName]=useState("");
    const [TlastName,setTlastName]=useState("");
    const [getData,setgetData]=useState([]);
    const [password,setpassword]=useState("");
    const [re_password,setre_password]=useState("");
    const [otp,setotp]=useState("");
    const [otp_1,setotp_1]=useState("");
    const [error,seterror]=useState("");
    const [confirmOTP,setconfirmOTP]=useState("");
    const {what}=useParams();
    const navigate=useNavigate(); 
   useEffect(()=>{
    if(what==="email")
    {
     setshowSection("1");
    }
    else if(what==="password")
    {
     setshowSection("5");
    }
   },[what])
   
   
   

    const getRecord=()=>
    {
      if(phoneNumber !=="" && validator.isMobilePhone(phoneNumber))
      {
        Axios.post("http://localhost:3010/users/forgotCredentials", 
        {phone_number:phoneNumber}).then(
        (res)=>{
          console.log(res.data);
          setgetData(res.data);
          console.log("1.."+res.data[0].user_name);
          if(res.data[0].user_name)
          
          { console.log("2.."+res.data[0].user_name);
            
            setfullName(res.data[0].user_name);
            setGetemail(res.data[0].user_email);
            
            setshowSection("2");
          }
          else if(!res.data[0].user_name)
          { 
            alert("Please Check Your No / User Doesn,t exist");
          }
       });
      }
      else if(phoneNumber !=="")
      {      
        alert("Please Enter Phone Number First");
      }
      
    }

    const getRecord_pass=(e)=>
    {
      if(phoneNumber !=="" && validator.isMobilePhone(phoneNumber))
      {
        Axios.post("http://localhost:3010/users/forgotCredentials", 
        {phone_number:phoneNumber}).then(
        (res)=>{
          console.log(res.data);
          setgetData(res.data);
          console.log("1.."+res.data[0].user_name);
          if(res.data[0].user_contactno===phoneNumber || res.data[0].alternate_contact===phoneNumber)
          
          { 
            setuserId(res.data[0].user_id);
            onSignSubmit_2(e);
            
          }
          else if(!res.data[0].user_name)
          { 
            alert("Please Check Your No / User Doesn,t exist");
          }
       });
      }
      else if(phoneNumber !=="")
      {      
        alert("Please Enter Phone Number First");
      }
      
    }



    const getRecordByEmail=()=>
    {
      if(email !=="" && validator.isEmail(email))
      {console.log("Email.."+email);
        Axios.post("http://localhost:3010/users/forgotCredentials", 
        {email:email}).then(
        (res)=>{
          if(res.data)
          {
            console.log(res.data);
            setgetData(res.data);
            
            if(res.data[0].user_email === email)
            
            { console.log("2.."+res.data[0].user_name);
            setfullName(res.data[0].user_name);
              generateOTP();
              setshowSection("11");
            }
          }
          else
          { 
            alert("Please Check Your email / User Doesn,t exist");
          }
         
         
       });
      }
      else if(phoneNumber !=="")
      {      
        alert("Please Enter Email First");
      }
      
    }

   console.log("showSection"+showSection);
    useEffect(()=>{
      
      if(fullName)
      {
       const space1=fullName.indexOf(" ");
       console.log("space1"+space1);
       const fName=fullName.substring(0,space1);
       const lName=fullName.substring(space1+1,fullName.length);
       console.log("fName"+fName+"lName"+lName);
       setfirstName(fName);
       setlastName(lName);
      }
    },[fullName])
    const FindName=()=>
    {
      console.log("TfirstName..."+TfirstName.toLowerCase() );
      console.log("firstName..."+firstName.toLowerCase() );
      console.log("TlastName..."+TlastName.toLowerCase() );
      console.log("lastName..."+lastName.toLowerCase() );
        if(TfirstName.toLowerCase() === firstName.toLowerCase() && TlastName.toLowerCase() === lastName.toLowerCase())
        {
           setshowSection("3");
        }
        else if(TfirstName.toLowerCase() !== firstName.toLowerCase() && TlastName.toLowerCase() === lastName.toLowerCase())
        {
          alert("Wrong First Name");
        }
        else if(TfirstName.toLowerCase() === firstName.toLowerCase() && TlastName.toLowerCase() !== lastName.toLowerCase())
        {
          alert("Wrong Last Name");
        }
   
    }

    function onCaptchaVerify(e)
    {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{}, auth);
      recaptchaVerifier.render(); 
      return signInWithPhoneNumber(auth, e, recaptchaVerifier)
    }
    const  onSignSubmit=async (e) =>
    {
      e.preventDefault(); 
      
      const showme = await onCaptchaVerify("+91"+phoneNumber);
      console.log(showme.verificationId );
      setconfirmOTP(showme);
      if(showme.verificationId )
      {
           setshowSection("4");
      }
      
     }

     function onCaptchaVerify_2(e)
    {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{}, auth);
      recaptchaVerifier.render(); 
      return signInWithPhoneNumber(auth, e, recaptchaVerifier)
    }

     const  onSignSubmit_2=async (e) =>
    {
      e.preventDefault(); 
      
      const showme = await onCaptchaVerify_2("+91"+phoneNumber);
      console.log(showme.verificationId );
      setconfirmOTP(showme);
      if(showme.verificationId )
      {
           setshowSection("9");
           
      }
      
     }

     function verifyOTP()
     {
      if(otp ==="" && otp===null)
      {
         alert("wrong otp");
      }
      else
      {
        confirmOTP.confirm(otp);
        navigate("/signin",{state:{email:Getemail}})
      }

     }
     const  verifyOTP_2 = async() =>
     {
      if(otp ==="" && otp===null)
      {
         alert("wrong otp");
      }
     
        try
        {
          seterror("")
         await confirmOTP.confirm(otp);
          setshowSection("10");
        }
        catch(err)
        {
          seterror(err);
          alert(err);
        }
        
      

     }

     const checkfocusOut=()=>
     {
       
       if(password.length > 0 )
       {
        console.log(password+"...checkfocusOut..."+re_password );
        if(re_password !== password)
        {
          alert("pasword not matched")
        }
       }
     }

     let OTP12 = '';
     function generateOTP() {
          
      // Declare a digits variable 
      // which stores all digits
      var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
      
      for (let i = 0; i < 6; i++ ) {
        var X=Math.floor(Math.random() * digits.length)
          OTP12 += digits[X];
      }

     Axios.post("http://localhost:3010/users/otpEmail",{email:email,otp:OTP12,fullName:fullName}).then((res)=>{
        console.log(res.data);
        
      });
      console.log("OTP..."+OTP12);
      setotp(OTP12);
     
  }

setTimeout(() => {
  setotp("");
},180000);
console.log("OTP....."+otp);


function updatePassword()
{if(re_password === password)
  {
    Axios.post("http://localhost:3010/users/updatePassword",{userId:userId,user_pass:re_password}).then((res)=>{
      console.log(res.data);
      
    });
  }

}
const verifyOTP_byEmail=()=>
{
   if(otp_1 === otp)
   {
    setshowSection("10");
   }
}
   
  return (
    <>
   <div className='main_' >
   <div className='main-sect'>
    <div className='main-sect-sub'>
      <div  style={{padding:"16px"}}>
               <div className='align-center login-banner' style={{marginTop:"20px"}}>
                    <img src={banner_image}  style={{height:"25px",width:"120px"}} alt="" />
                </div>
      {showSection==="1"? <div>
                
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Find your email</h3>
                  <p style={{fontSize:"18px"}}>Enter your phone number or alternate phone number</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="number" class="form-control" id="floatingInput" placeholder="9780548602" onChange={(e)=>{setphoneNumber(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Phone Number</label>
                </div>
                <div style={{margin:"20px 15px 0 0"}}>
                  <button className='next-btn' onClick={()=>{getRecord()}}>Next</button>
                </div>
                </div>
       </div>:""}

               { showSection==="2"?<div>
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >What’s your name?</h3>
                  <p style={{fontSize:"18px"}}>Enter the name on your Carpages Account</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{setTfirstName(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>First Name</label>
                </div>
                </div>

                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{setTlastName(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Last Name</label>
                </div>
                <div style={{margin:"20px 15px 0 0"}}>
                  <button className='next-btn' onClick={()=>{FindName()}}>Next</button>
                </div>
                </div>

                </div>:""}
                
                { showSection==="3"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Get a verification code</h3>
                  <p style={{fontSize:"18px"}}>Enter the name on your Google Account</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div className='align-center ' >
                    <img src={phoneGif}  style={{}} alt="" />
                </div>
                </div>

                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <h5>Get a verification code</h5>
                  <p style={{fontSize:"18px"}}>carpages will send a verification code to <span>{phoneNumber}</span> Standard rates apply.</p>
                <div style={{margin:"20px 15px 20px 0",height:"80px"}}>
                  <button className='next-btn'onClick={(e)=>{onSignSubmit(e)}}>Send</button>
                </div>
                <div id='recaptcha-container'></div>
                </div>

                </div>:""}

                { showSection==="4"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Enter the code</h3>
                  <p style={{fontSize:"17px",fontWeight:"400"}}>To help keep your account safe, Carpages wants to make sure it’s really you trying to sign in</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px",fontWeight:"400"}}>
                  <p style={{fontSize:"16px"}}>A text message with a 6-digit verification code was just sent to <span>{phoneNumber}</span></p>
                
                </div>
                <div class="form-floating container-sm">
                    <input type="number" class="form-control" id="floatingInput"  onChange={(e)=>{setotp(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter OTP Here</label>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div style={{margin:"20px 15px 20px 0"}}>
                  <button className='next-btn'onClick={(e)=>{verifyOTP()}}>Verify OTP</button>
                </div>
                
                </div>

                </div>:""}

                {showSection==="5"? <div>
                
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Reset your password</h3>
                  <p style={{fontSize:"18px"}}>Enter your Email </p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{setemail(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Email</label>
                </div>
                <div style={{margin:"20px 15px 0 0"}}>
                  <span className='try-other-way' onClick={()=>{setshowSection("8")}}>Try another way</span>
                  <button className='next-btn' onClick={()=>{getRecordByEmail()}}>Next</button>
                </div>
                </div>
       </div>:""}

       {showSection==="6"? <div>
                
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Account recovery</h3>
                  <p style={{fontSize:"18px"}}> To help keep your account safe, carpages wants to make sure it’s really you trying to sign in</p>
                </div>
                <p>An email with a verification code was just sent to your {email?email:""} </p>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{setemail(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter Email </label>
                </div>
                <div style={{margin:"20px 15px 0 0"}}>
                  
                  <button className='next-btn' onClick={()=>{getRecordByEmail()}}>Next</button>
                </div>
                </div>
       </div>:""}


       { showSection==="7"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Enter the code</h3>
                  <p style={{fontSize:"17px",fontWeight:"400"}}>To help keep your account safe, Carpages wants to make sure it’s really you trying to sign in</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px",fontWeight:"400"}}>
                  <p style={{fontSize:"16px"}}>A text message with a 6-digit verification code was just sent to <span>{email}</span></p>
                
                </div>
                <div class="form-floating container-sm">
                    <input type="text" class="form-control" id="floatingInput"  onChange={(e)=>{setotp(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter OTP Here</label>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div style={{margin:"20px 15px 20px 0"}}>
                  <button className='next-btn'onClick={(e)=>{verifyOTP()}}>Verify OTP</button>
                </div>
                
                </div>

                </div>:""}
                { showSection==="8"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Reset your password</h3>
                  <p style={{fontSize:"18px"}}>Enter your phone number or alternate phone number</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div class="form-floating container-sm">
                    <input type="number" class="form-control" id="floatingInput" placeholder="9780548602" onChange={(e)=>{setphoneNumber(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Phone Number</label>
                </div>
                <div style={{margin:"20px 15px 0 0"}}>
                  <button className='next-btn' onClick={(e)=>{getRecord_pass(e)}}>Next</button>
                </div>
                <div style={{marginTop:"15px"}} id='recaptcha-container'></div>
                </div>

                </div>:""}
                { showSection==="9"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Enter the code</h3>
                  <p style={{fontSize:"17px",fontWeight:"400"}}>To help keep your account safe, Carpages wants to make sure it’s really you trying to sign in</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px",fontWeight:"400"}}>
                  <p style={{fontSize:"16px"}}>A text message with a 6-digit verification code was just sent to <span>{phoneNumber}</span></p>
                
                </div>
                <div class="form-floating container-sm">
                    <input type="number" class="form-control" id="floatingInput"  onChange={(e)=>{setotp(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter OTP Here</label>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div style={{margin:"20px 15px 20px 0"}}>
                  <button className='next-btn'onClick={(e)=>{verifyOTP_2()}}>Verify OTP</button>
                </div>
                
                </div>

                </div>:""}

                { showSection==="10"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Reset your password</h3>
                </div>

                <div class="form-floating container-sm">
                    <input type="number" class="form-control" id="floatingInput"  onChange={(e)=>{setpassword(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter Password</label>
                </div>
                <div class="form-floating container-sm" style={{marginTop:"16px"}}>
                    <input type="number" class="form-control" id="floatingInput" onBlur={()=>checkfocusOut()}  onChange={(e)=>{setre_password(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Re-Enter Password</label>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div style={{margin:"20px 15px 20px 0"}}>
                  <button className='next-btn'onClick={(e)=>{updatePassword()}}>Save Password</button>
                </div>
                
                </div>

                </div>:""}

                { showSection==="11"?<div >
                <div style={{textAlign:"center",fontWeight:"400"}}>
                  <h3 >Enter the code</h3>
                  <p style={{fontSize:"17px",fontWeight:"400"}}>To help keep your account safe, Carpages wants to make sure it’s really you trying to sign in</p>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px",fontWeight:"400"}}>
                  <p style={{fontSize:"16px"}}>A text message with a 6-digit verification code was just sent to <span>{phoneNumber}</span></p>
                
                </div>
                <div class="form-floating container-sm">
                    <input type="text" class="form-control" id="floatingInput"  onChange={(e)=>{setotp_1(e.target.value)}}/>
                    <label for="floatingInput" style={{fontSize:"18px",padding:"12px 24px"}}>Enter OTP Here</label>
                </div>
                <div style={{width:"100%",margin:"0 auto",marginTop:"20px"}}>
                <div style={{margin:"20px 15px 20px 0"}}>
                  <button className='next-btn'onClick={(e)=>{verifyOTP_byEmail()}}>Verify OTP</button>
                </div>
                
                </div>

                </div>:""}
       </div>
    </div>
        

   </div>
   
   
   
   </div>
   </>
  )
  }