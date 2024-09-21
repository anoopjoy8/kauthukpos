import React from 'react'

function SubmitButton(props) {
  return (
    <>
      {props.type === 'add' ? (
        <button type="submit" className="btn btn-primary me-2">Submit</button>
      ) : (
        <button type="submit" className="btn btn-primary me-2">Update</button>
      )}
      <button className="btn btn-light">Cancel</button>
    </>
  )
}

export default SubmitButton
