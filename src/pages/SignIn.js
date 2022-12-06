import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Header from "../components/Header";
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';

const SignIn = () => {

    useEffect (() => {
        if (localStorage.getItem("token") !== null) {
            console.log("hellos");
            navigate("/dashboard");
        }
    }, [])
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const formInitialSchema = {
        email: '',
        password: ''
    }

    const formValidation = yup.object().shape({
        email: yup.string().required('Email is required').email('Please Enter Valid Email Address'),
        password: yup.string().required('Password is required')
    });

    return (
        <>
            <Header
                text="You Don't have an Account?"
                pageLink='/'
                pageName="Sign Up"
            />
            <section className='signup-page'>
                <div className='sign-left'>
                    <div className='left-content'>
                        <h1> Hello, Friend!</h1>
                        <p>
                            Enter your personal details and start journey with us</p>
                    </div>
                </div>
                <div className='sign-right'>
                    <div></div>
                    <div className='main-form'>
                        <h2>Sign In</h2>
                        <Formik initialValues={formInitialSchema}
                            validationSchema={formValidation}
                            onSubmit={async (values) => {
                                const data = {
                                    email: values.email,
                                    password: values.password,
                                }
                                // const token = localStorage.getItem("token");
                                const axiosConfig = {
                                    headers: {
                                        // Authorization: `Bearer ${token}`,
                                        'Accept': 'application/json',
                                    },
                                }

                                const response = await axios.post(
                                    'https://rsacarbook.jaraware.com/api/v1/login',
                                    data,
                                    axiosConfig)

                                    .then((response) => {
                                        if (response.data.data.token) {
                                            localStorage.setItem("token", response.data.data.token.accessToken);
                                            localStorage.setItem("first_name", response.data.data.user.first_name);
                                            localStorage.setItem("last_name", response.data.data.user.last_name);
                                            localStorage.setItem("profilepic", response.data.data.user.profilepic);
                                        }
                                        setSuccess('You have successfully Registered');
                                        setError('');
                                        navigate("/dashboard");

                                    })
                                    .catch((e) => {
                                        console.log('Error', data)
                                        setError('Email or Contact Number is aleready Exist');
                                        setSuccess('');
                                    });

                            }
                            }
                        >
                            <Form>
                                <div className='form-group'>
                                    <label>Enter Your Email<span className='red-color'>*</span></label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='email' />
                                    </p>
                                </div>
                                <div className='form-group'>
                                    <label>Enter Your Password<span className='red-color'>*</span></label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <p className='error-msg'>
                                        <ErrorMessage name='password' />
                                    </p>
                                </div>
                                <div className='submit-btn form-group'>
                                    <button
                                        className='custom-btn'
                                        type='submit'>Sign In</button>
                                </div>
                                <div className='form-group back-success'>
                                    {success}
                                </div>
                                <div className='form-group back-error'>
                                    {error}
                                </div>
                            </Form>
                        </Formik>

                    </div>
                    <Footer />
                </div>
            </section>
        </>
    )
}

export default SignIn;