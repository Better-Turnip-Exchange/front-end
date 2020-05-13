import React, { useState, useEffect } from 'react';
import Login from './Login';

const Home = (props) => {
    const renderLogin = () => {
        return (
            < Login />
        )
    }
    const renderIslands = () => {
        return (
            <div>
                <h2> Welcome, {props.userName.split(' ')[0]}! </h2>
                <a role='button' type='button' class='btn btn-secondary' href='/islands'> View your islands</a>
            </div>
        )
    }
    return (
        <div>
            <div className="landing-title-wrapper">
                <h1> Better Turnip Exchange</h1>
            </div>
            <div className="login">

                {props.authenticated ? renderIslands() : renderLogin()}

            </div>
        </div>

    )
}
export default Home;