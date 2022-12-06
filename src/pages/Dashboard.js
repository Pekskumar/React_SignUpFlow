import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import { NavLink, Await, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

const Dashboard = () => {
    
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const navigate = useNavigate();
    const [lastname, setLastname] = useState([]);
    const [contactnumber, setContactnumber] = useState([]);
    const [bname, setBname] = useState([]);
    const [bdesc, setBdesc] = useState([]);
    const [cityid, setCityid] = useState([]);
    const [aadharf, setAadharf] = useState([]);
    const [aadharb, setAadharb] = useState([]);
    const [license, setLicense] = useState([]);
    const [licenseb, setLicenseb] = useState([]);
    
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
            .get('https://rsacarbook.jaraware.com/api/v1/getUserData', axiosConfig)
            .then((response) => {
                console.log("response", response);
                setPosts(response.data.meta.message);
                setUsername(response.data.data.user.first_name);
                setLastname(response.data.data.user.last_name);
                setContactnumber(response.data.data.user.contact_no);
                setBname(response.data.data.user.business.business_name);
                setBdesc(response.data.data.user.business.business_description);
                setCityid(response.data.data.user.city_id);
                setAadharf(response.data.data.user.document.aadharfronturl);
                setAadharb(response.data.data.user.document.aadharbackurl);
                setLicense(response.data.data.user.document.licensefronturl);
                setLicenseb(response.data.data.user.document.licensebackurl);
                
                // console.log("setPosts",setPosts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const removeToken = (userToken) => {
        localStorage.removeItem("token");
        navigate("/");
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
                    <p>Hi, <span className='green-color'>{uname}</span></p>
                        <img className='pro-pic' alt="pro" src={proPic} />
                        <button className="custom-btn" onClick={removeToken}>Log Out</button>
                    
                </div>
            </header>
            <section className='signup-page dashboard'>
                <div className='d-flex'>
                    <div className='sign-left'>
                        <ul className='user-pages'>
                            <li><NavLink exact className='custom-btn' to='/dashboard'>Dashboard</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/updateprofile'>Update Your Profile</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/uplaodDocument'>Upload Your Documents</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/inquery'>Inquery</NavLink> </li>
                            <li><NavLink className='custom-btn' to='/pricing'>Pricing</NavLink> </li>
                            <li><button className="custom-btn" onClick={removeToken}>Log Out</button></li>
                        </ul>
                    </div>
                    <div className='sign-right '>
                        <div className='profile-details'>
                            <div className='main-form'>
                                <h1>Welcome to <span className='green-color'> {username}</span>,</h1>
                                <p>First Name is : {username}</p>
                                <p>Last Name is : {lastname}</p>
                                <p>Contact Number is : {contactnumber}</p>
                                <p>City Id is : {cityid}</p>
                                <p>Business Name is : {bname}</p>
                                <p>Business Description is : {bdesc}</p>
                            </div>
                            <div className='profile-pic'>
                                <img className='pro-pic' alt="pro" src={proPic} />
                            </div>
                        </div>
                        <div className='documents'>
                            <div className='doc'>
                                <p>1. aadhar_front</p>
                                <img className='pro-pic' alt="pro" src={aadharf} />
                            </div>
                            <div className='doc'>
                            <p>2. aadhar_back</p>
                                <img className='pro-pic' alt="pro" src={aadharb} />
                            </div>
                            <div className='doc'>
                            <p>3. license</p>
                                <img className='pro-pic' alt="pro" src={license} />
                            </div>
                            <div className='doc'>
                            <p>3. license_back</p>   
                                <img className='pro-pic' alt="pro" src={licenseb} />
                            </div>
                        </div>


                    </div>

                </div>
                <Footer />
            </section>
        </>
    )
}

export default Dashboard;