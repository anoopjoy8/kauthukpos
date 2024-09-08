import React from 'react'
import logo from '../../../Assets/images/site-logo-product.png'
import logomini from '../../../Assets/images/favicon.png'
import SearchDashboard from './SearchDashboard'
function CompanyLogo() {
  return (
    <li className="nav-item pt-3 active">
        <a className="nav-link d-block" href="index.html">
        <img className="sidebar-brand-logo" src={logo} alt=""/>
        <img className="sidebar-brand-logomini" src={logomini} alt=""/>
        <div className="small font-weight-light pt-1">Responsive Dashboard</div>
        </a>
        <SearchDashboard/>
    </li>
  )
}

export default CompanyLogo
