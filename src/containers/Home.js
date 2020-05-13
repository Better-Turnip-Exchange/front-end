import React, { useState, useEffect } from 'react';
import Islands from './Islands';
import Login from './Login';
import './Home.css';

const Home = (props) => {
    const renderLogin = () => {
        return (
            < Login />
        )
    }
    const renderLanding = () => {
        return (
            <div>
                <h2> Welcome, {props.userName.split(' ')[0]}! </h2>
                <div class='container'>
                    <div class='card-group'>
                        <div class='card'>
                            <div class='card-body'>
                                <h3 class='card-title'>
                                    Islands
                                </h3>
                                <p class='card-text'>View your islands here, or have them sent to you.</p>
                            </div>
                        </div>
                        <div class='card'>

                        </div>
                    </div>
                </div>
                {/* <a role='button' type='button' class='btn btn-secondary' href='/islands'> View your islands</a> */}
            </div>
        )
    }
    return (
        <div>
            <div className="landing-title-wrapper">
                <h1>The</h1>
                <h1> Better Turnip Exchange</h1>
            </div>
            <div className="login">

                {props.authenticated ? renderLanding() : renderLogin()}

            </div>
        </div>

    )
}
export default Home;