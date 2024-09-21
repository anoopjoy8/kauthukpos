import React from 'react'

function EmailOne(props) {
  return (
    <div className="form-group">
      <label for="exampleInputEmail3">
        {props.title}
        {props.required && <span className="text-danger ml-1">*</span>}
      </label>
      <input 
        type="email" 
        className="form-control" 
        id={props.id}
        name = {props.name}
        placeholder={props.placeHolder}
        onChange={props.onChange}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  )
}

export default EmailOne
