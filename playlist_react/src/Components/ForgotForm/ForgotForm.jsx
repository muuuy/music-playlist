import React from 'react';
import './ForgotForm.css';
// import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
        <div id='forgot-container'>
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
                    <a id='signin-text'>Log In</a>
                    <a id='signup-text'>Sign Up</a>
                    {/* <Link to='/signup' id='signup-text'>Sign Up</Link>  */}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;