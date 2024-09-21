import React from 'react'
import "@mdi/font/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";

function SearchButton(props) {
  return (
    
    <span
      className="btn btn-primary btn-icon-text d-flex align-items-center search-link"
      onClick = {props.onClick}
    >
      <i class="mdi mdi-search-web btn-icon-prepend me-2"></i>
      {props.title}
    </span>
 
  )
}

export default SearchButton
