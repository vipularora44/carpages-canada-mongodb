import React, { useEffect, useState } from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import  Axios  from 'axios';


export default function VehicleModels() {

    const [makeName, setMakeName]= useState([]);
    const [getetmodelName, setgetmodelName]= useState([]);
    const [modelName, setModelName]= useState("");
    const [updatemakeName, setupdatemakeName]= useState("");
    const [updatemodelName, setupdatemodelName]= useState("");
    const [updateModel, setupdateModel] = useState("");
    const [modelOpaeration1, setmodelOpaeration1] = useState("");
    

    useEffect(()=>{
        Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/makes").then((res) =>{
            console.log(res.data );
            setMakeName(res.data);
        });
    },[]);
  
   const FetchMakes=()=>
   {
    Axios.get("https://carpages-canada-mongofrnt.onrender.com/categories/makes").then((res) =>{
            console.log(res.data );
            setMakeName(res.data);
        });
   }
    const onHandleModels = (e) =>
  {   setMakeName([]);
      setgetmodelName([]);
      if(e=="viewmodels")
      {
        setmodelOpaeration1(e);
        FetchMakes();
        console.log("Add working" + e);
      }
      else if(e=="addmodels")
      {
        setmodelOpaeration1(e);
        FetchMakes();
       // console.log("Update working" + e);
      }
      else if(e=="updatemodels")
      {
        setmodelOpaeration1(e);
        FetchMakes();
        console.log("view working" + e);
      }
      else
      {
        setmodelOpaeration1(e);
        FetchMakes();
        console.log("Delete working" + e);
      }
      
  }
  
 
  const onMakeselected = (e) =>
  {  
    setupdatemakeName(e);
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/models",{makename:e}).then((res) =>{
      console.log(res.data );
      setgetmodelName(res.data);
    });
  
  }
 
  const onModelselected = (e) =>
  {
    setupdatemodelName(e);
    //console.log(e+"123");
      
  }
  const submitModel = () =>{
    console.log("working" +updatemakeName);
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/insertmodel",{
    model:modelName,makename:updatemakeName
    }).then((response)=>{
    console.log(response.data);
    })
   };

   const updateModelname = () =>{
    console.log(modelName+"working"+updatemakeName+"123"+updatemodelName);
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/updateModel",{
   modelId:updatemodelName,newmodel:modelName
    }).then((response)=>{

    console.log(response.data);
    })
   };
   const deleteModelName = () =>{
    console.log("working");
    Axios.post("https://carpages-canada-mongofrnt.onrender.com/categories/deletemodelname",{
      model:modelName,makename:updatemakeName,modelId:updatemodelName
    }).then((response)=>{

    console.log(response.data);
    })
   };
    console.log("IDDDDD"+updatemodelName);
  return (
    <div className='veh-cat-main-cont' >
      <div className='veh-cat-opr-cnt'>
          <div className='veh-cat-main-cont2'>               
                <div className='veh-opr'>
                <span>Select Operation</span>
                </div>
                <div className='veh-opr1'>
                    <select className='select-inp' name="operation" id="" onChange={(e)=>{onHandleModels(e.target.value)}}>
                    <option value="" selected>Choose Operation</option>
                                        
                        <option value="viewmodels">View Models</option>
                        <option value="addmodels" >Add Models</option>
                        <option value="updatemodels">Update Models</option>
                        <option value="deletemodels">Delete Models</option>
                    </select>
                </div>
            </div>
            {modelOpaeration1==="addmodels" ? 
      <div className='veh-opr-reslt-loc-add' >
                  <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Add Models</label>
                        </div>
                        <div className='cat-name-inp'>
                      <select className='select-inp' name="viewMakes" id="" onChange={(e)=>{onMakeselected(e.target.value)}}>
                    <option value="" selected>All Makes</option>
                 {makeName.map((val)=>{return (<option value={val.makes_name}>{val.makes_name}</option>)})}
                 </select>
                
                </div>
                      <div className='cat-name-inp'>
                        <input type="text" placeholder='Type Model Name Here' className='add-cat-inp' onChange={(e)=>{
                          setModelName(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={submitModel}>Submit</button>
                      </div>
                  </div>
     </div> :""}

    {modelOpaeration1==="updatemodels" ? 
                <div className='veh-opr-reslt-loc-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Models</label>
                        </div>
                        <div className='cat-name-inp'>
                      <select className='select-inp' name="viewMakes" id="" onChange={(e)=>{onMakeselected(e.target.value)}}>
                    <option value="" selected>All Makes</option>
                 {makeName.map((val)=>{return (<option value={val.makes_name}>{val.makes_name}</option>)})}
                 </select>
                
                </div>
                        <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="selectMake" id="" onChange={(e)=>{onModelselected(e.target.value)}}>
                    <option value="" selected>All Models</option>
                      {getetmodelName.map((val)=>{
                         return (<option id={val._id} value={val._id}>{val.model_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder={updateModel} className='add-cat-inp' onChange={(e)=>{
                          setModelName(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={updateModelname}>Submit</button>
                      </div>
                      </div>
                </div>:""}

                {modelOpaeration1==="deletemodels" ? 
                <div className='veh-opr-reslt-loc-add'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Models</label>
                        </div>
                        <div className='cat-name-inp' style={{marginTop:"5px",width:"250px"}}>
                    <select className='select-inp' name="deleteModel" id="" onChange={(e)=>{onMakeselected(e.target.value)}}>
                    <option value="" selected>All Makes</option>
                      {makeName.map((val)=>{
                         return (<option value={val.makes_name}  >{val.makes_name}</option>)
                          })}                
                    </select>
                    </div>
                    <div className='cat-name-inp' style={{marginTop:"5px",width:"250px"}}>
                    <select className='select-inp' name="selectMake" id="" onChange={(e)=>{onModelselected(e.target.value)}}>
                    <option value="" selected>All Models</option>
                      {getetmodelName.map((val)=>{
                         return (<option id={val._id} value={val._id}>{val.model_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={deleteModelName}>Submit</button>
                      </div>
                      </div>
                </div>:""}

      {modelOpaeration1==="viewmodels" ? <div className='veh-opr-reslt-loc-add' >
      <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">View Makes and Models</label>
                        </div>
        <div className='cat-name-inp' style={{marginTop:"5px",width:"250px"}} ><select className='select-inp' name="viewVehicleCategory" id="" onChange={(e)=>{onMakeselected(e.target.value)}}>
                    <option value="" selected>All Makes</option>
      {makeName.map((val)=>{
        
                 return (
                     
                   <option value={val.makes_name}>{val.makes_name}</option>
                   
                 )
                 
             })}

           </select>
           </div>
            <div className='cat-name-inp' style={{marginTop:"5px",width:"250px"}}><select className='select-inp' name="viewVehicleCategory" id="" onChange={(e)=>{}}>
           <option value="" selected>All Models</option>
            {getetmodelName.map((val)=>{
            return (
                   
             <option value={val.model_name}>{val.model_name}</option>
                   
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
