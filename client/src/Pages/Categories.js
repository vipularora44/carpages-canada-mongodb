import React ,{useState}from 'react'

import "../Mystyles/admintabs.css";
import Locations from './Categories/Locations/Locations';
import VehicleMakes from './Categories/Makes/VehicleMakes';
import VehicleModels from './Categories/Models/VehicleModels';
import VehicleCategory from './Categories/VehicleCategories/VehicleCategory';
import VehiclePrices from './Categories/Prices/VehiclePrices';
import VehicleYears from './Categories/Years/VehicleYears';

export default function Categories() {

    const [value, setValue] = useState("");
    const [down, setdown] = useState(false);

 
  

      const handleTab = (event) => {
        // update the state to tab1
        setValue(event);
        console.log(event);
      };
 
  return (
    

         <div >

            
           <div className='tab-cont'>
        {/*<button className={value === "tab1" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab1}> 
         <a className='nav-link' role="button" data-bs-toggle="dropdown" aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Location</a></button>
         <button className={value === "tab2" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab2}> 
         <a  aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Makes</a></button>
         <button className={value === "tab3" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab1}> 
         <a  aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Models</a></button>
         <button className={value === "tab4" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab1}> 
         <a  aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Engine & Drives</a></button>
         <button className={value === "tab5" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab1}> 
         <a  aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Prices</a></button>
         <button className={value === "tab6" ? "tab-bt-active" : "tab-bt-nactive"} onClick={handleTab1}> 
        <a  aria-current="page" href="#" style={{textDecoration:"none",color:"grey"}}>Years</a></button>
        
        className={value === "tab1" ? "dropdown-item" : "dropdown-item"}
        */}
           <button type="button" class="btn tab-bt-active" value="vehiclecategories" onClick={(e)=>{handleTab(e.target.value)}}>Vehicle Categories</button>
           <button type="button" class="btn tab-bt-active" value="locations" onClick={(e)=>{handleTab(e.target.value)}}>Location</button>
           <button type="button" class="btn tab-bt-active" value="makes" onClick={(e)=>{handleTab(e.target.value)}}>Makes</button>
           <button type="button" class="btn tab-bt-active" value="models" onClick={(e)=>{handleTab(e.target.value)}}>Models</button>
           <button type="button" class="btn tab-bt-active" value="prices" onClick={(e)=>{handleTab(e.target.value)}}>Prices</button>
           <button type="button" class="btn tab-bt-active" value="years" onClick={(e)=>{handleTab(e.target.value)}}>Years</button>
        </div>
           
            <div className="">
              
            {value == "vehiclecategories" ?<div className=''><VehicleCategory/></div>: null} 
            {value == "locations" ?<div className=''><Locations/></div>: null} 
            {value == "makes" ?<div className=''><VehicleMakes/></div>: null} 
            {value == "models" ?<div className=''><VehicleModels/></div>: null} 
            {value == "prices" ?<div className=''><VehiclePrices/></div>: null} 
            {value == "years" ?<div className=''><VehicleYears/></div>: null} 
            
            </div>  

          </div>
   
  )
}
