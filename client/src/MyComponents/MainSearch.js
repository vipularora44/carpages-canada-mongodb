import React from 'react'
import {GoHome} from 'react-icons/go';
import  '../Mystyles/buyFromHome.css';

export default function MainSearch() {
  return (
    <div className='buyFromHome-mainContainer'>
       <div className='buyFromHome1'>
         <div className='homeIconSection'>
           <GoHome className='homeIconSection-img' ></GoHome>
         </div>
         <div className='buyFromHome-heading'>
          <h5 className='buyFromHome-heading-text'>Buy From Home Program</h5>
          <span>Safe and convenient</span>
         </div>
         <a className='buyFromHome-a' href="">
          <button className='buyFromHome-findout'>FIND OUT MORE</button></a>
       </div>
       
    </div>

    
  )
}
