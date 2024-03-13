import React from 'react';
import './SignupForm.css';
import { NavLink } from 'react-router-dom';

const SignupForm = () => {
    
    return (
        <div id='signup-container'>
            <div id='logo-container'>
                <h1>Logo / Image Place Holder</h1>
            </div>
            <form id='signup-form'>
                <div id='sliver'></div>
                <div className='signup-text'>
                    <h2>Sign up for an account</h2>
                </div>
                <div className='login-input'>
                    <a>Email</a>
                    <input id='email' type='email' autoComplete='email' required />
                </div>
                <div className='signup-input'>
                    <a>Username</a>
                    <input id='username' type='username' autoComplete='username' required />
                </div>
                <div className='signup-input'>
                    <a>Password</a>
                    <input id='password' type='password' required/>
                </div>
                <div className='signup-input'>
                    <a>Re-enter Password</a>
                    <input id='second-password' type='password' required/>
                </div>
                <div id='signup'>
                    <button>Sign Up</button>
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