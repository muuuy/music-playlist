import React from "react";
import "./Password.css";
import { NavLink } from "react-router-dom";

const Password = () => {
    return (
        <div id="password-container">
            <h1 id='logo-container'>Logo / Image Place Holder</h1>
            <form id='password-form'>
                <div id='sliver'></div>
                <h2 className='password-text'>New Password</h2>
                <p className='password-instruction'>Please enter the email address associated with your account.</p>
                <div className='password-input'>
                    <label for="username">Username</label>
                    <input id='username' name='username' type='email' autoComplete='email' required />
                    <label for="password">Password</label>
                    <input id='password' name="password" type='password' autoComplete='password' required />
                    <label for="password-re">Confrim Password</label>
                    <input id='password-re' name="password-re" type='password' autoComplete='password' required />
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
}

export default Password;