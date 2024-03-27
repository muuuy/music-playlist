import React from 'react';
import styles from './ForgotForm.module.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";

const ForgotForm = () => {
    return (
        <div className='navbar-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Forgot Password | MusicPlaylists</title>
                </Helmet> 
            </HelmetProvider>            
            
            <h1>Logo / Image Place Holder</h1>
            <form className='ui-form'>
                <div id='sliver'></div>
                <h2 className='ui-text'>Forgot Your Password?</h2>
                <p className={styles.forgot_instruction}>Please enter the email address associated with your account.</p>
                <label for="email">Email
                    <input className='ui-input' name="email" type='email' autoComplete='email' required />
                </label>
                <div className='form-button__container'>
                    <button className='form-button'>Reset Password</button>
                </div>
                <div id={styles.bottom}>
                    <NavLink to='/login' id={styles.signin_text}>Log In</NavLink>
                    <NavLink to='/signup' id={styles.signup_text}>Sign Up</NavLink>
                </div>
            </form>
        </div>
    );
};

export default ForgotForm;