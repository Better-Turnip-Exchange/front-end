import React from 'react';
import FacebookLogin from 'react-facebook-login';
import keys from '../config';

const Login = props => {
    const respond = (res) => {
        console.log(res);
        localStorage.setItem('token', res.accessToken)
    }
    const handleClick = () => {
        console.log('Clicked')
    }
    return (
        <div className="login">
            <FacebookLogin
                appId={keys.FACEBOOK_KEY}
                callback={respond}
                fields='name,email,picture'
                onClick={handleClick}
            />

        </div>
    )
};
export default Login;