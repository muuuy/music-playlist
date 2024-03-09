import React from 'react';
import './LoginForm.css';
import { Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const LoginForm = () => {
    return (
        <div id='login-container'>
            <Helmet>
                <title>Login | MusicPlaylists</title>
            </Helmet>
            <div id='logo-container'>
                <h1>Logo / Image Place Holder</h1>
            </div>
            <form id='login-form'>
                <div id='sliver'></div>
                <div className='login-text'>
                    <h2>Sign in to your account</h2>
                </div>
                <div className='login-input'>
                    <a>Email</a>
                    <input id='email' type='email' autoComplete='email' required />
                </div>
                <div className='login-input'>
                    <a>Username</a>
                    <input id='username' type='username' autoComplete='username' required />
                </div>
                <div className='login-input'>
                    <a>Password</a>
                    <input id='password' type='password' required/>
                </div>
                <div id='signin'>
                    <button>Sign In</button>
                </div>
                <div id='bottom'>
                    <a id='forgot'>Forgot Password?</a>
                    {/* <Routes to='/signup' id='signup-text'>Sign Up</Routes>  */}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;