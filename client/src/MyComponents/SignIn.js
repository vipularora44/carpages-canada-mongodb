import React ,{useEffect, useState} from 'react'
import  '../Mystyles/loginstyle.css';
import bg from '../images/lo-si.jpg'
import banner_image from "../images/logo-wordmark.svg";
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import {UserloginInput} from '../actions/index';

export default function SignIn() {
  Axios.defaults.withCredentials=true;

  


  const inpStyle= 
  {
    width:"100%",border:"1px solid lightGray",borderRadius:"4px",padding:" 0.3em 1em",outline:"none"
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState(false);
  const [data, setData] = useState(false);
  const navigate = useNavigate();

  const MyLocation=useLocation();
  const MyState=MyLocation.state;
  console.log("MyState"+JSON.stringify(MyState));
  console.log(email+"..."+password);
  
  useEffect(()=>{

    console.log("kidan");
    

    if(MyState)
  {
    setEmail(MyState.email);
  }
  },[] );
console.log("loginStatus..."+loginStatus);
  const myState=useSelector((state)=>state.SetUserData);
  const myDispatch=useDispatch();
  const login =()=>{
   // console.log("working"+email+password);
     Axios.post("http://localhost:3010/users/signIn", 
     {Email:email,passWord:password}).then(
       (res)=>{
        console.log(res.data.message+"***"+res.data);
        if(!res.data.auth && res.data.message ==="Wrong Username and Password" )
        {
             setData(true);
           
        }
              
        else if(!res.data.auth && res.data.message === "User Doesn,t Exist")
        {
           
           alert("User Doesn,t Exist");
        }
       else if(res.data.result[0].user_id !="")
        {
           console.log("else..."+JSON.stringify(res.data));
           const items={"userId":res.data.result[0].user_id,"username":res.data.result[0].user_name,"usertype":res.data.result[0].user_type,"token":res.data.token};
           myDispatch(UserloginInput(res.data));
           localStorage.setItem("dataItems",JSON.stringify(items));
           navigate("/");
        }
        
      })
  };

  return (
    
    <div  className='login-bg' >
     
    <div className='login-container fade-bg'>
      <div className='login-row'>
        <div className='col-small'>
          <div className='form-login-cont' >
            <div className='align-center login-banner'>
            <img src={banner_image}  style={{height:"30px",width:"150px"}} alt="" />
              </div>
            <h4 className='align-center'>Sign In to your account</h4>
           {data ? <div className='details-alert align-center'>
              <p className='details-alert-p'>Wrong Email & Password!</p>
            </div>:""}
               <div className='log-form-cont'>
              <div className='fields' style={{marginRight:"20px"}} >
              <div className='et-pass'>
              <label htmlFor="" style={{fontWeight:"700",marginBottom:"4px"}}>Email</label>
              <Link to="/forgot-password/email" style={{textDecoration:"none",fontFamily:"inherit",paddingTop:"4px",fontSize:"12px"}}>Forgot Email?</Link>
              </div>
                  <div className='login-in-field'>
                  <input type="text"  style={inpStyle} defaultValue={email} onChange={(e)=>{
                    setEmail(e.target.value);
                  }}/>
                  </div>
              </div>
              <div className='fields'>
                <div className='et-pass'>
              <label htmlFor="" style={{fontWeight:"700",marginBottom:"4px"}}>Password</label>
              <Link to="/forgot-password/password" style={{textDecoration:"none",fontFamily:"inherit",fontSize:"12px",paddingTop:"4px"}}>Forgot Password?</Link>
                </div>
                  <div className='login-in-field'>
                  <input type="password" name="\" id="" style={inpStyle} onChange={(e)=>{
                    setPassword(e.target.value);
                  }}/>
                  </div>
              </div>
              </div>
              <button style={{padding:" 0.5em 1em",fontWeight:"500",backgroundColor:"#5cb35d",color:"white",borderRadius:"3px",
              border:"none",width:"100%"}} onClick={()=>{
                login()
              }}>
                Sign In</button>
              
              <hr />
              <p style={{display:"flex",flexDirection:"row",flex:"1 1 auto",width:"100%",fontSize:"15px",justifyContent:"center" }}>
                <span >New to Carpages.ca? </span>
                <Link to={"/signup"} style={{marginLeft:"10px",textDecoration:"none"}}>Sign up for an account</Link>
                
              </p>
             
          </div>
        </div>
        <div className='cardd'>
          <div className='fade-bg card-muted' style={{display:"flex",flexDirection:"column",alignItems:"center",fontSize:"10px"}}>
            <p style={{margin:"0"}}>
            Copyright © 2003-2022 Carpages.ca (div. of Autopath Technologies Inc.), All Rights Reserved.
            </p>
            <a href="" style={{textDecoration:"none"}}>
            Back to Carpages.ca
            </a>
          </div>
        </div>
      </div>
    </div>
       
    </div>
  )
}
 