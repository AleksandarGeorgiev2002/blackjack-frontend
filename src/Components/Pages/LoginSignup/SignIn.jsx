import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function SignIn() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({});
    const { email, password } = user;
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSignin = async () => {
        try {
            console.log('Submitting sign-in form:', { email, password });
            const response = await axios.post('http://localhost:8080/api/users/signin', {
                email,
                password
            });
            console.log('Sign-in response:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.log('Caught an ERROR response:', error.response);
            if (error.response && error.response.data) {
                console.log('Backend error data:', error.response.data);
                setError({ ...error.response.data }); // Ensure error state is updated
            } else {
                setError({ general: 'An error occurred. Please try again.' });
            }
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign In</div>
                <div className='underline' />
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src="/email.png" alt="Email Icon" />
                    <input
                        type="text"
                        placeholder='Enter your e-mail'
                        value={email}
                        name="email"
                        onChange={(e) => onInputChange(e)}
                    />
                    {error?.email && <div className="error-popup">{error.email}</div>} {/* Ensure error is displayed */}
                </div>
                <div className='input'>
                    <img src="/password.png" alt="Password Icon" />
                    <input
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        name="password"
                        onChange={(e) => onInputChange(e)}
                    />
                    {error?.password && <div className="error-popup">{error.password}</div>} {/* Ensure error is displayed */}
                </div>
            </div>
            {error?.general && <div className="error-popup">{error.general}</div>} {/* Display general error */}
            <div className="submit-container" style={{ textAlign: 'center' }}>
                <button className="submit" onClick={handleSignin}>
                    Sign In
                </button>
            </div>
            <Link to="/signup" className="already-have-account" style={{ textAlign: 'center' }}>
                Don't have an account? Sign Up
            </Link>
        </div>
    );
}

export default SignIn;
