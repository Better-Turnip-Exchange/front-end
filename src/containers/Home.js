import React from 'react';
import Splash from './Splash';
import Select from './Select';
import './Home.css';

const Home = (props) => {
    const renderLogin = () => {
        return (
            <Splash {...props} />
        )
    }
    const renderSelect = () => {
        return (
            <Select {...props} />
        )
    }
    return (
        <div>

            <div className="login">
                {props.authenticated ? renderSelect() : renderLogin()}
            </div>
        </div>

    )
}
export default Home;