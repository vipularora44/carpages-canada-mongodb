import React from 'react'
import {BsApple} from "react-icons/bs";
import {BsTwitter} from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa";

import {ImAndroid} from "react-icons/im";
import    "../Mystyles/footer.css";

export default function FooterMain() {
  return (
   <footer className='footer'>
     <div className='footer-Main'>
    <div className='footer-container'>
          <div className='footer-section'>
                  <div className='footer-section1' >
                    <div   className='footer-options'>
                    <h6>Shopping Tools</h6>
                    <ul className='appearance' >
                          <li ><a className='appearance option' href="#">Find a vehicle</a></li>
                          <li><a className='appearance option' href="#">Get Insurance</a></li>
                          <li><a className='appearance option' href="#">Car Reviewes</a></li>
                          <li><a className='appearance option'  href="#">Used Car Buying Guide</a></li>
                        </ul>
                    </div>
                    <div  className='footer-options'>
                    <h6>For Dealers</h6>
                    <ul className='appearance'>
                          <li><a className='appearance option'  href="#">Advertise with Us</a></li>
                          <li><a className='appearance option' href="#">Discover Dealer Site</a></li>
                          <li><a className='appearance option'  href="#">AccountSign in</a></li>
                          <li><a className='appearance option' href="#">Action</a></li>
                        </ul>
                    </div>
                    <div className='footer-options'>
                    <h6>About Us</h6>
                    <ul className='appearance'>
                          <li><a className='appearance option' href="#">Contact Us</a></li>
                          <li><a className='appearance option' href="#">Our Blog</a></li>
                          <li><a className='appearance option' href="#">Buy From Home Program</a></li>
                          <li><a className='appearance option' href="#">Careers</a></li>
                          <li><a className='appearance option' href="#">About Carpages.ca</a></li>
                        </ul>
                    </div>
                 </div>
           </div>
      <div className="footer-promote">
        copyright © 2003-2022 Carpages.ca (div. of Autopath Technologies Inc.), All Rights Reserved.
        <ul className='footer-promote-ul '>
                          <li><a className='appearance option footer-promote-ul-listitem ' href="#">Privacy Policy</a></li>
                          <li><a className='appearance option footer-promote-ul-listitem' href="#">Terms & Conditions</a></li>
                         
                        </ul>
                        <ul className='footer-promote-icons'>
                          <li><a className='footer-icon-sz' href="#"><BsApple></BsApple></a></li>
                          <li><a className='footer-icon-sz' href="#"><BsTwitter></BsTwitter></a></li>
                          <li><a className='footer-icon-sz' href="#"><ImAndroid></ImAndroid></a></li>
                        
                          <li><a className='footer-icon-sz' href="#"><FaFacebookF></FaFacebookF></a></li></ul>          
      </div >
    </div>
    </div>
   </footer>
  )
}
