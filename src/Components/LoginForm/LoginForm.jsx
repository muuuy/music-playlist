import React from 'react';
import styles from './LoginForm.module.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';

const LoginForm = () => {
    return (
        <div className='ui-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Sign In | MusicPlaylists</title>
                </Helmet>
            </HelmetProvider>       
            <h1>Logo / Image Place Holder</h1>
            <form className='ui-form'>
                <div className='sliver'></div>
                <div className='ui-text'>
                    <h2>Sign in to your account</h2>
                </div>
                <label for="email">Email
                    <input className='ui-input' name="email" type='email' autoComplete='email' required />
                </label>
                <label for="username">Username
                    <input className='ui-input' name="username" type='username' autoComplete='username' required />
                </label>
                <label for="password">Password
                    <input className='ui-input' name="password" type='password' required/>
                </label>
                <div className='form-button__container'>
                    <button className='form-button'>Sign In</button>
                </div>
                <div id={styles.bottom}>
                    <NavLink to='/forgot/' id={styles.forgot}>Forgot Password?</NavLink>
                    <NavLink to='/signup/' id={styles.signup_text}>Sign-up</NavLink>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;