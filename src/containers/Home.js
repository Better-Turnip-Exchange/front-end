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
            <div class='container mt-4'>
                <h3> Welcome, {props.userName.split(' ')[0]}! </h3>
                <div class='container mt-8'>
                    <div class="input-group mb-3">
                        <select class="custom-select" id="inputGroupSelect02">
                            <option selected>Villagers...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select class="custom-select" id="inputGroupSelect02">
                            <option selected>Categories...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select class="custom-select" id="inputGroupSelect02">
                            <option selected>Fees...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <div class="input-group-append">
                            <label class="input-group-text" for="inputGroupSelect02">Find</label>
                        </div>
                    </div>
                    <div class='card-deck text-center'>
                        <div class='card box-shadow'>
                            <h3 class='card-header'>
                                Islands
                                </h3>
                            <div class='card-body'>
                                <p class='card-text'>View your islands here, or have them sent to you.</p>
                            </div>
                        </div>
                     
                    </div>
                </div>
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