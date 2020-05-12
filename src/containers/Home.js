import React, { useState, useEffect } from 'react';
import Login from './Login';

const Home = (props) => {
    const renderLogin = () => {
        console.log(props.authenticated)
        return (
            < Login />
        )
    }
    const renderIslands = props => {
        console.log('User is authenticated.')
        return (
            <h1> Your Islands</h1>
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