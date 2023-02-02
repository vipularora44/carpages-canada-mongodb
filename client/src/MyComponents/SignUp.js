import React ,{useState,useContext,useEffect} from 'react'
import  '../Mystyles/signup.css';
import { SignupContext } from '../Context/SignupContext';

import banner_image from "../images/logo-wordmark.svg";
import {Link ,useNavigate} from 'react-router-dom';
import FooterMain from './FooterMain.js';
import Axios from 'axios';
import { CgProfile } from "react-icons/cg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



export default function SignUp (props)  {

 
  
  console.log(useContext(SignupContext));
  
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [province, setprovince] = useState("");
  const [cityname, setcityname] = useState("");
  const [lotno, setlotno] = useState("");
  const [streetname, setstreetname] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [contactno, setcontactno] = useState("");
  const [altcontactno, setaltcontactno] = useState("");
  const [city_Data, setcity_Data] = useState([]);
  const [Image, setImage] = useState("");
  const [imageName, setimageName] = useState("Filename.jpg");
  const [modalImage, setmodalImage] = useState(false);
  const {data1} =useContext(SignupContext);
  const {setmail} = useContext(SignupContext);
  let any,many,pany,dany = "";
  var Address,state="";
  const navigate=useNavigate();
   const Myname={
    Name:"vipul",
    LastName:"Arora",
   };
  const justcheck= (e) =>{
    setemail (e);    
     console.log(e +"12345..." );
     };

  useEffect(()=>{
    Axios.get("https://carpages-canada-mongodb.onrender.com/users/getUsers").then((response) =>{
      console.log(response.data);
    // setsignUp_Data(response.data); 
  });
  },[]);

  const ChooseProvince =(e)=>
    {
        any =e.indexOf(",");
        pany=e.length;
        many=e.slice(any); 
        state=e.substring(any+2,pany);
        //alert(state);
        setprovince(e);
    }
   console.log("Province"+province);
    const choosePic= (e) =>
    {
      console.log(e.target.files[0] +"****");
      if (e.target.files[0])
      {
        setImage(e.target.files[0]);
        setimageName(e.target.files[0].name);
        setmodalImage(true);    
      }
      
    };
    const showPic =(e)=>
    {
        setmodalImage(e);
    };
  const submitDetails = ()=>{
    const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded',}};
  
     
    //navigate('/confirm_account');
    
    console.log("DATA"+username+"Email"+email);
    const formData =new FormData();
   if(Image)
   { 
    formData.append('username',username);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('lotno',lotno);
    formData.append('streetname',streetname);
    formData.append('cityname',cityname);
    formData.append('province',province);
    formData.append('postalcode',postalcode);
    formData.append('contact',contactno);
    formData.append('altcontact',altcontactno);
    formData.append('image', Image);
    formData.append('usertype',"user");
    formData.append('buyFromHome',"no");
    formData.append('isVerified',"false");
    formData.append('user_status',"unblock");
  
     Axios.post("https://carpages-canada-mongodb.onrender.com/users/insertuser",formData).then ((response1) =>{
        console.log(response1);
        if(response1.data.insertId)
        {
             navigate("/confirm_account",{state:{email:email}});
        }
     });

   }
    else if(!Image)
    {
      formData.append('username',username);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('lotno',lotno);
    formData.append('streetname',streetname);
    formData.append('cityname',cityname);
    formData.append('province',province);
    formData.append('postalcode',postalcode);
    formData.append('contact',contactno);
    formData.append('altcontact',altcontactno);
    formData.append('usertype',"user");
    formData.append('buyFromHome',"no");
    formData.append('isVerified',"false");
    formData.append('user_status',"unblock");
    console.log("FORM DATA"+formData);
    Axios.post("https://carpages-canada-mongodb.onrender.com/users/insertuser", formData).then ((response1) =>{
          console.log(response1);
         if(response1.data.insertId)
          {
            navigate("/confirm_account",{state:{User_email:email}});
          }
       });
    }
  
  };


  
  return (
      <>
      
    <div  className='signup-bg' >
    <div className='signup-container fade-bg'>
      <div className='signup-row'>
        <div className='col-small'>
          <div className='form-signup-cont' >
          
            <div className='align-center signup-banner'>
            <img src={banner_image}  style={{height:"30px",width:"150px"}} alt="" />
              </div>
            <h3 className='align-center' style={{fontWeight:"lighter"}}>Create Account</h3>
            <p style={{display:"flex",flexDirection:"row",flex:"1 1 auto",width:"100%",fontSize:"12px",justifyContent:"center" }}>
            AlreadyHave An Account?<Link to="/signin" style={{marginLeft:"5px",textDecoration:"none"}}>Sign In here</Link>
            </p>
            
           
               <div className='signup-form-cont'>
               <div className='signup-fields sup-field-2'>
               <div style={{width:"48.5%"}}> 
                  <div className='et-pass'>
                  <label htmlFor="" className='inp-fields-lab'>Name</label>
                  </div>
                    <div className='signup-in-field'>
                    <input className='in inpStyle' type="text" name='userName' placeholder='John Doe'   
                    onChange={(e)=>{
                      setusername(e.target.value)
                    }}/>
                    </div>
                </div>
                <div style={{width:"48.5%"}}> 
                    <div className='et-pass'>
                    <label htmlFor="" className='inp-fields-lab'>Email</label>
                    </div>
                    <div className='signup-in-field'>
                    <input className='in inpStyle'  type="text"   name='eMail' placeholder='john.doe@example.com' 
                    onChange={(e) =>{
                    data1(e.target.value);justcheck(e.target.value);
                    }} />
                    </div>
                </div>
              </div>
           
              <div className='signup-fields sup-field-2'>
               <div style={{width:"48.5%"}}> 
                <div className='et-pass '>
              <label htmlFor="" className='inp-fields-lab'>Password</label>
              
                </div>
                  <div className='signup-in-field '>
                  <input className='in inpStyle' type="password"   placeholder='Password..' name="passWord" id=""  onChange={(e)=>{
                    setpassword(e.target.value)
                  }}/>
                  </div>
                 </div>
                 <div style={{width:"48.5%"}}> 
                      <div className='et-pass '>
                      <label htmlFor="" className='inp-fields-lab'>Province</label>
                      </div>
                      <div className=''>
                                <select  name="provinces" id="" className={province==""? 'province-sel':'province-sel1'} onChange={(e)=>{ChooseProvince(e.target.value)}} >
                                <option className='color123' value="" disabled selected>Choose Province</option>
                                    <option className='color321' value="Alberta">Alberta</option>
                                    <option className='color321' value="British Columbia" >British Columbia</option>
                                    <option className='color321' value="Manitoba">Manitoba</option>
                                    <option className='color321' value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option className='color321' value="New Brunswick">New Brunswick</option>
                                    <option className='color321' value="Northwest Territories">Northwest Territories</option>
                                    <option className='color321' value="Nova Scotia">Nova Scotia</option>
                                    <option className='color321' value="Nunavut">Nunavut</option>
                                    <option className='color321' value="Ontario">Ontario</option>
                                    <option className='color321' value="Prince Edward Island">Prince Edward Island</option>
                                    <option className='color321' value="Quebec">Quebec</option>
                                    <option className='color321' value="Saskatchewan">Saskatchewan</option>
                                    <option className='color321' value="Yukon">Yukon</option>
                                </select>
                               </div>
                  </div>
              </div>
                  <div className='signup-fields sup-field-2'>
                      <div style={{width:"35%"}}> 
                      <div className='et-pass '>
                  <label htmlFor="" className='inp-fields-lab'>City Name</label>
                  
                    </div>
                      <div className='signup-in-field ' style={{position:"relative"}}>
                      <input className='in inpStyle' type="text"   placeholder='Calgary'  id="" onChange={(e)=>{/*AutoComplete(e.target.value);*/setcityname(e.target.value)}} />
                      <div className='srch-filter-suggestion'>
                                <div className="srch-filter-suggestions" >
                                {city_Data.length !="" || city_Data ? city_Data.slice(0,5).map((val)=>{
                                  return  <div style={{borderBottom:"1px solid lightgray"}} className='srch-filter-suggestions-item' onClick={()=>{}}>{val.display_place}</div>})
                                  :""                          
                                }
                                
                            </div>
                            </div>
                      </div>
                      </div>
                      <div style={{width:"20%"}}> 
                      <div className='et-pass '>
                  <label htmlFor="" className='inp-fields-lab'>Lot No</label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input className='in inpStyle' type="text"   placeholder='42'  id="" onChange={(e)=>setlotno(e.target.value)}  />
                      </div>
                      </div>
                      <div style={{width:"40%"}}> 
                      <div className='et-pass '>
                        <label htmlFor="" className='inp-fields-lab'>Street Name</label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input className='in inpStyle' type="text"   placeholder='Queens Street'  id="" onChange={(e)=>setstreetname(e.target.value)} />
                      </div>
                      </div>
                  </div>
                  <div className='signup-fields sup-field-2'>
                      <div style={{width:"19.5%"}}> 
                      <div className='et-pass '>
                  <label htmlFor="" className='inp-fields-lab'>Postal code</label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input className='in inpStyle' type="text"   placeholder='L6X 3E1'  id="" onChange={(e)=>setpostalcode(e.target.value)} />
                      </div>
                      </div>
                      <div style={{width:"27.5%"}}> 
                      <div className='et-pass '>
                  <label htmlFor="" className='inp-fields-lab'>Contact</label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input className='in inpStyle' type="text"   placeholder='519-581-1239'  id="" onChange={(e)=>setcontactno(e.target.value)} />
                      </div>
                      </div>
                      <div style={{width:"27.5%"}}> 
                      <div className='et-pass '>
                  <label htmlFor="" className='inp-fields-lab'>Alternate Contact </label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input className='in inpStyle' type="text"   placeholder='519-581-3246'  id="" onChange={(e)=>setaltcontactno(e.target.value)} />
                      </div>
                      </div>
                      <div style={{width:"19.5%"}}> 
                      <div className='et-pass '>
                        <label htmlFor="" className='inp-fields-lab'>Profile Picture</label>
                  
                    </div>
                      <div className='signup-in-field '>
                      <input type="file" style={{display:"none"}} className='in inpStyle' name="" id="1" onChange={(e)=>{choosePic(e)}}/>
                      <label htmlFor="1" className='img-pic'>Choose File</label>
                      </div>
                      </div>
                  </div>
              </div>
              
              
              <div className='align-center'>
              <button style={{padding:" 0.5em 1em",fontWeight:"500",backgroundColor:"#5cb35d",
              color:"white",borderRadius:"3px",border:"none"}} onClick={()=>submitDetails()}>
               Create Account</button>
               </div>
              
              <hr />
              
              <p className='align-center' style={{width:"100%",fontSize:"12px" }}>
                <span >Are you a Dealer? </span>
                <Link to={"/signup"} style={{marginRight:"5px",marginLeft:"5px",textDecoration:"none"}}>Contact Us</Link>
                <span >to find out how carpages.ca can boost your business </span>
              </p>
              
          </div>
        </div>   
        </div>
        { modalImage? <div class="my-modal  fade-bg" tabIndex="-1">
                   <div class="my-modal-dialog" >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">{imageName}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={()=>{showPic(false)}} aria-label="Close"></button>
                              </div>
                              <div class="modal-body" style={{display:"flex",justifyContent:"center"}}>
                             <img src={URL.createObjectURL(Image)} className="preview-logo"  alt="Dealership-Logo" />
                              {/*<img src={demoimg} alt="" />*/}
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={()=>{showPic(false)}} data-bs-dismiss="modal">Close</button>
                                
                              </div>
                            </div>
                          </div>
                            </div>:""
                      }
                  
      </div>
      </div>
        <FooterMain></FooterMain>
       

    </>
)

}
