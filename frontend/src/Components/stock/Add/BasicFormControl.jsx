import React, { Fragment, useState } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5, Btn } from '../../../AbstractElements'
import { CardHeader, CardFooter } from 'reactstrap';
import { TiDeleteOutline } from "react-icons/ti";

import { Data } from './Data';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AddStock } from '../../../Redux/Slices/stockSlice';

const BasicFormControlClass = () => {
    const navigate = useNavigate();
    const [dynamicFields, setDynamicFields] = useState([
    ])
    const dispatch=useDispatch();
    const {loading}=useSelector(state=>state.stock);

    const handleAddMoreField = () => {
        setDynamicFields([...dynamicFields, {
            name: '',
            value: ''
        }])
    }
    const handleRemoveField = (index) => {
        setDynamicFields(
            dynamicFields.filter((data,field_index)=> {
                return field_index!==index
            })
        );
    }
    const handleOnChange = (e,index) => {
        let data=[...dynamicFields];
        data[index]={...data[index],[e.target.name]:e.target.value}
        setDynamicFields(data)
    }

    const validationSchema = yup.object({
        name: yup.string('Only Alphabets are allowed').required().min(2),
        quantity: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            dynamicFields.forEach((item)=>{ 
                values[item.name]=item.value
            })
            
            setDynamicFields([]);
            dispatch(AddStock(values));
            formik.resetForm()
        },
    });
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <H5>New Stock</H5>
                </CardHeader>
                <Form className="form theme-form" onSubmit={formik.handleSubmit} method='post'>
                    <CardBody>
                        <Row className='mb-3'>

                            {Data.map((item, index) => (
                                <Col md="4" key={index}>
                                    <FormGroup>
                                        <Label htmlFor="exampleFormControlInput1">{item.title}</Label>
                                        {item.type == 'file' ?
                                            <>
                                                <label htmlFor="fileInput" style={{ cursor: 'pointer', border: '1px solid #dee2e6', width: '100%', height: '40px', borderRadius: '5px', padding: '7px' }}>
                                                    {/* Custom text for the file input */}
                                                    Choose File: {formik.values[item.name] != null ? formik.values[item.name].name : 'No File choosed...'}
                                                </label>
                                                <Input className="form-control" id="fileInput" style={{ display: 'none' }} name={item.name} type={item.type} onChange={(e) => formik.setFieldValue(item.name, e.currentTarget.files[0])} />
                                            </>
                                            :
                                            <Input className="form-control" name={item.name} type={item.type} placeholder={item.placeholder} value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                        }
                                        <small style={{ color: "red" }}>  {formik.touched[item.name] && formik.errors[item.name]}</small>
                                    </FormGroup>
                                </Col>
                            ))}
                            <Col md={12}>
                                <button className='btn btn-dark' style={{ float: 'right' }} onClick={handleAddMoreField} type='button'>Add Field</button>
                            </Col>
                            {dynamicFields.map((field, index) => (
                                <Fragment key={index}>
                                    <Col md={4}>
                                        <Input
                                            className="form-control mt-3"
                                            placeholder="Enter Field Name"
                                            name='name'
                                            value={field.name}
                                            onChange={(e) => handleOnChange(e, index)}
                                            required
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Input
                                            className="form-control mt-3"
                                            placeholder="Enter Field Value"
                                            name='value'
                                            value={field.value}
                                            onChange={(e) => handleOnChange(e, index)}
                                            required
                                        />
                                    </Col>
                                    <Col md={4} className='mt-2'>
                                        <TiDeleteOutline
                                        className='mt-3'
                                            style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
                                            onClick={() => handleRemoveField(index)}
                                        />
                                    </Col>
                                </Fragment>
                            ))}
                        </Row>
                    </CardBody>
                    <CardFooter className="text-end">
                        <button className='btn btn-primary mx-1' type='submit' disabled={loading}>{loading?'Adding...':'Add Stock'}</button>
                        <button className='btn btn-primary mx-1' type='button' onClick={() => formik.resetForm()}>Cancel</button>
                    </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;