import React ,{useState,useEffect} from 'react'
import  '../../../Mystyles/admintabs.css'
import  '../../../Mystyles/Pagestyles/vehiclecategory.css'
import  Axios  from 'axios';

export default function VehicleCategory() {

    
  const [category, setCategory] = useState("");
  const [operation1, setOperation1] = useState("");
  const [updatecat, setupdatecat] = useState("");
  const [vehCategories, setVehCategories] =useState([]);
  
  
  const onAddVehicleCategory = (e) =>
  {
    Axios.get("https://carpages-canada-mongodb.onrender.com/categories/viewcategory").then((response) =>{
      console.log(response.data);
     setVehCategories(response.data); 
  });
      if(e=="addvehiclecategory")
      {
        setOperation1(e);
        console.log("Add working" + e);
      }
      else if(e=="updatevehiclecategory")
      {
        setOperation1(e);
        console.log("Update working" + e);
      }
      else if(e=="viewvehiclecategory")
      {
        setOperation1(e);
        console.log("view working" + e);
      }
      else
      {
        setOperation1(e);
        console.log("Delete working" + e);
      }
      
  }

  const onCategorySelected = (e) =>
    {
               setupdatecat(e);
        
    }
    const updateCategory = () =>{
        console.log("working");
        Axios.post("https://carpages-canada-mongodb.onrender.com/categories/updatevehcategory",{
        category:category,previouscategory:updatecat
        }).then((response)=>{

        console.log(response.data);
        })
       };
       const deleteCategory = () =>{
        console.log("working");
        Axios.post("https://carpages-canada-mongodb.onrender.com/categories/deletevehcategory",{
        category:updatecat
        }).then((response)=>{

        console.log(response.data);
        })
       };
 

        const submitCategory = () =>{
            console.log("working");
            Axios.post("https://carpages-canada-mongodb.onrender.com/categories/create-category",{
            category:category
            }).then((response)=>{

            console.log(response.data);
            })
           };

  return (
    <div className='veh-cat-main-cont' >
      <div className='veh-cat-opr-cnt'>
          <div className='veh-cat-main-cont2'>               
                <div className='veh-opr'>
                <span>Select Operation</span>
                </div>
                <div className='veh-opr1'>
                    <select className='select-inp' name="operation" id="" onChange={(e)=>{onAddVehicleCategory(e.target.value)}}>
                    <option value="" selected>Choose Operation</option>
                                        
                        <option value="viewvehiclecategory">View Vehicle Category</option>
                        <option value="addvehiclecategory" >Add Vehicle Category</option>
                        <option value="updatevehiclecategory">Update Vehicle Category</option>
                        <option value="deletevehiclecategory">Delete Vehicle Category</option>
                    </select>
                </div>
            </div>
      {operation1==="addvehiclecategory" ? 
      <div className='veh-opr-reslt' >
                  <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Add Category</label>
                        </div>
                      <div className='cat-name-inp'>
                        <input type="text" placeholder='Type Here' className='add-cat-inp' onChange={(e)=>{
                          setCategory(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={submitCategory}>Submit</button>
                      </div>
                  </div>
     </div> :""}

                  {operation1==="updatevehiclecategory" ? 
                <div className='veh-opr-reslt'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Update Category</label>
                        </div>
                        <div className='cat-name-inp'  style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onCategorySelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Catgoery</option>
                      {vehCategories.map((val)=>{
                         return (<option value={val.category_name}  >{val.category_name}</option>)
                          })}                
                    </select>
                    </div>
                      <div className='cat-name-inp' style={{marginTop:"10px"}}>
                        <input type="text" placeholder={updatecat} className='add-cat-inp' onChange={(e)=>{
                          setCategory(e.target.value);
                        }}/>
                      </div>
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={updateCategory}>Submit</button>
                      </div>
                      </div>
                </div>:""}

                {operation1==="deletevehiclecategory" ? 
                <div className='veh-opr-reslt-del'> 
                   <div className='add-cat-container'  >
                        <div className='add-cat-lb'>
                            <label htmlFor="">Delete Category</label>
                        </div>
                        <div className='cat-name-inp' style={{marginTop:"5px"}}>
                    <select className='select-inp' name="updateVehicleCategory" id="" onChange={(e)=>{onCategorySelected(e.target.value)}}>
                    <option value="" selected>Choose Vehicle Category</option>
                      {vehCategories.map((val)=>{
                         return (<option value={val.category_name}  >{val.category_name}</option>)
                          })}                
                    </select>
                    </div>
                      
                      <div className='cat-name-inp' >
                        <button className='add-cat-sb' onClick={deleteCategory}>Submit</button>
                      </div>
                      </div>
                </div>:""}

      {operation1==="viewvehiclecategory" ? <div className='veh-opr-reslt-view' >
          <div className='add-cat-container'>
            <div className='add-cat-lb'>
         <label htmlFor="">Vehicle Categories</label>
          </div>
        <div className='cat-name-inp' style={{marginTop:"5px"}}><select className='select-inp' name="viewVehicleCategory" id="" onChange={(e)=>{}}>
                    <option value="" selected>All Vehicle Category</option>
      {vehCategories.map((val)=>{
        
                 return (
                     
                   <option value={val.category_name}  >{val.category_name}</option>
                   
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
 