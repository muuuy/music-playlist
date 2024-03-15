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
                <label for="email">Email
                    <input id='email' name='email' type='email' autoComplete='email' required />
                </label>
                <label for="username"> Username
                    <input id='username' name="username" type='username' autoComplete='username' required />
                </label>
                <label for="password"> Password
                    <input id='password' name="password" type='password' required/>
                </label>
                <label for="password-re"> Confirm Password
                    <input id='password-re' name="password-re" type='password' required/>
                </label>
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