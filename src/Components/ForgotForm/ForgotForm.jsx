import React from 'react';
import './ForgotForm.css';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
    return (
        <div id='forgot-container'>
            <h1 id='logo-container'>Logo / Image Place Holder</h1>
            <form id='forgot-form'>
                <div id='sliver'></div>
                <h2 className='forgot-text'>Forgot Your Password?</h2>
                <p className='forgot-instruction'>Please enter the email address associated with your account.</p>
                <div className='forgot-input'>
                    <a>Email</a>
                    <input id='email' type='email' autoComplete='email' required />
                </div>
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

export default LoginForm;