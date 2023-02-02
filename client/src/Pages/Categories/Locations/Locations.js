import React, { useEffect, useState } from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import Axios from 'axios'
export default function Locations() {

  const [locations, setLocations] = useState("");
  const [provinces, setProvinces] = useState("");
  const [location_type, setlocation_type] = useState(""); 
  const [updatedLocations, setupdatedLocations] = useState(""); 
  const [showLocations, setshowLocations] = useState(""); 
  const [getLocations, setGetLocations] = useState([]); 
  let any,many,pany,dany = "";
  
  useEffect(() =>{
      // dany=provinces;
       console.log("vipul123"+dany);
      afterChooseProvinces();
      },[provinces]);

  const splitProvince =()=>
  {
     any =provinces.indexOf(",");
     many=provinces.slice(any); 
     pany=provinces.substring(0,any);
    console.log(any+" "+many+"**"+pany);
  
  }

  const onLocationselected = (e) =>
  {
      setupdatedLocations(e);
  }
  const submitLocations = () =>
  {
    splitProvince();
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/create-cities",{
      cityname:locations+many,provinceName:pany,location_type:location_type
    }).then((response)=>{

      console.log(response.data);
    })
  }

  
 console.log("TYPEEEEE"+location_type);
  const onupdateLocation = () =>
  {
    splitProvince();
    console.log("vipul arora"+ many+"///"+pany+"**"+updatedLocations+"---"+locations );
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/updatelocation",{
      newcityname:locations+many,cityId:updatedLocations,provinceName:pany
    }).then((response)=>{

      console.log(response.data);
    })
  }
  const ondeleteLocation = () =>
  {
    splitProvince();
    console.log(updatedLocations+"++++"+pany);
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/deletelocation",{
      cityId:updatedLocations,provinceName:pany
    }).then((response)=>{

    console.log(response.data);
    })
  }

  const onChooseLocations = (e) =>
  {
      setGetLocations([]);
    

       if(e=="viewlocations")
       {
        setshowLocations(e);
        console.log("Add working" + e);
       }
       else if(e=="addlocations")
       {
         setshowLocations(e);
         console.log("Update working" + e);
       }
       else if(e=="")
       {
        
       }
       else if(e=="updatelocations")
       {
         setshowLocations(e);
         console.log("view working" + e);
         
       }
       else
       {
        setshowLocations(e);
         console.log("Delete working" + e);
       }
  };

  const onChooseProvinces = (e) =>
  {
        
        setProvinces(e);
       console.log("on choose province"+provinces);
       afterChooseProvinces();
   
  };

  const afterChooseProvinces = () =>{
    splitProvince();
    console.log(pany+" arora"+dany);
    //console.log(provinces+"--");
   
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/getlocations",{province:pany}).then((res)=>{
    console.log(res);
   setGetLocations(res.data);
});
  };
  return (
    <div className='veh-cat-main-cont' >
    <div className='veh-cat-opr-cnt'>
        <div className='veh-cat-main-cont2'>               
              <div className='veh-opr'>
              <span>Select Operation</span>
              </div>
              <div className='veh-opr1'>
                  <select className='select-inp' name="operation" id="" onChange={(e)=>{onChooseLocations(e.target.value)}}>
                  <option value="" selected>Choose Operation</option>
                                      
                      <option value="viewlocations">View Locations</option>
                      <option value="addlocations" >Add Locations</option>
                      <option value="updatelocations">Update Locations</option>
                      <option value="deletelocations">Delete Locations</option>
                  </select>
              </div>
          </div>

          {showLocations==="addlocations" ? 
            <div className='veh-opr-reslt-loc-add' >
                 <div className='add-cat-container'  >
                              <div className='add-cat-lb'>
                                <label htmlFor="">Add City</label>
                              </div>
                              <div className='cat-name-inp'>
                                <select className='select-inp' name="provinces" id="" onChange={(e)=>{onChooseProvinces(e.target.value)}}>
                                <option value="" selected>Choose Province</option>
                                                    
                                    <option value="Alberta, AB">Alberta</option>
                                    <option value="British Columbia, BC" >British Columbia</option>
                                    <option value="Manitoba, MB">Manitoba</option>
                                    <option value="Newfoundland and Labrador, NL">Newfoundland and Labrador</option>
                                    <option value="New Brunswick, NB">New Brunswick</option>
                                    <option value="Northwest Territories, NT">Northwest Territories</option>
                                    <option value="Nova Scotia, NS">Nova Scotia</option>
                                    <option value="Nunavut, NU">Nunavut</option>
                                    <option value="Ontario, ON">Ontario</option>
                                    <option value="Prince Edward Island, PE">Prince Edward Island</option>
                                    <option value="Quebec, QC">Quebec</option>
                                    <option value="Saskatchewan, SK">Saskatchewan</option>
                                    <option value="Yukon, YT">Yukon</option>

                                </select>
                               </div>
                               <div className='cat-name-inp'>
                                <select className='select-inp' name="provinces" id="" onChange={(e)=>{setlocation_type(e.target.value)}}>
                                <option value="" selected>Choose Location Type</option>
                                                    
                                    <option value="City">City</option>
                                    <option value="Town" >Town</option>
                                    <option value="Major">Major</option>
                                    

                                </select>
                               </div>
                              <div className='cat-name-inp'>
                                <input type="text" placeholder='Type City Here' className='add-cat-inp' onChange={(e)=>{
                                  setLocations(e.target.value);
                                }}/>
                              </div>
                              <div className='cat-name-inp' >
                                <button className='add-cat-sb' onClick={submitLocations}>Submit</button>
                              </div>
                        </div>        
              
                
              </div>:""}

              {showLocations==="updatelocations" ? 
                <div className='veh-opr-reslt-loc-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Models</label>
                        </div>
                        <div className='cat-name-inp'>
                                <select className='select-inp' name="provinces" id="" onChange={(e)=>{onChooseProvinces(e.target.value)}}>
                                <option value="" selected>Choose Province</option>
                                                    
                                    <option value="Alberta, AB">Alberta</option>
                                    <option value="British Columbia, BC" >British Columbia</option>
                                    <option value="Manitoba, MB">Manitoba</option>
                                    <option value="Newfoundland and Labrador, NL">Newfoundland and Labrador</option>
                                    <option value="New Brunswick, NB">New Brunswick</option>
                                    <option value="Northwest Territories, NT">Northwest Territories</option>
                                    <option value="Nova Scotia, NS">Nova Scotia</option>
                                    <option value="Nunavut, NU">Nunavut</option>
                                    <option value="Ontario, ON">Ontario</option>
                                    <option value="Prince Edward Island, PE">Prince Edward Island</option>
                                    <option value="Quebec, QC">Quebec</option>
                                    <option value="Saskatchewan, SK">Saskatchewan</option>
                                    <option value="Yukon, YT">Yukon</option>

                                </select>
                               </div>
                        <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="selectMake" id="" onChange={(e)=>{onLocationselected(e.target.value)}}>
                    <option value="" selected>Cities Name</option>
                      {getLocations.map((val)=>{
                         return (<option value={val._id}>{val.city_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder={updatedLocations} className='add-cat-inp' onChange={(e)=>{
                          setLocations(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={onupdateLocation}>Submit</button>
                      </div>
                      </div>
                </div>:""}

                {showLocations==="deletelocations" ? 
                <div className='veh-opr-reslt-loc-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Locations</label>
                        </div>
                        <div className='cat-name-inp'>
                                <select className='select-inp' name="provinces" id="" onChange={(e)=>{onChooseProvinces(e.target.value)}}>
                                <option value="" selected>Choose Province</option>
                                                    
                                    <option value="Alberta, AB">Alberta</option>
                                    <option value="British Columbia, BC" >British Columbia</option>
                                    <option value="Manitoba, MB">Manitoba</option>
                                    <option value="Newfoundland and Labrador, NL">Newfoundland and Labrador</option>
                                    <option value="New Brunswick, NB">New Brunswick</option>
                                    <option value="Northwest Territories, NT">Northwest Territories</option>
                                    <option value="Nova Scotia, NS">Nova Scotia</option>
                                    <option value="Nunavut, NU">Nunavut</option>
                                    <option value="Ontario, ON">Ontario</option>
                                    <option value="Prince Edward Island, PE">Prince Edward Island</option>
                                    <option value="Quebec, QC">Quebec</option>
                                    <option value="Saskatchewan, SK">Saskatchewan</option>
                                    <option value="Yukon, YT">Yukon</option>

                                </select>
                               </div>
                    <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="selectMake" id="" onChange={(e)=>{onLocationselected(e.target.value)}}>
                    <option value="" selected>Cities Name</option>
                      {getLocations.map((val)=>{
                         return (<option value={val._id}>{val.city_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={ondeleteLocation}>Submit</button>
                      </div>
                      </div>
                </div>:""}
                {showLocations==="viewlocations" ? <div className='veh-opr-reslt-loc-add' >
                <div className='add-cat-container'>
                 <div className='add-cat-lb'>
                <label htmlFor="">Location Name</label>
                </div>
                      <div className='cat-name-inp'>
                                <select className='select-inp' name="provinces" id="" onChange={(e)=>{onChooseProvinces(e.target.value)}}>
                                <option value="" selected>Choose Province</option>
                                                    
                                    <option value="Alberta, AB">Alberta</option>
                                    <option value="British Columbia, BC" >British Columbia</option>
                                    <option value="Manitoba, MB">Manitoba</option>
                                    <option value="Newfoundland and Labrador, NL">Newfoundland and Labrador</option>
                                    <option value="New Brunswick, NB">New Brunswick</option>
                                    <option value="Northwest Territories, NT">Northwest Territories</option>
                                    <option value="Nova Scotia, NS">Nova Scotia</option>
                                    <option value="Nunavut, NU">Nunavut</option>
                                    <option value="Ontario, ON">Ontario</option>
                                    <option value="Prince Edward Island, PE">Prince Edward Island</option>
                                    <option value="Quebec, QC">Quebec</option>
                                    <option value="Saskatchewan, SK">Saskatchewan</option>
                                    <option value="Yukon, YT">Yukon</option>

                                </select>
                               </div>
                        
                        <div>
                          <div><span>Cities Name:</span></div>
                          <div ><select className='select-inp' name="viewCities" id="" onChange={(e)=>{}}>
                                      <option value="" selected>Cities Name</option>
                        {getLocations.map((val)=>{
                              return (
                                       <option value={val.city_name}>{val.city_name}</option>
                                     )
                                  
                              })}

                            </select>
                            </div>
                            </div>
                              </div>
                          </div>:""}
                            </div>
                        </div>  
  )
}
