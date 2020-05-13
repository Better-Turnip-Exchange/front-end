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
                        <select class="custom-select" id="filter">
                            <option selected>Villagers...</option>
                            <option value="celeste">Celeste</option>
                            <option value="daisy">Daisy</option>
                            <option value="dont-care">Don't Care</option>
                        </select>
                        <select class="custom-select" id="filter">
                            <option selected>Categories...</option>
                            <option value="turnips">Turnips</option>
                            <option value="cataloging">Cataloging</option>
                            <option value="crafting">Crafting</option>
                            <option value="other">Other</option>
                        </select>
                        <select class="custom-select" id="filter">
                            <option selected>Fees...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="dont-care">Don't Care</option>
                        </select>
                        <div class="input-group-append">
                            <label class="input-group-text" for="filter">Find</label>
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