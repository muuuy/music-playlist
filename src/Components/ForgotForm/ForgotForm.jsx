import React from 'react';
import './ForgotForm.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";

const ForgotForm = () => {
    return (
        <div id='forgot-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Forgot Password | MusicPlaylists</title>
                </Helmet> 
            </HelmetProvider>            
            
            <h1 id='logo-container'>Logo / Image Place Holder</h1>
            <form id='forgot-form'>
                <div id='sliver'></div>
                <h2 className='forgot-text'>Forgot Your Password?</h2>
                <p className='forgot-instruction'>Please enter the email address associated with your account.</p>
                <label for="email">Email
                    <input id='email' name="email" type='email' autoComplete='email' required />
                </label>
                <div id='reset-button'>
                    <button>Reset Password</button>
                </div>
                <div id='bottom'>
                    <NavLink to='/login' id='signin-text'>Log In</NavLink>
                    <NavLink to='/signup' id='signup-text'>Sign Up</NavLink>
                </div>
            </form>
        </div>
    );
};

export default ForgotForm;