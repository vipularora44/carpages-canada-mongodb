
import React ,{useEffect,useState} from 'react'
import './App.css';

import Confirm_Account from './MyComponents/Confirm_Account';

import { SignupContext } from './Context/SignupContext';

import SearchResults from './MyComponents/SearchResults';
import Admin, { Signin } from './MyComponents/Admin';
import Sidebar from './MyComponents/Sidebar';
import ListingDetail from './MyComponents/ListingDetail';
import SignIn from './MyComponents/SignIn';
import SignUp from './MyComponents/SignUp';
import {Route,Routes} from 'react-router-dom';
import Home from './MyComponents/Home';
import AccordDemo from './MyComponents/AccordDemo';
import AccordianDemo2 from './MyComponents/AccordianDemo2';
import Accordian3 from './MyComponents/Accordian3';
import FindDealer from './MyComponents/FindDealer';
import DealerSignup from './MyComponents/DealerSignup';
import AdminLogin from './MyComponents/AdminLogin';
import UserPage from './MyComponents/UserPage';
import ShowDealer from './MyComponents/ShowDealer';
import AddCarListing from './MyComponents/AddCarListing';
import CheckDemo from './MyComponents/CheckDemo';
import DealerInventory from './MyComponents/DealerInventory';
import UpdateListing from './MyComponents/UpdateListing';
import ProtectedRoutes from './MyComponents/ProtectedRoutes';
import { useSelector,useDispatch } from 'react-redux';
import ForgotPassword from './MyComponents/ForgotPassword';
import SearchBarResults from './MyComponents/SearchBarResults';
import Team_login from './MyComponents/Team_login';
import { useCookies } from 'react-cookie';
import CreateTeam from './MyComponents/CreateTeam';
import Update_User from './MyComponents/Update_User';
import { async } from '@firebase/util';
import Axios from 'axios';



function App() {

  const [setmail,data1]=useState("abcdef@gmail.com");

  const isAuthorized=useSelector((state)=>state.SetUserData);
  const myDispatch=useDispatch();
  var Item;


 console.log("isAuthorized0...."+isAuthorized.auth);

  return (
    
     <>
      
      
      <SignupContext.Provider value={{setmail,data1}} >
    <Routes>
          <Route   path='/' element={<Home/>}></Route>
          <Route   path='/sidebar' element={<Sidebar/>}></Route>
          <Route   path='/accordian' element={<AccordDemo/>}></Route>
          <Route   path='/accordian2' element={<AccordianDemo2/>}></Route>
          <Route   path='/admin_login' element={<AdminLogin/>}></Route>
          <Route   path='/accordian3' element={<Accordian3/>}></Route>
          <Route   path='/signin1' element={<SignIn></SignIn>}></Route>
          <Route   path='/signup' element={<SignUp></SignUp>}></Route>
          <Route   path='/create-team-account' element={<CreateTeam></CreateTeam>}></Route>
          <Route   path='/dealer_signup' element={<DealerSignup/>}></Route>
          <Route   path='/confirm_account' element={<Confirm_Account></Confirm_Account>}></Route>
          <Route   path='/confirm_account/:token' element={<Confirm_Account></Confirm_Account>}></Route>
          <Route   path='/finddealer' element={<FindDealer/>}></Route>
          <Route   path='/search-results' element={<SearchResults></SearchResults>}></Route>
          <Route   path='/searchResults/:type' element={<SearchResults></SearchResults>}></Route>
          <Route   path='/searchResultsCity/:city' element={<SearchResults></SearchResults>}></Route>
          <Route   path='/searchResultsMake/:makeName' element={<SearchResults></SearchResults>}></Route>
          <Route   path='/searchResultsClass/:vehicleClass' element={<SearchResults></SearchResults>}></Route>
          <Route   path='/showdealer' element={<ShowDealer/>}></Route>
          <Route   path='/showDealer/:type' element={<ShowDealer/>}></Route>
          <Route   path='/carpages-team' element={<Admin></Admin>}></Route>
          <Route   path='/signin' element={<Team_login></Team_login>}></Route>
          <Route   path='/forgot-password/:what' element={<ForgotPassword/>}></Route>
       {  /* <Route   path='/user/:menu' element={<ProtectedRoutes isAuthorized={isAuthorized.auth} > <UserPage/></ProtectedRoutes>}></Route>
             <Route   path='/update_Listing/:ListingId' element={<UpdateListing/>}></Route>                                     
      */}
          
          
          <Route   path='/check_demo' element={<CheckDemo/>}></Route>
          <Route   path='/listing_detail/:listing_id/:seller_id' element={<ListingDetail/>}></Route>
          <Route   path='/dealer_inventory/:seller_id' element={<DealerInventory/>}></Route>
          <Route   path='/SearchBarResults' element={<SearchBarResults/>}></Route>
          <Route   element={<ProtectedRoutes isAuthorized={isAuthorized.auth} />}>
          <Route    path='/update-user/:UserId' element={<Update_User/>}/>
          <Route    path='/user/:menu' element={<UserPage/>}/>
          <Route    path='/addlisting' element={<AddCarListing/>}/>
          <Route    path='/update_Listing/:ListingId' element={<UpdateListing/>}/>
          </Route>
          
     </Routes>
     
     </SignupContext.Provider>
     
     
   
      
     
     
     
    
   </>
 
  );
}

export default App;
