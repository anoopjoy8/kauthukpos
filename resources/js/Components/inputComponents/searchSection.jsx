import React from 'react'
import TextTwo from './TextTwo';
import DropDownTwo from './DropDownTwo';
function SearchSection(props) {
    const inputFields = props.searchInputFields || [];
    const handleInputChange = (event) =>{
        props.onChange(event);
    }
    const onCancelButtonClick = ()=>{
        props.onClick();
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit();
    }
    return (
        <>
            <h4 className="card-title">{props.title}</h4>
            <form className="forms-sample" onSubmit={handleSubmit}>
                <div className='row'>
                    {inputFields.map((field, index) => (
                        <div className='col-md-6' key={field.id || index}>
                            <div className="form-group row">
                                {(field.type === 'text' || field.type === 'numeric') && (
                                    
                                        <TextTwo type={field.type}
                                            title = {field.title}
                                            className="form-control"
                                            name={field.name}
                                            id={field.id} 
                                            placeHolder={field.placeHolder}
                                            onChange = {handleInputChange}
                                        />
                                  
                                )}
                                {(field.type === 'drop-down') && (
                                    <DropDownTwo title = {field.title}
                                        name={field.name}
                                        id={field.id}
                                        placeHolder = {field.placeHolder}
                                        data={field?.data || []}
                                        required = "false"
                                        error=''
                                        onChange={handleInputChange}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary me-2"> Submit </button>
                <button type="button" className="btn btn-light" onClick={onCancelButtonClick}>Cancel</button>
            </form>
        </>
  )
}

export default SearchSection
