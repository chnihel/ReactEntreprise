import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="left-sidebar">
    {/* Sidebar scroll*/}
    <div>
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <a href="./index.html" className="text-nowrap logo-img">
          <img src="../assets/images/logos/téléchargement.png" alt />
        </a>
        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <i className="ti ti-x fs-8" />
        </div>
      </div>
      {/* Sidebar navigation*/}
      <nav className="sidebar-nav scroll-sidebar" data-simplebar>
        <ul id="sidebarnav">
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-6" />
            <span className="hide-menu">Home</span>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="./index.html" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:home-smile-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Dashboard</span>
            </a>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-6" />
            <span className="hide-menu">PUBLICATIONS</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/addPublication" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:layers-minimalistic-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Create publication</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/publicationList" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:danger-circle-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Publication's list</span>
            </Link>
          </li>
  {/* 
          <li className="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" className="nav-small-cap-icon fs-6" />
            <span className="hide-menu">AUTH</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/login" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:login-3-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Login</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link"  to="/register" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:user-plus-rounded-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Register</span>
            </Link>
          </li> */}
      {/*     <li className="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" className="nav-small-cap-icon fs-4" />
            <span className="hide-menu">EXTRA</span>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="./icon-tabler.html" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:sticker-smile-circle-2-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Icons</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="./sample-page.html" aria-expanded="false">
              <span>
                <iconify-icon icon="solar:planet-3-bold-duotone" className="fs-6" />
              </span>
              <span className="hide-menu">Sample Page</span>
            </a>
          </li> */}
        </ul>
{/*         <div className="unlimited-access hide-menu bg-primary-subtle position-relative mb-7 mt-7 rounded-3"> 
          <div className="d-flex">
            <div className="unlimited-access-title me-3">
              <h6 className="fw-semibold fs-4 mb-6 text-dark w-75">Upgrade to pro</h6>
              <a href="#" target="_blank" className="btn btn-primary fs-2 fw-semibold lh-sm">Buy Pro</a>
            </div>
            <div className="unlimited-access-img">
              <img src="../assets/images/backgrounds/rocket.png" alt className="img-fluid" />
            </div>
          </div>
        </div> */}
      </nav>
      {/* End Sidebar navigation */}
    </div>
    {/* End Sidebar scroll*/}
  </aside>
  )
}

export default Sidebar
