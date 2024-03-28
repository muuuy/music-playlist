import React, { useState} from 'react';
import styles from './LoginForm.module.css';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Connect to backend
        try {
            const formData = new FormData();
            formData.append('username', username)
            formData.append('password', password);

            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                const userID = data.userID;
                // Store userID, so personalized library can be displayed
                localStorage.setItem('userID', userID);
                console.log('Login successful');

                // Redirect user to their Library page
                window.location.href = '/Library';
            }
            else {
                console.error('Login failed');
            }
        }
        catch (error) {
            console.log('????????????');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='ui-container'>
            <HelmetProvider>
                <Helmet>
                    <title>Sign In | MusicPlaylists</title>
                </Helmet>
            </HelmetProvider>       
            <h1>Logo / Image Place Holder</h1>
            <form onSubmit={handleSubmit} className='ui-form'>
                <div className='sliver'></div>
                <div className='ui-text'>
                    <h2>Sign in to your account</h2>
                </div>
                <label for="email">Email
                    <input className='ui-input' name="email" type='email' autoComplete='email' required />
                </label>
                <label for="username">Username
                    <input className='ui-input' name="username" type='username' autoComplete='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label for="password">Password
                    <input className='ui-input' name="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
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