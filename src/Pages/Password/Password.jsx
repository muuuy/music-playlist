import React from "react";
import styles from "./Password.module.css";
import { NavLink } from "react-router-dom";

const Password = () => {
    return (
        <div className="ui-container">
            <h1>Bakim Music</h1>
            <form className="ui-form">
                <div className='sliver'></div>
                <div className="ui-text">
                    <h2>New Password</h2>
                </div>
                <div>
                    <label for="username">Username
                        <input className="ui-input" name='username' type='email' autoComplete='email' required />
                    </label>
                    <label for="password">Password
                        <input className="ui-input" name="password" type='password' autoComplete='password' required />
                    </label>
                    <label for="password-re">Confrim Password
                        <input className="ui-input" name="password-re" type='password' autoComplete='password' required />
                    </label>
                </div>
                <div className='form-button__container'>
                    <button className='form-button'>Reset Password</button>
                </div>
                <div className={styles.bottom}>
                    <NavLink to='/login' id={styles.signin_text}>Log In</NavLink>
                    <NavLink to='/signup' id={styles.signup_text}>Sign Up</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Password;