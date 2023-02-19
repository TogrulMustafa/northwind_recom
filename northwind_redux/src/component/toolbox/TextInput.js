import React from 'react'

const TextInput = ({name, label, onChange, placeholder, value, error}) => {

    let wrapperClass = 'form-group'
    if (error && error.length > 0) {
        wrapperClass += ' has-error'
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className='field'>
                <input name={name} placeholder={placeholder} onChange={onChange} value={value} type='text' className='form-control'/>
                {error && <div className='alert alert-danger'>{error}</div>}
            </div>
        </div>
    )
}

export default TextInput

