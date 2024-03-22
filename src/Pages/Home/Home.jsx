import axios from 'axios';
import React, { useState } from 'react';
import { OffCanva } from '../../Component/OffCanva/OffCanva';
import { FormInput, FormSelect } from '../../Component/Inputs/Inputs';
import { DeleteIcon, LessThenIcon } from '../../Assets/Svg';

const availableOptions = ["First Name", "Last Name", "Gender", "Age", "Account Name", "City", "State"];

export default function Home() {
    let initialValue = {
        segment_name: '',
        schema: [{ value: '' }]
    }
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(initialValue);
    const api = "https://webhook.site/d6c6b4e5-9f0b-4b0f-a9b3-0d8b5c3a5a7c";

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedSchema = formData.schema.map(item => {
            const key = item.value.replaceAll(' ', '_').toLowerCase()
            const value = item.value;
            return { [key]: value };
        });

        const data = {
            segment_name: formData.segment_name,
            schema: formattedSchema
        };

        console.log('Form Data:', data);

        // api call
        await axios.post(api, data).then((res) => {
            console.log("res",res);
            setShow(false);
            setFormData(initialValue);
        }).catch((error) => {
            console.log(error);
        })

    };


    return (
        <>
            <button onClick={() => setShow(true)} className='btn canva_open'>Save segment</button>

            <OffCanva show={show} handleClose={() => setShow(false)} placement="end">
                <div className='offcanvas_data'>
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
                                <div key={i} className="d-flex align-items-center mb-3">
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
                            <button className='btn ms-2 cancel' onClick={() => setShow(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </OffCanva>

        </>
    );
}
