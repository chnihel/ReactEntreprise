import React, { useEffect, useState } from 'react'
import auth from '../service/auth'
import { Link } from 'react-router-dom'
import Entreprise from '../service/entreprise'
import {  useSelector } from 'react-redux'



const Navbar = () => {
  const {user} = useSelector((state) => state.auth)

  const [Data , setData] = useState();
  const logOut=async()=>{
  // dispatch(logout())
  // window.location.href = '/login'; 

   const token=localStorage.getItem('persist:token') ?JSON.parse(localStorage.getItem('persist:token')).tokens :null
   const Token = JSON.parse(token)
   const refreshToken = Token?.refreshToken ;
   console.log("refresh token",refreshToken)
    if(!token){
      console.log('not access token found to logout')
      return
    }

console.log('Refresh token:', refreshToken);
    try {

      await auth.logOut(refreshToken);
      console.log('Logout successful');
      localStorage.removeItem('persist:token'); 
      
      window.location.href = '/login'; 
      
    } catch (error) {
      console.error('Logout failed:', error);
    } 


  }

  const getEntrepriseById =async ()=>{
      try {
          //const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
          const logo=user.logo ;
    /*   const id=entreprise?.user?._id;
        const response = await Entreprise.getEntrepriseById(id); */
        setData(user);
        console.log("Entreprise recupérée avec succès LOGO :",logo);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image :", error);
    }
  }
      useEffect(() => {
    getEntrepriseById()  
  },[])
  return (
      <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
              <i className="ti ti-menu-2" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-icon-hover" href="javascript:void(0)">
              <i className="ti ti-bell-ringing" />
              <div className="notification bg-primary rounded-circle" />
            </a>
          </li>
        </ul>
        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
          {/*   <a href="#" target="_blank" className="btn btn-primary me-2"><span className="d-none d-md-block">Check Pro Version</span> <span className="d-block d-md-none">Pro</span></a>
            <a href="#" target="_blank" className="btn btn-success"><span className="d-none d-md-block">Download Free </span> <span className="d-block d-md-none">Free</span></a> */}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={Data?.logo ? `http://localhost:3000/file/${Data?.logo}` : "../assets/images/logos/banks.png" } alt width={35} height={35} className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div className="message-body">
                  <Link to={'profile' }>
                  <button  className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6" />
                    <p className="mb-0 fs-3">My Profile</p>
                  </button>
                  
                  </Link>
                  <Link to={'updatePassword'}>
                    <button  className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-pencil fs-6" />
                    <p className="mb-0 fs-3">Update password</p>
                  </button></Link>
                
                {/*   <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-list-check fs-6" />
                    <p className="mb-0 fs-3">My Task</p>
                  </a> */}
                  <button onClick={()=>logOut()} className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
