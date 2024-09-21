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
          value={props.value || ''}
          name={props.name}
          onChange={props.onChange}
        >
          {options.length === 0 ? (
            <option value="">Select</option>
          ) : (
            <>
              <option value="">Select</option>
              {options.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </>
          )}
        </select>
        {props.error && <div className="invalid-feedback d-block">{props.error}</div>}
    </div>
  )
}

export default DropDownOne
