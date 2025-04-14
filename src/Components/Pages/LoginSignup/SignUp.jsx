import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function SignUp() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({});
    const { username, email, password } = user;
    const navigate = useNavigate(); // Use the useNavigate hook

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        // Clear the error for the field if the input is valid
        if (error[name]) {
            setError({ ...error, [name]: "" });
        }
    };

    const handleSignup = async () => {
        try {
            console.log('Submitting sign-up form:', { username, email, password });
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                username,
                email,
                password
            });
            console.log('Sign-up response:', response.data);
            navigate('/login');
        } catch (error) {
            console.log('Caught an ERROR response:', error.response);
            if (error.response && error.response.data) {
                console.log('Backend error data:', error.response.data); // Log the error data
                setError({...error.response.data}); // Set the error state
            } else {
                setError({ general: 'An error occurred. Please try again.' });
            }
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline' />
            </div>
            <div className='inputs'>
                <div className={`input-container ${error.username ? 'error' : ''}`}>
                    <div className='input'>
                        <img src="/person.png" alt="User Icon" />
                        <input
                            type="text"
                            placeholder='Enter your username'
                            value={username}
                            name="username"
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    {error.username && <div className="error-popup">{error.username}</div>}
                </div>
                <div className={`input-container ${error.email ? 'error' : ''}`}>
                    <div className='input'>
                        <img src="/email.png" alt="Email Icon" />
                        <input
                            type="text"
                            placeholder='Enter your e-mail'
                            value={email}
                            name="email"
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    {error.email && <div className="error-popup">{error.email}</div>}
                </div>
                <div className={`input-container ${error.password ? 'error' : ''}`}>
                    <div className='input'>
                        <img src="/password.png" alt="Password Icon" />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            name="password"
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    {error.password && <div className="error-popup">{error.password}</div>}
                </div>
            </div>
            <div className="submit-container" style={{ textAlign: 'center' }}>
                <button className="submit" onClick={handleSignup}>
                    Sign Up
                </button>
            </div>
            <Link to="/login" className="already-have-account" style={{ textAlign: 'center' }}>
                Already have an account?
            </Link>
        </div>
    );
}

export default SignUp;