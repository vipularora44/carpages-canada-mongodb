import React from 'react'
import AppHeader from './AppHeader'
import FooterMain from './FooterMain'
import MainSearch from './MainSearch'
import MainVehicleSearch from './MainVehicleSearch'

export default function Home() {
  return (
  <>     
       <div> 
          <AppHeader></AppHeader>
          <MainSearch></MainSearch>
          <MainVehicleSearch></MainVehicleSearch>
          <FooterMain></FooterMain>
      </div>
      </>
    
    
  )
}
