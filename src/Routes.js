import React from 'react';
import { Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/pages/Home';
import Select from './containers/pages/Select';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/find" exact component={Select} appProps={appProps} />
    </Switch>
  );
}
