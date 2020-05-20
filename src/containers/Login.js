import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookProvider, LoginButton } from 'react-facebook';
import keys from '../config';

const Login = props => {
    const respond = (res) => {
        localStorage.setItem('userName', res.profile.first_name)
        localStorage.setItem('token', res.tokenDetail.accessToken)
        props.setAuthenticated(true)
        props.setUserName(res.name)
        props.history.push('/');

    }
    return (
        <div className="login">
            <FacebookProvider appId={keys.FACEBOOK_KEY}>
                <LoginButton
                    scope="email"
                    onCompleted={respond}
                    onError={(err) => console.log(err)}
                >
                    <span>login</span>
                </LoginButton>
            </FacebookProvider>

        </div>
    )
};
export default Login;