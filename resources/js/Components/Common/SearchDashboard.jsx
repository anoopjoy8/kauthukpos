
import React from 'react'

function SearchDashboard() {
  return (
    <form className="d-flex align-items-center" action="#">
      <div className="input-group">
          <div className="input-group-prepend">
            <i className="input-group-text border-0 mdi mdi-magnify"></i>
          </div>
          <input type="text" className="form-control border-0" placeholder="Search"/>
      </div>
    </form>
  )
}

export default SearchDashboard