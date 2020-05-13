import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Home from './containers/Home';
import Islands from './containers/Islands';
import Login from './containers/Login';


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path='/' exact component={Home} appProps={appProps} />
            <UnauthenticatedRoute path='/login' exact component={Login} appProps={appProps} />
            <AuthenticatedRoute path='/islands' exact component={Islands} appProps={appProps} />

        </Switch >

    )
}