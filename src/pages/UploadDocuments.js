import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink , useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const UploadDocuments = () => {


    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }
    }, []);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
    }

    const [file, setFile] = useState('');
    const [file2, setFile2] = useState('')
    const [file3, setFile3] = useState('')
    const [file4, setFile4] = useState('')

    function handleChange(event) {
        setFile(event.target.files[0])
    }
    function handleChange2(event) {
        setFile2(event.target.files[0])
    }
    function handleChange3(event) {
        setFile3(event.target.files[0])
    }
    function handleChange4(event) {
        setFile4(event.target.files[0])
    }


    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://rsacarbook.jaraware.com/api/v1/uploadUserDocument';
        const formData = new FormData();
        formData.append('aadhar_front', file);
        formData.append('aadhar_back', file2);
        formData.append('license', file3);
        formData.append('license_back', file4);
        const config = {
            headers: {
                // 'content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log("response.data",response.data);
            setSuccess(response.data.meta.message);
            setError('');
        })
        .catch((err) => {
            console.log("err.data",err);
            setSuccess('');
            setError(err.message);
        })
    
    }

    const proPic = localStorage.getItem("profilepic");
    const uname = localStorage.getItem("first_name");


    return (
        <>
            <header className='dash-header'>
                <div className='app-logo'>
                <NavLink to="/dashboard"><img className='logo' src={logo} alt="logo" /></NavLink>
                </div>
                <div className='app-right'>
                    <p>Hi, <span className='green-color'>{uname}</span>
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
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Uplaod Your aadhar_front<span className='red-color'>*</span></label>
                                    <input type="file" name='aadhar_front' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your aadhar_back<span className='red-color'>*</span></label>
                                    <input type="file" name='aadhar_back' onChange={handleChange2} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your license<span className='red-color'>*</span></label>
                                <input type="file" name='license' onChange={handleChange3} />
                                </div>
                                <div className='form-group'>
                                    <label>Uplaod Your license_back<span className='red-color'>*</span></label>
                                <input type="file" name='license_back' onChange={handleChange4} />
                                </div>
                                <div className='submit-btn form-group'>
                                    <button className="custom-btn" type="submit">Upload</button>
                                </div>
                                <div className='form-group back-success'>
                                        {success}
                                    </div>
                                    <div className='form-group back-error'>
                                        {error}
                                    </div>
                            </form>



                        </div>
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default UploadDocuments;