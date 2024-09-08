import React from 'react'
import '@mdi/font/css/materialdesignicons.min.css';
import '../../../Assets/css/style.css'
import Profile from './Profile';
import CompanyLogo from './CompanyLogo';
import Menu from './Menu';

function Sidebar(props) {
  return (
    <>
      <nav className={`sidebar sidebar-offcanvas ${props.mobileMenuView ? 'active' : ''}`} id="sidebar"> 
        <ul className="nav">
          <Profile/>
          <CompanyLogo/>
          <li className="pt-2 pb-1">
            <span className="nav-item-head">Menu List</span>
          </li>
          <Menu/>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
