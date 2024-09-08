import React from 'react'

function DropDownOne(props) {
  const options = Array.isArray(props.data) ? props.data : [];
  return (
    <div class="form-group">
        <label for="exampleSelectGender">
          {props.title}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
        <select class="form-control" 
          id={props.id}
          name={props.name}
          onChange={props.onChange}
        >
          {options.length === 0 ? (
            <option value="">Select</option>
          ) : (
            options.map((item, index) => (
              <option key={index} value={item.fldAdminUserRoleId}>
                {item.fldRoleTitle}
              </option>
            ))
          )}
        </select>
        {props.error && <div className="invalid-feedback d-block">{props.error}</div>}
    </div>
  )
}

export default DropDownOne
