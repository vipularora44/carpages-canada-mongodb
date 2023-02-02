import React from 'react'
import '../Mystyles/systemlogin.css'
import banner from "../images/logo-wordmark.svg";

export default function AdminLogin() {
    
  return (
    <div className='al-main-cont'>
        <div className='al-sub-cont' >
            <div className='sd-pd'>
            <div className='al-form-sect'>
               <div className='al-log-ban'>
                <img src={banner} className="log-bans-st" alt="" />
                </div>
                   <h3 className='al-log-ban'>Team Login</h3>
                <div className='al-sectinp' >
                    <div><label className='al-lb-st'>Username</label></div>
                    <div>< input type="text" className='al-frm-inp'/></div>
                </div>
                <div className='al-sectinp'>
                    <div><label className='al-lb-st'>Password</label></div>
                    <div><input type="password" className='al-frm-inp' /></div>
                </div>
                <div className='al-sectinp2'>
                    <div style={{display:"flex"}}>
                    <div ><input type="checkbox" /></div>
                    <div style={{marginLeft:"10px"}}> <label className='al-lb-st'>Remember me </label></div>
                    </div>
                </div>
                <div className='al-sectinp' >
                <button type="submit" class="btn btn-primary al-frm-inp" >Sign in</button>
                </div>
        </div>
        </div>
       </div>

    </div>
  )            
}
