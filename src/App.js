import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Routes from './Routes';
import './build.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    onLoad();
  }, []);
  const hooks = {
    authenticated,
    setAuthenticated,
    userName,
    setUserName,
    token,
    setToken,
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setAuthenticated(false);
  };
  async function onLoad() {
    let userToken = localStorage.getItem('token') || null;
    let user = localStorage.getItem('userName') || null;
    if (userToken && user) {
      setAuthenticated(true);
      setToken(userToken);
      setUserName(user);
    }
  }

  return (
    <div>
      <div class='flex justify-between flex-wrap bg-yellow-300 p-3'>
        <span class='navbar-brand mb-0 h1 text-xl' href='/'>
          <span class='font-extrabold'>The </span>Better Turnip Exchange
        </span>
      </div>

      <div class='max-auto bg-blue-200 h-screen'>
        <Routes appProps={{ ...hooks }} />
      </div>
    </div>
  );
}

export default withRouter(App);
