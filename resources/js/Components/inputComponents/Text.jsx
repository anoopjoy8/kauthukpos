import React from 'react'

function Text(props) {
  return (
    <div className="form-group">
        <label for="exampleInputUsername1">
          {props.title}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
        <input 
          type="text" 
          className="form-control" 
          id={props.id}
          name={props.name}
          placeholder={props.placeHolder}
          onChange={props.onChange}
        />
        {props.error && <div className="invalid-feedback d-block">{props.error}</div>}
    </div>
  )
}

export default Text
