import React from 'react'

function DropDownTwo(props) {
  const options = Array.isArray(props.data) ? props.data : [];
  return (
    <>
      <label className="col-sm-3 col-form-label">{props.title}</label>
      <div className="col-sm-9">
          <select 
              className="form-control"
              name={props.name}
              id = {props.id}
              onChange={props.onChange}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
      </div>
    </>
  )
}

export default DropDownTwo
