import React ,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const SidebarLink = styled.div`
display: flex;
color: grey;
border-left: 2px solid transparent;
justify-content: space-between;
align-items: center;
width: 250px;
padding: 20px;
height: 60px;
text-decoration: none;
list-style: none;
font-size: 18px;

&:hover{
background: rgb(230, 234, 236);

color: black;
border-left: 2px solid rgb(62, 185, 62);
cursor: pointer;

}
`;
const DropdownLink =styled(Link)`
background: #414757;
height: 60px;
width: 250px;
padding-left:2rem;
text-decoration: none;
display: flex;
align-items: center;
color: #f5f5f5;
font-size: 18px;

&:hover{
background: #252831;
cursor: pointer;
}
`; 
const SidebarLabel = styled.span`
margin-left: 16px;
`;

export default function SubMenu({item}) {

  
    const [subnav, setSubnav]=useState(false);
    
    console.log({item});
    const showSubNav= () => setSubnav(!subnav);
  
  return (
    <>
    <div className='1111111'>
      
      <SidebarLink onClick={item.subNav && showSubNav}  >
       
      
       {
       <div className='1234'>
           {item.icon}
           <SidebarLabel>{item.title}</SidebarLabel>
       </div>}
      { <div>
      
           {
           item.subNav  && subnav 
           ? item.iconOpen 
           : item.subNav 
           ? item.iconClosed 
           : null}
       </div>
       
       }
      
      </SidebarLink>
      {
      
      item.subNav && subnav ? item.subNav.map((item, index) =>{
       console.log(item + "..." +index);
        
      return (
        <>

        <div className='56789'>
          {
          <DropdownLink to="#" key={index} state={item.id} >
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>

          </DropdownLink>}
          </div>

          
          </>
      )

      }) :""}
      </div>

     
    </>
  )
}

