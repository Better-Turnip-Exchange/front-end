import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

function App() {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false)
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState('')
  useEffect(() => {
    onLoad();

  }, []);

  async function onLoad() {
    let userToken = localStorage.getItem('token') || null;
    let user = localStorage.getItem('userName') || null;
    if (userToken && user) {
      setAuthenticated(true)
      setToken(userToken)
      setUserName(user)
    }
  }

  return (
    <div className="container-fluid app">
      <Routes appProps={{ authenticated, userName, token }} />
    </div>
  );
}

export default withRouter(App);
