import React, { useEffect, useState } from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import Axios from 'axios'

export default function VehiclePrices() {

  const [showSections, setShowSections] = useState(""); 
  const [prices, setPrices] = useState(""); 
  const [selectedprices, setSelectedPrices] = useState(""); 
  const [getprices, setGetPrices] = useState([]); 

  let any,many,pany,dany = "";
  const dollar="$";
  const onChoosePrices = (e) =>
  {
    Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/getprices").then((response)=>{
      console.log(response.data);
      setGetPrices(response.data);
    });

    if(e=="viewPrices")
    {
      setShowSections(e);
     console.log("Add working" + e);
    }
    else if(e=="addPrices")
    {
      setShowSections(e);
      console.log("Update working" + e);
    }
    else if(e=="")
    {
     
    }
    else if(e=="updatePrices")
    {
      setShowSections(e);
      console.log("view working" + e);
      
    }
    else
    {
      setShowSections(e);
      console.log("Delete working" + e);
    }

  }

  const priceToping =()=>
  {
     any =prices.indexOf("0");
     many=prices.concat(",000"); 
     pany=dollar+many;
    console.log(any+"--"+many+"**"+pany);
  
  }
  const onPriceSelected=(e)=>{
    setSelectedPrices(e);
    console.log(selectedprices);
  }

  const submitPrices =()=>
  {
          priceToping();
        Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/create-prices",{pricesadd:dollar+prices}).then((response)=>{
           console.log(response.data);
         })
  }
  const UpdatePrices =()=>
  {
        //  priceToping();
        Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/updateprices",{priceId:selectedprices,updateprice:dollar+prices}).then((response)=>{
           console.log(response.data);
         })
  }
  const deletePrices =()=>
  {
        //  priceToping();
          Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/deleteprices",{priceId:selectedprices}).then((response)=>{
           console.log(response.data);
         })
  }

  return (
    <div className='veh-cat-main-cont' >
    <div className='veh-cat-opr-cnt'>
        <div className='veh-cat-main-cont2'>               
              <div className='veh-opr'>
              <span>Select Operation</span>
              </div>
              <div className='veh-opr1'>
                  <select className='select-inp' name="operation" id="" onChange={(e)=>{onChoosePrices(e.target.value)}}>
                  <option value="" selected>Choose Operation</option>
                                      
                      <option value="viewPrices">View Prices</option>
                      <option value="addPrices" >Add Prices</option>
                      <option value="updatePrices">Update Prices</option>
                      <option value="deletePrices">Delete Prices</option>
                  </select>
              </div>
          </div>
          {showSections==="addPrices" ? 
            <div className='veh-opr-reslt-makes-add' >
                 <div className='add-cat-container'  >
                              <div className='add-cat-lb'>
                                <label htmlFor="">Add Prices</label>
                              </div>
                               <div className='cat-name-inp'>
                                <input type="text" placeholder='Type Here' className='add-cat-inp' onChange={(e)=>{
                                  setPrices(e.target.value);
                                }}/>
                              </div>
                              <div className='cat-name-inp' >
                                <button className='add-cat-sb' onClick={submitPrices}>Submit</button>
                              </div>
                        </div>        
              
                
              </div>:""}
              {showSections==="updatePrices" ? 
                <div className='veh-opr-reslt-makes-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Prices</label>
                        </div>
                        <div className='cat-name-inp'  style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onPriceSelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Price</option>
                      {getprices.map((val)=>{
                         return (<option value={val._id}  >{val.prices}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder=""  className='add-cat-inp' onChange={(e)=>{
                          setPrices(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={UpdatePrices}>Update</button>
                      </div>
                      </div>
                </div>:""}
                {showSections==="deletePrices" ? 
                <div className='veh-opr-reslt-del'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Prices</label>
                        </div>
                        <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onPriceSelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Price</option>
                      {getprices.map((val)=>{
                         return (<option value={val._id}  >{val.prices}</option>)
                          })}                
                    </select>
                    </div>
                      
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={deletePrices}>Delete</button>
                      </div>
                      </div>
                </div>:""}

      {showSections==="viewPrices" ? <div className='veh-opr-reslt-makes-add' >
          <div className='add-cat-container'>
          <div className='add-cat-lb'>
          <label htmlFor="">Vehicle Make</label>
          </div>
        <div><select className='select-inp' name="viewVehicleCategory" id="" style={{width:"250px"}} onChange={(e)=>{}}>
                    <option value="" selected>All Vehicle Prices</option>
                {getprices.map((val)=>{
        
                 return (
                     
                   <option value={val.prices}  >{val.prices}</option>
                   
                 )
                 
             })}

           </select>
           </div>
           
             </div>
      </div>:""}
        </div>
      </div>
  )
}
