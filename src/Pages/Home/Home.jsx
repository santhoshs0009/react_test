import axios from 'axios';
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { OffCanva } from '../../Component/OffCanva/OffCanva';
import { FormInput, FormSelect } from '../../Component/Inputs/Inputs';
import { DeleteIcon, LessThenIcon } from '../../Assets/Svg';

const availableOptions = ["first_name", "last_name", "gender", "age", "account_name", "city", "state"];

export default function Home() {
    let initialValue = {
        segment_name: '',
        schema: [{ id: Math.floor(Math.random() * 9), value: '' }]
    }
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    const api = "https://api.nationalize.io/";

    // save segment
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSchema = () => {
        setFormData(prevState => ({
            ...prevState,
            schema: [...prevState.schema, { id: Date.now(), value: '' }]
        }));
    };

    const handleSchemaChange = (id, event) => {
        const selectedValue = event.target.value;
        const updatedSchemas = formData.schema.map(schema =>
            schema.id === id ? { ...schema, value: selectedValue } : schema
        );
        setFormData(prevState => ({
            ...prevState,
            schema: updatedSchemas
        }));
    };

    // delete schema
    const handleRemoveSchema = (id) => {
        const updatedSchemas = formData.schema.filter(schema => schema.id !== id);
        setFormData(prevState => ({
            ...prevState,
            schema: updatedSchemas
        }));
    };

    // submit form data
    const handleSubmits = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        setShow(false);
        setFormData(initialValue);
    };

    // submit form data
    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedSchema = formData.schema.map(item => {
            const key = item.value;
            const value = item.value.replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
            return { [key]: value };
        });

        const data = {
            segment_name: formData.segment_name,
            schema: formattedSchema
        };

        console.log('Form Data:', data);
        // setShow(false);
        // setFormData(initialValue);
    };


    return (
        <>
            <button onClick={() => setShow(true)}>Save segment</button>

            <OffCanva show={show} handleClose={() => setShow(false)} placement="end">
                <div className='header'>
                    <span onClick={() => setShow(false)} >
                        <LessThenIcon />
                    </span>
                    <h2>Saving Segment</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='body'>
                        <FormInput
                            htmlFor="segment_name"
                            label="Enter the Name of the Segment"
                            type="text"
                            name="segment_name"
                            id="segment_name"
                            placeholder='Name of the Segment'
                            value={formData.segment_name}
                            onChange={handleInputChange}
                            required={true}
                        />

                        <p className='my-3'>To save your segment, you need to add the schema to build the query</p>
                        <div className='d-flex align-items-center justify-content-end mb-3'>
                            <span className='me-3 d-flex align-items-center'> <span className='round_circle green'></span> - User Traits</span>
                            <span className='d-flex align-items-center'><span className='round_circle red'></span> - Group Traits</span>
                        </div>

                        {formData.schema.map((schema, i) => (
                            <div key={schema.id} className="d-flex align-items-center mb-3">
                                <span className={`round_circle ${schema.value ? 'green' : 'red'}`} ></span>
                                <FormSelect
                                    value={schema.value}
                                    onChange={e => handleSchemaChange(schema?.id, e)}
                                    required={true}
                                    defaultOption="Add schema to segment"
                                    dataOptions={availableOptions}
                                    schemas={formData?.schema}
                                />
                                <span onClick={() => handleRemoveSchema(schema.id)}>
                                    <DeleteIcon />
                                </span>
                            </div>
                        ))}
                        <span className='add' onClick={handleAddSchema}> + Add new schema</span>
                    </div>

                    <div className='footer'>
                        <button className='btn btn-success' type='submit'>Save the Segment</button>
                        <button className='btn ms-2' onClick={() => setShow(false)}>Cancel</button>
                    </div>
                </form>
            </OffCanva>


            {/* Displaying formData object */}
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </>
    );
}
