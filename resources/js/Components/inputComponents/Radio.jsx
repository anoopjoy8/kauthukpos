import React from 'react'

function Radio(props) {
  return (
    <div className="form-group row">
        <label className="col-sm-3 col-form-label">{props.title}</label>
        {props.options.map((item, index) => (
            <div className="col-sm-4">
                <div className="form-check">
                <label className="form-check-label">
                    <input type="radio" 
                        className="form-check-input" 
                        name={props.name} 
                        id={props.id} 
                        value={item.value}
                        onChange={props.onChange}
                        checked={props.checked === item.value}
                    /> 
                        {item.title} 
                    <i className="input-helper"></i>
                </label>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Radio