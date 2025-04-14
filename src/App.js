import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Pages/LoginSignup/Login';
import SignUp from './Components/Pages/LoginSignup/SignUp';
import GamePage from './Components/Pages/GamePage/GamePage';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start-game" element={<GamePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;