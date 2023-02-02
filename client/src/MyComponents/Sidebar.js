import React,{ useEffect, useState } from 'react'
import * as FaICons from 'react-icons/fa'
import * as AiICons from 'react-icons/ai'
import * as IoICons from 'react-icons/io'
import * as RiICons from 'react-icons/ri'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import '../Mystyles/Pagestyles/sidebar.css'
import Axios from 'axios'
 

export default function Sidebar() {
 
  const Nav =styled.div`
  background: white;
  height: 60px;
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `;
 const NavIcon=styled(Link)`
 margin-left: 2rem;
 font-size: 2rem;
 height:80px;
 display: flex;
 justify-content: flex-start;
 align-items: center;
 
 `;
 
 const SidebarNav= styled.nav`
 background: white;
 width: 250px;
 height: 100vh;
 display: flex;
 justify-content: center;
 position: fixed;
 top: 0;
 
 left: ${({sidebar})=>(sidebar ? '0' :'-100%')};
 transition: 500ms;
 z-index:10 ;
 `;
 
 const SidebarWrap= styled.div`
 width: 100%;
 
 `;
 
 const [sidebar ,setSidebar] = useState(false);
  const showSidebar= () => setSidebar(!sidebar);

 console.log(SidebarData);

  return (
   <>
   <div style={{ width: "100%", overflow: "hidden" }}>
                    {  /*    <Nav>
                    <NavIcon to='#'>
                    <FaICons.FaBars onClick={showSidebar}/>   
                    </NavIcon>  
                      <SidebarNav sidebar={sidebar}>
                      <SidebarWrap>
                      <NavIcon to='#'>
                    <AiICons.AiOutlineClose  onClick={showSidebar}/>   
  </NavIcon>*/ }
                        
                      <div className='' style={{width:"250px"}}>
                            { SidebarData.map((item, index) => {
                              return <SubMenu item={item} key={index}/>;
                              })
                            }
                      </div>
                      
                       {/*  </SidebarWrap>
                        </SidebarNav>
                          </Nav>*/}
                      </div>
   </>
  )
}