import React, { useState, useContext } from 'react';
import styles from './LoginForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from '../../Components/Navbar/Navbar';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorCredentials, setErrorCredentials] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setErrorCredentials('');

        // Connect to backend
        try {
            const formData = new FormData();
            formData.append('username', username)
            formData.append('password', password);

            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                body: formData
            });
            
            // Valid login credentials
            if (response.ok) {
                const data = await response.json();
                const accessToken = data.access_token;
                const username = data.username;

                // Store the JWT token in local storage
                sessionStorage.setItem('jwtToken', accessToken);
                sessionStorage.setItem('username', username);
                
                console.log('Login successful');                
                
                // Redirect user to their Library page
                //window.location.href = '/Library';
                navigate('/Library');
            }
            // Incorrect login credentials
            else if (response.status === 401) {
                setErrorCredentials('Invalid username or password');
                console.log('Login failed');
            }
            // Some other error
            else {
                setErrorCredentials('An error occurred during login');
                console.error('Error during login', error);
            }
        }
        catch (error) {
            setErrorCredentials('An error occurred during login');
            console.error('Error during login', error);
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
                {errorCredentials && <div className={styles.error}>{errorCredentials}</div>}
                <label htmlFor="username">Username
                    <input className='ui-input' name="username" type='username' autoComplete='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label htmlFor="password">Password
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
