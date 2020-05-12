import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';


export default function Routes({ appProps }) {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
        </Switch >

    )
}