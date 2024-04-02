import React, { useState} from 'react';
import styles from './SignupForm.module.css';
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
        <div className='ui-container'>
            <Helmet>
                <title>Signup | MusicPlaylists</title>
            </Helmet>
            <h1>Logo / Image Place Holder</h1>
            <form onSubmit={handleSubmit} className='ui-form'>
                <div className='sliver'></div>
                <div className='ui-text'>
                    <h2>Sign up for an account</h2>
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
