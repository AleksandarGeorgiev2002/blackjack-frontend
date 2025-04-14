import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure react-router-dom is installed
import './GamePage.css';

function GamePage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the script is already added
        if (!document.querySelector('script[src="/blackjack.js"]')) {
            const script = document.createElement('script');
            script.src = '/blackjack.js'; // Ensure this file is in the public folder
            script.defer = true;
            document.body.appendChild(script);
        }

        return () => {
            // Clean up the script when the component unmounts
            const existingScript = document.querySelector('script[src="/blackjack.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    const handleSignOut = () => {
        // Perform any necessary cleanup or API calls for sign-out
        console.log('User signed out');
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="game-container"> 
            <button id="sign-out" onClick={handleSignOut}>Sign Out</button>
            <h2 style={{ color: 'rgb(245, 247, 247)' }}>
                Dealer: <span id="dealer-sum"></span>
            </h2>
            <div id="dealer-cards">
                <img id="hidden" src="/cards/BACK.png" alt="Hidden Card" />
            </div>

            <h2 style={{ color: 'rgb(245, 247, 247)' }}>
                You: <span id="your-sum"></span>
            </h2>
            <div id="your-cards"></div>

            <br />
            <button id="hit">Hit</button>
            <button id="stay">Stay</button>
            <p id="results"></p>
            <button id="play-again">Play Again</button>
        </div>
    );
}

export default GamePage;