import React from 'react';
import './ForgotForm.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const ForgotForm = () => {
    return (        
        <div id='forgot-container'>
            <Helmet>
                <title>Forgot Password | MusicPlaylists</title>
            </Helmet> 
            <div id='logo-container'>
                <h1>Logo / Image Place Holder</h1>
            </div>
            <form id='forgot-form'>
                <div id='sliver'></div>
                <div className='forgot-text'>
                    <h2>Forgot Your Password?</h2>
                </div>
                <div className='forgot-instruction'>
                    <p>Please enter the email address associated with your account.</p>
                </div>
                <div className='forgot-input'>
                    <a>Email</a>
                    <input id='email' type='email' autoComplete='email' required />
                </div>
                <div id='reset-button'>
                    <button>Reset Password</button>
                </div>
                <div id='bottom'>
                    <Link id='signin-text' to='/signin'>Log In</Link>
                    <Link id='signup-text' to='/signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotForm;