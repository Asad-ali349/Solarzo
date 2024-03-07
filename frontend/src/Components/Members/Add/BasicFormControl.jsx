import React, { Fragment, useState } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { H5 ,Btn} from '../../../AbstractElements'
import {CardHeader,CardFooter} from 'reactstrap';

import { Data } from './Data';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AddTeam } from '../../../Redux/Slices/teamSlice';

const BasicFormControlClass = () => {
    const navigate=useNavigate();
    const {loading}=useSelector(state=>state.team);
    const dispatch=useDispatch();

    const validationSchema = yup.object({
        name: yup.string('Only Alphabets are allowed').required().min(3,'name must have 3 or more characters'),
        email: yup.string().required().email(),
        password : yup.string().required().min(8,"password length must be greater than 7"),
        phone : yup.string().required(),
        street : yup.string(),
        city: yup.string(),
        zip: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '', 
            password: '', 
            phone:'',
            street:'',
            city:'',
            zip:'',  
            profile_image: null,
            role:"team"
        },
        validationSchema: validationSchema,
     
        onSubmit: async (values) => {
                console.log('submit')
                dispatch(AddTeam(values));
                formik.resetForm()
            },
       });
    return (
        <Fragment>
            <Card>
            <CardHeader > <H5> Add New Team</H5>   </CardHeader>
                <Form className="form theme-form" onSubmit={formik.handleSubmit} method='post'>
                    <CardBody>
                        <Row className='mb-3'>

                        { Data.map((item, index) => ( 
                            <Col  md="4" key={index}>
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlInput1">{item.title}</Label>
                                    { item.type =='file' ?
                                    <>
                                        <label htmlFor="fileInput" style={{ cursor: 'pointer',border:'1px solid #dee2e6',width:'100%',height:'40px',borderRadius:'5px',padding:'7px' }}>
                                        {/* Custom text for the file input */}
                                        Choose File: {formik.values[item.name]!=null ? formik.values[item.name].name: 'No File choosed...'}
                                        </label>
                                        <Input className="form-control" id="fileInput" style={{ display: 'none' }}  name={item.name} type={item.type} onChange= {(e) => formik.setFieldValue(item.name, e.currentTarget.files[0]) } />
                                    </>
                                   :
                                    <Input className="form-control" name={item.name} type={item.type} placeholder={item.placeholder}  value={formik.values[item.name]} onBlur={formik.handleBlur} onChange={formik.handleChange } />
                                    }            
                                    <small style={{color : "red"}}>  {formik.touched[item.name] && formik.errors[item.name] }</small>
                                </FormGroup>
                            </Col>

                         ))}

                        </Row>
                      
                    </CardBody>
                    <CardFooter className="text-end">
                        <button className='btn btn-primary mx-1' type='submit' disabled={loading}>{loading?'Adding...':'Add Team'}</button>
                        <button className='btn btn-primary mx-1' type='button' onClick={()=>formik.resetForm()}>Cancel</button>
                    </CardFooter>
                </Form>
            </Card>
        </Fragment>
    );
};

export default BasicFormControlClass;