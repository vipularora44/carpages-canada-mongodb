import React, { useEffect,useState } from 'react'
import {useNavigate } from 'react-router-dom';

import listingsAudit from '../images/car_icon_1.webp';
import products from '../images/products-icon.jpg';
import users_pic from '../images/user1.jfif';
import private_seller from '../images/private_seller.jpg';
import dealer_listing from '../images/dealer_sale.jpg';
import private_user from '../images/user2.jfif';
import sold_out from '../images/sod_out.jpg';
import Axios from 'axios';

export default function DashBoard() {

  const [listings,setListings]=useState([]);
  const [privatelistings,setprivateListings]=useState([]);
  const [dealerlistings,setdealerListings]=useState([]);
  const [soldlistings,setsoldListings]=useState([]);
  const [dealers,setdealers]=useState([]);
  const [privateSellers,setprivateSellers]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    Axios.get("http://localhost:3001/listings/get_allListings").then((res)=>{
      console.log(res.data);
      setListings(res.data);
     });
     Axios.post("http://localhost:3001/listings/FilterByListingSellertype",{ListingSellertype:"sold"}).then((res)=>{
      console.log(res.data);
      setsoldListings(res.data);
     });
     Axios.post("http://localhost:3001/listings/FilterByListingSellertype",{ListingSellertype:"private"}).then((res)=>{
      console.log(res.data);
      setprivateListings(res.data);
     });
     Axios.post("http://localhost:3001/listings/FilterByListingSellertype",{ListingSellertype:"dealer"}).then((res)=>{
      console.log(res.data);
      setdealerListings(res.data);
     });
     Axios.post("http://localhost:3001/users/getDealerByType",{userType:"private"}).then((res)=>{
      console.log(res.data);
      setprivateSellers(res.data);
     });
     Axios.post("http://localhost:3001/users/getDealerByType",{userType:"dealer"}).then((res)=>{
      console.log(res.data);
      setdealers(res.data);
     });
  },[])




  return (
    <div style={{flex:"1 1 auto"}}>
  <div style={{display:"flex",flexFlow:"column"}}>
    <div style={{marginLeft:"auto",flexFlow:"row",marginRight:"auto",width:"95%",padding:"32px 32px 32px 16px",justifyContent:"space-between",display:"flex",flexWrap:"wrap"}}>
      
   
          <div class="card" style={{width:"18rem"}}>
            <img src={listingsAudit} class="card-img-top" alt="..." style={{height:"200px"}}/>
            <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title">Listings </h5>
            <a onClick={()=>{navigate("/search-results")}} class="btn btn-primary" style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{listings.length}</strong> Listings</a>
            </div>
          </div>

         <div class="card" style={{width:"18rem"}}>
          <img src={sold_out} class="card-img-top" alt="..." style={{height:"200px"}}/>
          <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>Sold Listings</h5>
            <a onClick={()=>{navigate("/searchResults/sold")}} class="btn btn-primary" style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{soldlistings.length}</strong> Sold Listings</a>
          </div>
    </div>s
     <div class="card" style={{width:"18rem"}}>
     <img src={users_pic} class="card-img-top" alt="..." style={{height:"200px"}}/>
          <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title">Dealers</h5>
            <a onClick={()=>{navigate("/searchResults/dealer")}} class="btn btn-primary" style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{dealers.length}</strong> Dealers</a>
          </div>
    </div> 
      
  </div>
  <div style={{marginLeft:"auto",flexFlow:"row",marginRight:"auto",width:"95%",padding:"32px 32px 32px 16px",justifyContent:"space-between",display:"flex",flexWrap:"wrap"}}>
   
          <div class="card" style={{width:"18rem"}}>
            <img src={private_seller} class="card-img-top" alt="..." style={{height:"200px"}}/>
            <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title">Private Listings</h5>
            <a onClick={()=>{navigate("/searchResults/private")}} class="btn btn-primary"style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{privatelistings.length}</strong> Private Listings </a>
            </div>
          </div>

         <div class="card" style={{width:"18rem"}}>
          <img src={dealer_listing} class="card-img-top" alt="..." style={{height:"200px"}}/>
          <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title">Dealer Listings</h5>
            <a onClick={()=>{navigate("/showDealer/dealer")}} class="btn btn-primary" style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{dealerlistings.length}</strong> Dealer Listings </a>
          </div>
    </div>
     <div class="card" style={{width:"18rem"}}>
     <img src={private_user} class="card-img-top" alt="..." style={{height:"200px"}}/>
          <div class="card-body" style={{alignItems:"center",display:"flex",flexFlow:"column"}}>
            <h5 class="card-title">Private Sellers</h5>
            <a onClick={()=>{navigate("/showDealer/private")}} class="btn btn-primary" style={{width:"100%",padding:"5px 24px"}}>Find Out <strong>{privateSellers.length} Private Sellers</strong></a>
          </div>
    </div> 
      
  </div>
  </div>
  </div>
  )
}
