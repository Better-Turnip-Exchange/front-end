import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute'
import Home from './containers/Home';


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path='/' exact component={Home} appProps={appProps} />
        </Switch >

    )
}