import React, { useState, useEffect } from 'react';
import Login from './Login';

const Home = props => {
    const [authenticated, setAuthenticated] = useState(false);
    const renderLogin = props => {
        return (
            <Login />
        )
    }
    return (
        <div>
            <div className="landing-title-wrapper">
                <h1> Better Turnip Exchange</h1>
            </div>
            <div className="login">
               

            </div>
        </div>

    )
}
export default Home;