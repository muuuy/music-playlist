import React, { useState, useEffect } from 'react';
import styles from './SignupForm.module.css';
import { Helmet } from 'react-helmet'
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../Components/assets/bakimmusic_logo.png'

const SignupForm = () => {
    const navigate = useNavigate();
    const [signupResponse, setSignupResponse] = useState();
    const [invalidSignup, setInvalidSignup] = useState(false);

    const [formData, setFormData] = useState({
        'email': '',
        username: '',
        password: '',
        password2: '',

    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setFormData(values => ({...values, [name]: value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password != formData.password2 ){

        }
        try {
            const response = await axios.post("http://127.0.0.1:5001/addUser", formData);
            const signupStatus = parseInt(response.data.message.status);
            setSignupResponse(response.data.message.message);
            // Navigate to home page if sign in is successful
            if (signupStatus === 1) {
                navigate('/');
            }
            // If email or username is already associated with an account, notify user
            else if (signupStatus === 0) {
                setInvalidSignup(true);
            }
        } catch (err) {
        console.log(err);
        }
    };

    useEffect(() => {
        console.log("RESPONSE", signupResponse);
    }, [signupResponse]);

    return (
        <div className='ui-container'>
            <Helmet>
                <title>Signup | BakimMusic</title>
            </Helmet>
            <img src={logo} alt='logo' className={styles.logo}/>
            <form onSubmit={handleSubmit} className='ui-form'>
                <div className='sliver'></div>
                <div className='ui-text'>
                    <h2>Sign up for an account</h2>
                </div>
                <div className={styles.invalid}>
                    {invalidSignup && <h3>{signupResponse}</h3>}
                </div>
                <div>
                    <label for="email">Email</label>
                    <input className='ui-input' name="email" value={formData.email} onChange={handleInputChange} type='email'  required />
                </div>
                <div>
                    <label for="username">Username</label>
                    <input className='ui-input' name="username" value={formData.username} onChange={handleInputChange} type='username' autoComplete='username' required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input className='ui-input' name="password" value={formData.password} type='password' onChange={handleInputChange} required/>
                </div>
                <div>
                    <label for="password2">Re-enter Password {formData.password != formData.password2 && (<a>- Password doesn't match</a>)}</label>
                    <input className='ui-input' name="password2" value={formData.password2} type='password'  onChange={handleInputChange} required/>
                </div>
                <div className='form-button__container'>
                    <button className='form-button' disabled={formData.password != formData.password2}>Sign Up</button>
                </div>
                <div id={styles.bottom}>
                    <a id={styles.account_exists}>Already have an account? </a>
                    <NavLink to='/login' id={styles.signin_text}>Sign In</NavLink>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
