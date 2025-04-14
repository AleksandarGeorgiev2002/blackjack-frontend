import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const { username, password } = user;
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password
            });
            console.log(response.data);

            // Store token or user data in localStorage
            localStorage.setItem('authToken', response.data.token);

            // Navigate to start-game and ensure the page reloads to initialize the game
            navigate('/start-game', { replace: true });
            window.location.reload(); // Force reload to ensure blackjack.js initializes
        } catch (error) {
            if (error.response) {
                console.error('Error logging in:', error.response.data);
            } else if (error.request) {
                console.error('Error logging in: No response from server. Please check your connection.');
            } else {
                console.error('Error logging in:', error.message);
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
                    <img src="/person.png" alt="User Icon" />
                    <input
                        type="text"
                        placeholder='Enter your username'
                        value={username}
                        name="username"
                        onChange={(e) => onInputChange(e)}
                    />
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
                </div>
            </div>
            <Link to="/forgot-password" className="forgot-password">
                <span>Forgot password?</span>
            </Link>
            <div className="submit-container">
                <button className="submit" onClick={handleLogin}>Sign In</button>
            </div>
            <Link to="/signup" className="already-have-account" style={{ textAlign: 'center' }}>
                            Don't have an account?
            </Link>
        </div>
    );
}

export default Login;