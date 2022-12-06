import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const Pricing = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState([]);
    const [price, setPrice] = useState([]);
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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }
        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }
        axios
            .get('https://rsacarbook.jaraware.com/api/v1/getPlanList', axiosConfig)
            .then((res) => {
                console.log("res", res.data);
                setPrice(res.data.data.plan);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const removeToken = (userToken) => { // export function from module 
        localStorage.removeItem("token");
        navigate("/");
        // setToken(null);
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
                        <button class="custom-btn" onClick={removeToken}>Log Out</button>
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
                            <h2>Pricing :</h2>
                            <div className="pricing-plan">
                                {
                                    price.map((val, i) => (
                                        <div className='item' key={i}>
                                            <h5>planname: <span className='green-color'>{val.planname}</span></h5>
                                            <h5>Price: <span className='green-color'>{val.price}</span></h5>
                                            <h6>Duration: <span className='green-color'>{val.duration}</span></h6>
                                            <p>Description: <span className='green-color'>{val.description}</span></p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </section>
        </>
    )
}

export default Pricing;