import React ,{useEffect, useState} from 'react'
import  '../Mystyles/team_login.css';
import bg from '../images/lo-si.jpg'
import banner_image from "../images/logo-wordmark.svg";
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import {UserloginInput} from '../actions/index';
import {RESET_ACTION} from '../actions/index';
import myStore from '../store';
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
  var Item;
  const MyLocation=useLocation();
  const MyState=MyLocation.state;
  console.log("MyState"+JSON.stringify(MyState));
  console.log(email+"..."+password);
  const myState=useSelector((state)=>state.SetUserData);
  const myDispatch=useDispatch();
  useEffect(()=>{
    Item = JSON.parse(localStorage.getItem('dataItems'));
    console.log("kidan");
    Axios.get("https://carpages-canada-mongodb.onrender.com/users/signIn").then((res)=>{
      console.log(res);

      if(res.data.LoggedIn == true)
      {
        console.log("res.data.user.user_type"+ res.data.user.user_type);
        setloginStatus(true);
       if(res.data.user.user_type==="admin" || res.data.user.user_type==="employee")
       {
        navigate("/carpages-team");
        console.log("IFFF");
       }
       else if(res.data.user.user_type==="user" || res.data.user.user_type==="dealer")
       {
        console.log("IFFF ELSE");
        navigate("/");
       }
      }
      
      
      
    });

    if(MyState)
  {
    setEmail(MyState.email);
  }
  },[] );
console.log("loginStatus..."+loginStatus);
 
  const login =()=>{
   // console.log("working"+email+password);
     Axios.post("https://carpages-canada-mongodb.onrender.com/users/signIn",{Email:email,passWord:password}).then(
       (res)=>{
        console.log(res.data);
     //   console.log(res.data.message+"***"+JSON.stringify(res.data.result[0].is_verified));
       if(res.is_verified===false)
        {
           alert("Please confirm your Email First");
        }
        if(res.user_status==="block")
        {
           alert("Your Account is Disabled ,Please contact Carpages Team");
        }
        if(!res.auth && res.message ==="Wrong Username and Password" )
        {
             setData(true);
           
        }
              
        else if(!res.auth && res.message === "User Doesn,t Exist")
        {
           
           alert("User Doesn,t Exist");
        }
        else if(res.data.result.user_id !="")
        {
           
           const items={"userId":res.data.result.user_id,"username":res.data.result.user_name,"usertype":res.data.result.user_type,"token":res.data.token};
           myDispatch(UserloginInput(res.data));
           localStorage.setItem("dataItems",JSON.stringify(items));
           if(res.data.result.user_type==="admin" || res.data.result.user_type==="employee")
           {
            navigate("/carpages-team");
           }
           else if(res.data.result.user_type==="user" || res.data.result.user_type==="dealer")
           {
            navigate("/");
           }
        }
        
      })
  };

  return (
    
    <div  className='login-bg' >
     
    <div className='login-container fade-bg'>
      <div className='tl-login-row'>
        <div className='col-small'>
          <div className='tl-form-login-cont' >
            <div style={{display:"flex",flexFlow:"row",justifyContent:"space-between"}}>
            <span className='align-center' style={{color:"grey",fontSize:"25px",fontWeight:"300"}}>Sign In to your account</span>
            <div className='align-center login-banner'>
            <img src={banner_image}  style={{height:"25px",width:"120px"}} alt="" />
              </div>
           
            </div>
          
           {data ? <div className='details-alert align-center'>
              <p className='details-alert-p'>Wrong Email & Password!</p>
            </div>:""}
               <div className='tl-log-form-cont'>
              <div className='fields' style={{marginRight:"20px"}} >
              <div className='et-pass'>
              <label htmlFor="" style={{fontWeight:"700",marginBottom:"4px"}}>Email</label>
              <Link to="/forgot-password/email" style={{textDecoration:"none",fontFamily:"inherit",paddingTop:"4px",fontSize:"12px"}}>Forgot Email?</Link>
              </div>
                  <div className='login-in-field'>
                  <input type="text" className='tl-inpStyle'   defaultValue={email} onChange={(e)=>{
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
                  <input type="password" name="\" id="" className='tl-inpStyle'  onChange={(e)=>{
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
        <div className='cardd '>
          <div className='fade-bg-2 fade-bg card-muted' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",fontSize:"10px"}}>
            <p style={{display:"flex",flexDirection:"column",margin:"0",fontSize:"11px"}}>
            <span><strong style={{margin:"0",fontSize:"13px"}}>Copyright © 2003-2022 Carpages.ca </strong> </span>
            <span> (div. of Autopath Technologies Inc.)</span>
            <span> All Rights Reserved.</span>
            </p>
            <p><span style={{textDecoration:"none",fontWeight:"800",fontSize:"13px",cursor:"pointer",color:"#694eff"}} onClick={()=>{navigate("/")}}>
            Back to Carpages.ca</span>
            </p>
          </div>
        </div>
      </div>
    </div>
       
    </div>
  )
}
 