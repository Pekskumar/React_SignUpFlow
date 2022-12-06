import React , {useEffect,useState} from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik , Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';


const SignUp = () => {

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
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        contact_no : '',
        confirm_password : '',
        business_name : '',
        business_description : ''
    }
    const formValidation = yup.object().shape({
        first_name : yup.string().required('First Name is required'),
        last_name : yup.string().required('Last Name is required'),
        email : yup.string().required('Email is required').email('Please Enter Valid Email Address'),
        contact_no: yup.string().required('Contact Number is required').max(10, 'Contact Number must be between 1 and 10 Numbers.'),
        password : yup.string().required('Password is required'),
        confirm_password : yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Both password need to be the same"
            )
          }),
        business_name : yup.string().required('Business Name is required'),
        business_description : yup.string().required('Business Description is required')
    });


    // const handleFormSubmit = (values) => {
    //     console.log("submitted values", values)
    // }

    
  return (
    <>
    <Header 
    text = 'Already have an Account?'
    pageLink = '/signin'
    pageName = "Sign In"
    />
    <section className='signup-page'>
        <div className='sign-left'>
            <div className='left-content'>
                <h1> Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
            </div>
        </div>
        <div className='sign-right'>
            <div></div>
            <div className='main-form'>
                <h2>Create Account</h2>
                <Formik initialValues={formInitialSchema} 
                validationSchema={formValidation}
                onSubmit={async (values) => {
                    const data = {
                                first_name: values.first_name,
                                last_name: values.last_name,
                                email: values.email,
                                contact_no: values.contact_no,
                                password: values.password,
                                confirm_password: values.confirm_password,
                                business_name: values.business_name,
                                business_description: values.business_description,
                        }
                
                        const axiosConfig = {
                            headers: {
                                'Accept': 'application/json',
                            },
                        }
                
                        const response = await axios.post(
                            'https://rsacarbook.jaraware.com/api/v1/register',
                            data,
                            axiosConfig)

                            .then((response) => {
                                console.log('response',data)
                                setSuccess('You have successfully Registered');
                                setError('');
                                navigate("/signin");
                            })
                            .catch((e) => {
                                console.log('Error',data)
                                setError('Email or Contact Number is aleready Exist');
                                setSuccess('');
                            });
                
                    }
                }                
                >
                    <Form>
                        <div className='form-group'>
                            <label>Enter First Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='first_name' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Last Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='last_name' />
                            </p>
                        </div>
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
                            <label>Enter Your Contact Number<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="contact_no"
                            placeholder="Enter Your Contact Number"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='contact_no' />
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
                        <div className='form-group'>
                            <label>Enter Your Confirm Password<span className='red-color'>*</span></label>
                            <Field 
                            type="password"
                            name="confirm_password"
                            placeholder="Enter Your Confirm Password"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='confirm_password' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Business Name<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="business_name"
                            placeholder="Enter Your Business Name"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='business_name' />
                            </p>
                        </div>
                        <div className='form-group'>
                            <label>Enter Your Business Description<span className='red-color'>*</span></label>
                            <Field 
                            type="text"
                            name="business_description"
                            placeholder="Enter Your Business Description"
                            />
                            <p className='error-msg'>
                                <ErrorMessage name='business_description' />
                            </p>
                        </div>
                        <div className='submit-btn form-group'>
                            <button 
                            className='custom-btn' 
                            type='submit'>Sign Up</button>
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

export default SignUp;