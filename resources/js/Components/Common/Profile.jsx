import React from 'react'
import face from '../../../Assets/images/user_large.jpg'
import '../../../Assets/css/developer.css'

function Profile() {
  return (
    <li className="nav-item nav-profile border-bottom">
      <a href="#" className="nav-link flex-column">
          <div className="nav-profile-image">
            <img src={face} alt="profile"/>
          </div>
          <div className="nav-profile-text d-flex ms-0 mb-3 flex-column">
            <span className="font-weight-semibold mb-1 mt-2 text-center">{localStorage.getItem("currentUserName")}</span>
          </div>
      </a>
    </li>
  )
}

export default Profile