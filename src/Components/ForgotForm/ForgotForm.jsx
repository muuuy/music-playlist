import React from 'react';
import styles from './ForgotForm.module.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from '../../Components/assets/bakimmusic_logo.png'

const ForgotForm = () => {
    return (
        <div className='ui-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Forgot Password | BakimMusic</title>
                </Helmet> 
            </HelmetProvider>            
            <img src={logo} alt='logo' className={styles.logo}/>
            <form className='ui-form'>
                <div className='sliver'></div>
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