import React from 'react'

function PasswordOne(props) {
  return (
    <div class="form-group">
        <label for="exampleInputPassword4">
          {props.title}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
        <input 
          type="password" 
          class="form-control" 
          id={props.id}
          name={props.name}
          placeholder={props.placeHolder}
          onChange={props.onChange}
        />
        {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  )
}

export default PasswordOne
