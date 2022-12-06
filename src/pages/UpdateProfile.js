import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import logo from '../images/logo.png'
import { Await, NavLink, useNavigate } from 'react-router-dom';


const UpdateProfile = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState([]);
    const [lastname, setLastname] = useState([]);
    const [contactnumber, setContactnumber] = useState([]);
    const [bname, setBname] = useState([]);
    const [bdesc, setBdesc] = useState([]);
    const [cityid, setCityid] = useState([]);
    

    useEffect(() => {

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getUserData', axiosConfig)
            .then((res) => {
                setUsername(res.data.data.user.first_name);
                setLastname(res.data.data.user.last_name);
                setContactnumber(res.data.data.user.contact_no);
                setBname(res.data.data.user.business.business_name);
                setBdesc(res.data.data.user.business.business_description);
                setCityid(res.data.data.user.city_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const formInitialSchema = {
        business_name: '',
        business_description: '',
        first_name: '',
        contact_no: '',
        last_name: '',
        city_id: '',
      
    }
    const formValidationSchema = yup.object().shape({
        business_name: yup.string().required('Business Name is required'),
        business_description: yup.string().required('business_description required'),
        first_name: yup.string().required('first_name is required'),
        contact_no: yup.string().required('contact_no is required'),
        last_name: yup.string().required('last_name is required'),
        city_id: yup.string().required('city_id is required'),
     
    })

    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
        // setToken(null);
    }
    const proPic = localStorage.getItem("profilepic");
    const uname = localStorage.getItem("first_name");

    const [file, setFile] = useState('');

    function handleChange(event) {
        setFile(event.currentTarget.files[0]);
    }

    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi <span className='green-color'>{uname}</span>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button className="custom-btn" onClick={removeToken}>Log Out</button>
                    </p>
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                    <ul className='user-pages'>
                    <li><NavLink exact className='custom-btn'  to='/dashboard'>Dashboard</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                        <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                        <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                    </ul>
                    </div>
                    <div className='sign-right'>
                        <div className='main-form'>
                            <h2>Update Your Profile Details :</h2>
                            <Formik
                                initialValues={formInitialSchema}
                                validationSchema={formValidationSchema}
                                
                                onSubmit={
                                     (values) => {
                                        
                                        // const data = {
                                        //     business_name: values.business_name,
                                        //     business_description: values.business_description,
                                        //     first_name: values.first_name,
                                        //     last_name: values.last_name,
                                        //     contact_no: values.contact_no,
                                        //     city_id: values.city_id,
                                        //     profilepic:values.profilepic,
                                        // }
                                        
                                        const url = 'https://rsacarbook.jaraware.com/api/v1/updateUserData';
                                        
                                        const formData = new FormData();
                                        formData.append('profilepic', file);
                                        formData.append('business_name', values.business_name);
                                        formData.append('business_description', values.business_description);
                                        formData.append('first_name', values.first_name);
                                        formData.append('last_name', values.last_name);
                                        formData.append('contact_no', values.contact_no);
                                        formData.append('city_id', values.city_id);

                                        
                                        
                                        console.log("file this",file)

                                        const axiosConfig = {
                                            headers: {
                                                // 'Accept': 'application/json',
                                                // 'content-type': 'multipart/form-data',
                                                Authorization: 'Bearer ' + localStorage.getItem("token"),
                                            }
                                        };
                                        
                                axios.post(url,formData,axiosConfig
                                        ).then((response) => {
                                            console.log('response', response);
                                            setSuccess(response.data.meta.message);
                                            setError('');
                                        })
                                            .catch((err) => {
                                                console.log("error", err);
                                                setError(err.message);
                                                setSuccess('');
                                            })

                                    }
                                }
                            >
                                <Form>
                                    <div className='form-group'>
                                        <label>Change Your first_name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="first_name"
                                            placeholder={username}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='first_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your last_name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder={lastname}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='last_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your contact_no<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="contact_no"
                                            placeholder={contactnumber}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='contact_no' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your city_id<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="city_id"
                                            placeholder={cityid}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='city_id' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your Business Name<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="business_name"
                                            placeholder={bname}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='business_name' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your Business Description<span className='red-color'>*</span></label>
                                        <Field
                                            type="text"
                                            name="business_description"
                                            placeholder={bdesc}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='business_description' />
                                        </p>
                                    </div>
                                    <div className='form-group'>
                                        <label>Change Your profile_pic<span className='red-color'>*</span></label>
                                        <Field
                                            type="file" name='profilepic'
                                            onChange={handleChange}
                                            // placeholder={bdesc}
                                        />
                                        <p className='error-msg'>
                                            <ErrorMessage name='profile_pic' />
                                        </p>
                                    </div>
                                    
                                    
                                    <div className='submit-btn form-group'>
                                        <button
                                            className='custom-btn'
                                            type='submit'>Upadte Profile</button>
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
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default UpdateProfile;