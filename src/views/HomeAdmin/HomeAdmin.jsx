import React from 'react'
import SideBarAdmin from '../../components/SideBarAdmin'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const HomeAdmin = () => {
  return (
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  {/* Sidebar Start */}
<SideBarAdmin/>
  {/*  Sidebar End */}
  {/*  Main wrapper */}
  <div className="body-wrapper">
    {/*  Header Start */}
  <Navbar/>
    {/*  Header End */}
    <div className="container-fluid">
  
        <Outlet/>        

    <Footer/>

      </div>
  
  </div>
</div>
  )
}

export default HomeAdmin
