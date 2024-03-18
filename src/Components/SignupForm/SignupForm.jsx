import React, { useState} from 'react';
import './SignupForm.css';
import { Helmet } from 'react-helmet'
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();

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
        await axios.post("http://127.0.0.1:5001/addUser", formData);
        } catch (err) {
        console.log(err);
        }
        navigate('/');
    };

    return (
        <div id='signup-container'>
            <Helmet>
                <title>Signup | MusicPlaylists</title>
            </Helmet>
            <div id='logo-container'>
                <h1>Logo / Image Place Holder</h1>
            </div>
            <form onSubmit={handleSubmit} id='signup-form'>
                <div id='sliver'></div>
                <div className='signup-text'>
                    <h2>Sign up for an account</h2>
                </div>
                <div className='login-input'>
                    <label>Email</label>
                    <input id='email' name="email" value={formData.email} onChange={handleInputChange} type='email'  required />
                </div>
                <div className='signup-input'>
                    <label>Username</label>
                    <input id='username' name="username" value={formData.username} onChange={handleInputChange} type='username' autoComplete='username' required />
                </div>
                <div className='signup-input'>
                    <label>Password</label>
                    <input id='password' name="password" value={formData.password} type='password' onChange={handleInputChange} required/>
                </div>
                <div className='signup-input'>
                    <label>Re-enter Password {formData.password != formData.password2 && (<a>- Password doesn't match</a>)}</label>
                    <input id='second-password' name="password2" value={formData.password2} type='password'  onChange={handleInputChange} required/>
                </div>
                
                <div id='signup'>
                    <button disabled={formData.password != formData.password2}>Sign Up</button>
                </div>
                <div id='bottom'>
                    <a id='account-exists'>Already have an account?</a>
                    <NavLink to='/login' id='signin-text'>Sign In</NavLink>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
