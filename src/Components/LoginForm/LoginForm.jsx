import React from 'react';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';

const LoginForm = () => {
    return (
        <div id='login-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Sign In | MusicPlaylists</title>
                </Helmet>
            </HelmetProvider>       
            
            <div id='logo-container'>
                <h1>Logo / Image Place Holder</h1>
            </div>
            <form id='login-form'>
                <div id='sliver'></div>
                <div className='login-text'>
                    <h2>Sign in to your account</h2>
                </div>
                <label for="email">Email
                    <input id='email' name="email" type='email' autoComplete='email' required />
                </label>
                <label for="username">Username
                    <input id='username' name="username" type='username' autoComplete='username' required />
                </label>
                <label for="password">Password
                    <input id='password' name="password" type='password' required/>
                </label>
                <div id='signin'>
                    <button>Sign In</button>
                </div>
                <div id='bottom'>
                    {/* <a id='forgot'>Forgot Password?</a> */}
                    <NavLink to='/forgot/' id='forgot'>Forgot Password?</NavLink>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;