import React from 'react';
import FacebookLogin from 'react-facebook-login';

const Login = props => {
    const respond = (res) => {
        console.log(res);
    }
    const handleClick = () => {
        console.log('Clicked')
    }
    return (
        <div className="login">
            <FacebookLogin
                appId='295257131477564'
                autoLoad
                callback={respond}
                fields='name,email,picture'
                onClick={handleClick}
            />

        </div>
    )
};
export default Login;