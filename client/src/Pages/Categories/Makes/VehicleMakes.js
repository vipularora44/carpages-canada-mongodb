import React,{useEffect, useState} from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import Axios from 'axios'

export default function VehicleMakes() {

  const [makeName, setmakeName] = useState("");
  const [showAddMakes, setshowAddMakes] = useState("");
  const [updateMakes, setupdateMakes] = useState("");
  const [fetchMakes, setfetchMakes] = useState([]);
  
  useEffect(() =>{
   
  },[]);

     const submitMake = () =>{

    console.log("working");
       Axios.post("http://localhost:3010/categories/insertmake",{
         makename:makeName
       }).then((response)=>{
   
         console.log(response.data);
       })
   
     };
     const updateMake = () =>{

      console.log("working");
         Axios.post("http://localhost:3010/categories/updatetmake",{
           newmakename:makeName,makeId:updateMakes
         }).then((response)=>{
     
           console.log(response.data);
         })
      
     };

     const deleteMake = () =>{

      console.log("working");
         Axios.post("http://localhost:3010/categories/deletemake",{
          makeId:updateMakes
         }).then((response)=>{
     
           console.log(response.data);
         })
      
     };
     const onVehicleMakes = (e) =>
     {
      Axios.get("http://localhost:3010/categories/makes").then((res)=>{
        console.log(res);
        setfetchMakes(res.data);
      });

          if(e=="viewvehiclemakes")
          {
            setshowAddMakes(e);
            console.log("Add working" + e);
          }
          else if(e=="addvehiclecmakes")
          {
            setshowAddMakes(e);
            console.log("Update working" + e);
          }
          else if(e=="updatevehiclemakes")
          {
            setshowAddMakes(e);
            console.log("view working" + e);
          }
          else
          {
            setshowAddMakes(e);
            console.log("Delete working" + e);
          }
     };

     const onMakeSelected = (e) =>{
       setupdateMakes(e);
     };

  return (
    <div className='veh-cat-main-cont' >
    <div className='veh-cat-opr-cnt'>
        <div className='veh-cat-main-cont2'>               
              <div className='veh-opr'>
              <span>Select Operation</span>
              </div>
              <div className='veh-opr1'>
                  <select className='select-inp' name="operation" id="" onChange={(e)=>{onVehicleMakes(e.target.value)}}>
                  <option value="" selected>Choose Operation</option>
                                      
                      <option value="viewvehiclemakes">View Vehicle Makes</option>
                      <option value="addvehiclecmakes" >Add Vehicle Makes</option>
                      <option value="updatevehiclemakes">Update Vehicle Makes</option>
                      <option value="deletevehiclemakes">Delete Vehicle Makes</option>
                  </select>
              </div>
          </div>
            {showAddMakes==="addvehiclecmakes" ? 
            <div className='veh-opr-reslt-makes-add' >
              
                  
                        <div className='add-cat-container'  >
                              <div className='add-cat-lb'>
                                <label htmlFor="">Add Make</label>
                              </div>
                              <div className='cat-name-inp'>
                                <input type="text" placeholder='Type Here' className='add-cat-inp' onChange={(e)=>{
                                  setmakeName(e.target.value);
                                }}/>
                              </div>
                              <div className='cat-name-inp' >
                                <button className='add-cat-sb' onClick={submitMake}>Submit</button>
                              </div>
                        </div>        
                  
                
              </div>:""}

              {showAddMakes==="updatevehiclemakes" ? 
                <div className='veh-opr-reslt-makes-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Make</label>
                        </div>
                        <div  className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select  className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onMakeSelected(e.target.value)}}>
                    <option value="" selected>Choose Makes</option>
                      {fetchMakes.map((val)=>{
                         return (<option value={val._id}  >{val.makes_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder={updateMakes} className='add-cat-inp' onChange={(e)=>{
                          setmakeName(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={updateMake}>Submit</button>
                      </div>
                      </div>
                </div>:""}

              {showAddMakes==="deletevehiclemakes" ? 
                <div className='veh-opr-reslt-del'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Vehicle Make</label>
                        </div>
                        <div  className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select  className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onMakeSelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Makes</option>
                      {fetchMakes.map((val)=>{
                         return (<option value={val._id}  >{val.makes_name}</option>)
                          })}                
                    </select>
                    </div>
                      
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={deleteMake}>Submit</button>
                      </div>
                      </div>
                </div>:""}
                {showAddMakes==="viewvehiclemakes" ? <div className='veh-opr-reslt-makes-add' >
                    <div className='add-cat-container'>
                    <div className='add-cat-lb'>
                            <label htmlFor="">Vehicle Make</label>
                    </div>
                  <div  className='cat-name-inp'><select  className='select-inp' name="viewVehicleCategory" style={{width:"250px"}} id="" onChange={(e)=>{}}>
                  <option value="" selected>Choose Makes</option>
                   {fetchMakes.map((val)=>{return (<option value={val.makes_name}  >{val.makes_name}</option>)})}
                    </select>
                    </div>
                    
                      </div>
                </div>:""}
              
      </div>
  </div>
  )
}
