import React , {useEffect,useState} from 'react'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { Formik , Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Await, NavLink,useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'


const Inquery = () => {

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

        if (localStorage.getItem("token") === null) {
            console.log("hellos");
            navigate("/");
        }

        const axiosConfig = {
                    headers : {
                        'Accept': 'application/json',
                        Authorization: 'Bearer '+localStorage.getItem("token"),
                    }
                }
          axios
             .get('https://rsacarbook.jaraware.com/api/v1/getUserData',axiosConfig)
             .then((res) => {
                setUsername(res.data.data.user.first_name);
                // setLastname(res.data.data.user.last_name);
                // setContactnumber(res.data.data.user.contact_no);
                // setBname(res.data.data.user.business.business_name);
                // setBdesc(res.data.data.user.business.business_description);
                // setCityid(res.data.data.user.city_id);
             })
             .catch((err) => {
                console.log(err);
             });
       }, []);

    

 
    const formInitialSchema = {
      fullname : '',
      description : '',
        
        // city_id : '',
    }
    const formValidationSchema = yup.object().shape({
        fullname : yup.string().required('fullname is required'),
        description : yup.string().required('description is required'),
        
}) 

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
                    <h2>Update Your Profile Details :</h2>
                    <Formik 
                    initialValues={formInitialSchema}
                    validationSchema={formValidationSchema}
                    onSubmit={ 
                        async(values) => {
                            const data = {
                              fullname : values.fullname,
                              description : values.description,
                            }
                            const axiosConfig = {
                                headers : {
                                    'Accept': 'application/json',
                                    Authorization: 'Bearer '+localStorage.getItem("token"),
                                }
                            }
                            const response = await axios.post(
                              'https://rsacarbook.jaraware.com/api/v1/general_inquiry',
                              data,
                              axiosConfig
                            ).then((response) => {
                                console.log('response',response);
                                setSuccess(response.data.meta.message);
                            })
                            .catch((err) => {
                                console.log("error",response);
                                setError(err.data.meta.message);
                            })

                        }
                    }
                    >
                        <Form>
                            <div className='form-group'>
                                <label>Enter Your fullname:</label>
                                <Field 
                                type="text"
                                name="fullname"
                                placeholder="fullname"
                                />
                                <p className='error-msg'>
                                    <ErrorMessage name='fullname' />
                                </p>
                            </div>
                            <div className='form-group'>
                                <label>Enter Your description:</label>
                                <Field 
                                type="text"
                                name="description"
                                placeholder="description"
                                />
                                <p className='error-msg'>
                                    <ErrorMessage name='description' />
                                </p>
                            </div>
                            <div className='submit-btn form-group'>
                                <button 
                                className='custom-btn' 
                                type='submit'>Send Message</button>
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

export default Inquery;