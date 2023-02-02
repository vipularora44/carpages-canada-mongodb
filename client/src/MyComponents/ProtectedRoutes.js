import React from 'react'

import { Route , Navigate,Outlet} from 'react-router-dom'


export default function ProtectedRoutes({isAuthorized,children}) {
   console.log("isAuthorized"+isAuthorized);
    if(!isAuthorized)
    {
       return <Navigate to={"/"}/>
    }
    
    return children ? children :  <Outlet/>;

  return (
    
        <div></div>
  )
}
