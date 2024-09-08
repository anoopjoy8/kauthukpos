import React from 'react'
import "@mdi/font/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";

function AddButton(props) {
  return (
    <div className="col-md-6 d-flex justify-content-end">
      <Link
        className="btn btn-primary btn-icon-text d-flex align-items-center"
        to={props.link}
      >
        <i class="mdi mdi-plus btn-icon-prepend me-2"></i>
        {props.title}
      </Link>
    </div>
  )
}

export default AddButton
