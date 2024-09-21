import "@mdi/font/css/materialdesignicons.min.css";
import {React, useState} from 'react'
import '../../../Assets/css/checkbox.css'
function Checkbox(props) {
    return (
        <div className="form-check">
            <div className="check-padding">
                <input className="form-check-input"
                    name={props.name}
                    type="checkbox" 
                    id={props.id}
                    value={props.value}
                    checked={props.isChecked}
                    onClick={props.onChange}
                />
                <label className="form-check-label" 
                    for="flexCheckDefault"
                >
                    {props.title}
                </label>
            </div>
        </div>
    )
}

export default Checkbox