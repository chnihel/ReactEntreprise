import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  {/* Sidebar Start */}
<Sidebar/>
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

export default Home
