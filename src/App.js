import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  useEffect(() => {
    onLoad();

  }, []);

  async function onLoad() {
    let userToken = localStorage.getItem('token') || null;
    if (userToken) {
      console.log('found a token:' + userToken)
      setAuthenticated(true)
      setToken(userToken)
    }
  }

  return (
    <div className="container-fluid app">
      <Routes appProps={{ authenticated }} />
    </div>
  );
}

export default withRouter(App);
