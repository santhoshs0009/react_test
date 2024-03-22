
import React from 'react'

export const FormInput = (props) => {
    const { htmlFor, label, type, name, id, value, placeholder, required, onChange } = props;

    return (
        <>
            <div className='mb-3 form-group'>
                <label htmlFor={htmlFor} className='form-label'>
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className='form-control'
                    required={required}
                />
            </div>
        </>
    )
}

export const FormSelect = (props) => {

    const { value, defaultOption, required, onChange, dataOptions, schemas } = props;

    const filteredOptions = dataOptions.filter(option => {
        return !schemas.some(schema => schema.value === option && schema.value !== value);
    });

    return (
        <>
            <select
                value={value}
                onChange={onChange}
                className="form-select me-2"
                aria-label="Default select example"
                required={required}
            >
                <option className='hide' value="">{defaultOption}</option>
                {filteredOptions?.map((option, i) => (
                    <option
                        key={i}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </>
    )
}
