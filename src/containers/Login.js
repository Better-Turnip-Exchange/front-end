import React from 'react';
import FacebookLogin from 'react-facebook-login';
import keys from '../config';

const Login = props => {
    const respond = (res) => {
        localStorage.setItem('userName', res.name)
        localStorage.setItem('token', res.accessToken)
        props.setAuthenticated(true)
        props.setUserName(res.name)
        props.history.push('/');

    }
    return (
        <div className="login">
            <FacebookLogin
                appId={keys.FACEBOOK_KEY}
                callback={respond}
                fields='name,email,picture'
            />

        </div>
    )
};
export default Login;