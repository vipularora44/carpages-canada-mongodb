import React ,{useState,useContext,useEffect} from 'react'
import  '../Mystyles/dealersignup.css';
import { SignupContext } from '../Context/SignupContext';

import banner_image from "../images/logo-wordmark.svg";
import {Link } from 'react-router-dom';
import FooterMain from './FooterMain.js';

import Axios from 'axios';

export default function DealerSignup() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");
    const [province, setProvince] = useState("");
    const [cityName, setcityName] = useState("");
    const [lotNo, setlotNo] = useState("");
    const [postalCode, setpostalcode] = useState("");
    const [streetName, setstreetName] = useState("");
    const [contactno, setcontactno] = useState("");
    const [altcontactno, setaltcontactno] = useState("");
    const [Image, setImage] = useState("");
    const [demoImage, setdemoImage] = useState("Filename.jpg");
    const [modalImage, setmodalImage] = useState(false);
    let any,many,pany,dany = "";
    var Address,state="";

      useEffect(()=>{
        setmodalImage(false); 
       // setdemoImage("Filename.jpg");
      },[]);

    const {data1} =useContext(SignupContext);

    const choosePic= (e) =>
    {
      console.log(e.target.files[0] +"****");
      if (e.target.files[0] )
      {
        setImage(e.target.files[0]);
        
        setdemoImage(e.target.files[0].name);
        setmodalImage(true);    
        console.log(e.target.files[0].name +"12345..." +demoImage);
      }
      
    };
    
    const ChooseProvince =(e)=>
    {
        
        setProvince(e);
    }

    const showPic =()=>
    {
     setmodalImage(false);
    };

   
          
      
      const SubmitInfo = ()=>
      {
         
          const formData =new FormData();
        if(Image)
        {
           formData.append('username',username);
           formData.append('email',email);
           formData.append('password',password);
           formData.append('lotno',lotNo);
           formData.append('streetname',streetName);
           formData.append('cityname',cityName);
           formData.append('province',province);
           formData.append('postalcode',postalCode);
           formData.append('contact',contactno);
           formData.append('altcontact',altcontactno);
           formData.append('image', Image);
           formData.append('usertype',"dealer");
           formData.append('buyFromHome',"no");
           formData.append('isVerified',"false");
           formData.append('user_status',"unblock");
            Axios.post("https://carpages-canada-mongodb.onrender.com/users/insertuser", formData ).then ((response1) =>{
               console.log(response1);
            });
        }
        else if(Image.length === 0)
          {
            alert("Do you want to continue witout uploading ");
            formData.append('username',username);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('lotno',lotNo);
            formData.append('streetname',streetName);
            formData.append('cityname',cityName);
            formData.append('province',province);
            formData.append('postalcode',postalCode);
            formData.append('contact',contactno);
            formData.append('altcontact',altcontactno);
            formData.append('usertype',"dealer");
            formData.append('buyFromHome',"no");
            formData.append('isVerified',"false");
            formData.append('user_status',"unblock");
             Axios.post("https://carpages-canada-mongodb.onrender.com/users/insertuser", formData ).then ((response1) =>{
                console.log(response1);
             });
          }
      };

  return (
    <>
      
    <div  className='d-signup-bg' >
    <div className='d-signup-container fade-bg'>
      <div className='d-signup-row'>
        <div className='d-col-small'>
          <div className='d-form-signup-cont' >
            <div className='d-align-center signup-banner'>
            <img src={banner_image}  style={{height:"30px",width:"150px"}} alt="" />
              </div>
            <h3 className='d-align-center' style={{fontWeight:"lighter"}}>Create Delaer Account</h3>
            <p style={{display:"flex",flexDirection:"row",flex:"1 1 auto",width:"100%",fontSize:"12px",justifyContent:"center" }}>
            AlreadyHave An Account?<Link to="/signin" style={{marginLeft:"5px",textDecoration:"none"}}>Sign In here</Link>
            </p>
            
           
               <div className='d-signup-form-cont'>
              <div className='d-signup-fields d-mg-rt10'>
                <div className='d-et-pass'>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Email</label>
              </div>
                  <div className='d-signup-in-field'>
                  <input className='d-in inpStyle'  type="text"  name='eMail' placeholder='carpages_canada@example.com' 
                  onChange={(e) =>{
                   data1(e.target.value);setEmail(e.target.value);
                  
                  }} />
                  </div>
              </div>
              <div className='d-signup-fields'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Password</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="password"   placeholder='Password..' name="password" id=""  onChange={(e)=>{
                    setpassword(e.target.value)
                  }}/>
                  </div>
              </div>
              </div>
              <div className='d-signup-form-cont'>
              <div className='d-signup-fields d-mg-rt10'>
                 <div className='d-et-pass'>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Dealership Name</label>
              </div>
                  <div className='signup-in-field d-mg-rt10'>
                  <input className='d-in inpStyle' type="text" name='userName' placeholder='Carpages Auto Sales'   
                  onChange={(e)=>{
                   setusername(e.target.value)
                  }}/>
               
              </div>
                 </div>
               <div className='d-signup-fields '>
                 <div className='d-et-pass'>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Province</label>
              </div>
              <div className='d-cat-name-inp'>
                                <select className={province==""? "d-select-inp":"d-select-inp2"} name="provinces" id="" onChange={(e)=>{ChooseProvince(e.target.value)}}>
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
                 <div className='d-signup-form-cont'>
              <div className='d-signup-prov d-mg-rt10'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>City Name</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='Vancouver' name="password" id=""  onChange={(e)=>{
                    setcityName(e.target.value)
                  }}/>
                  </div>
              </div>
              <div className='d-signup-md-fields  d-mg-rt10'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Unit No</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='58' name="password" id=""  onChange={(e)=>{
                    setlotNo(e.target.value)
                  }}/>
                  </div>
              </div>

              <div className='d-signup-street'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Street Name</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='Hamilton Drive' name="password" id=""  onChange={(e)=>{
                    setstreetName(e.target.value)
                  }}/>
                  </div>
              </div>

              </div>
              <div className='d-signup-form-cont'>
              <div className='d-signup-md-fields d-mg-rt10'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Postal Code</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='L6X 3E1' name="password" id=""  onChange={(e)=>{
                    setpostalcode(e.target.value)
                  }}/>
                  </div>
              </div>
              <div className='d-signup-prov  d-mg-rt10'>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Contact No</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='519-581-1239' name="password" id=""  onChange={(e)=>{
                    setcontactno(e.target.value)
                  }}/>
                  </div>
              </div>
              <div className='d-signup-prov d-mg-rt10 '>
                <div className='d-et-pass '>
              <label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Alternate Contact No</label>
              
                </div>
                  <div className='d-signup-in-field '>
                  <input className='d-in inpStyle' type="text"   placeholder='519-581-3245' name="password" id=""  onChange={(e)=>{
                    setaltcontactno(e.target.value)
                  }}/>
                  </div>
              </div>
              <div className=''>
              <div className='d-et-pass '><label htmlFor="" style={{marginBottom:"1px",fontSize:"13px",color:"lightslategray"}}>Profile Picture</label></div>
                  <div className='d-disp-fx1'>
                  <div className='d-signup-up-image'>
                 <input  type="file" name="hello" id="1"  className='d-upload-img'   onChange={(e)=>{choosePic(e)}}/>
                  <label className='d-img-upl-lb' htmlFor="1">
                  <i class="fa-solid fa-upload"></i>&nbsp; Logo </label>
                  </div>
                {/*  <div className='d-mg-lft' > <label 
                   data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Preview Image" onClick={()=>{showPic(true)}}  className='d-img-upl-lb'> Show Preview
                   </label>
                </div>*/}
                </div>

                   { modalImage? <div className="my-modal  fade-bg" tabIndex="-1">
                   <div class="my-modal-dialog" >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">{demoImage}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>{showPic(false)}} aria-label="Close"></button>
                              </div>
                              <div className="modal-body" style={{display:"flex",justifyContent:"center"}}>
                             <img src={URL.createObjectURL(Image)} className="preview-logo"  alt="Dealership-Logo" />
                              {/*<img src={demoimg} alt="" />*/}
                              </div>
                              <div className="modal-footer">
                                <button type="button" class="btn btn-secondary" onClick={()=>{showPic(false)}} data-bs-dismiss="modal">Close</button>
                                
                              </div>
                            </div>
                          </div>
                            </div>:""
                      }
                  
              </div>
              </div>
              <div className='d-align-center'>
              <Link to={"#"}><button style={{padding:" 0.5em 1em",fontWeight:"500",backgroundColor:"#5cb35d",
              color:"white",borderRadius:"3px",border:"none",width:"100%"}} onClick={()=>SubmitInfo()}>
               Create Account</button></Link>
               </div>
              
              <hr />
              
              <p className='d-align-center' style={{width:"100%",fontSize:"12px" }}>
                <span >Are you a Dealer? </span>
                <Link to={"/signup"} style={{marginRight:"5px",marginLeft:"5px",textDecoration:"none"}}>Contact Us</Link>
                <span >to find out how carpages.ca can boost your business </span>
              </p>
          </div>
        </div>   
        </div>
     
      </div>
</div>
<FooterMain></FooterMain>
    </>
  )
}
