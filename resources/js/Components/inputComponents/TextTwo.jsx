import React from 'react'

function TextTwo(props) {
  return (
        <>
    
                <label className="col-sm-3 col-form-label">
                    {props.title}
                </label>
                <div className="col-sm-9">
                    <input 
                        type={props.type ? props.type : "text"} 
                        className="form-control" 
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        placeholder={props.placeHolder}
                        onChange={props.onChange}
                    />
                </div>
         
        </>
  )
}

export default TextTwo