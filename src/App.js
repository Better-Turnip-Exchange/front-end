/*global FB*/
import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { FacebookProvider, Initialize } from 'react-facebook';
import Routes from './Routes';
import './build.css';
import keys from './config';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

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

  useEffect(() => {
    console.log(authenticated)
  }, [authenticated])

  return (
    <div className='bg-orange-100 h-screen'>
      <div id='navbar' className='flex flex-wrap p-3 items-center border-b bg-yellow-100 border-yellow-200'>
        <a className='navbar-brand mb-0 h1 text-xl text-center' href='/'>
          <span className='font-title font-extrabold'>The </span>Better Turnip Exchange
        </a>
      </div>

      <div className='mx-auto'>
        <Routes appProps={{ ...hooks }} />
      </div>
    </div>
  );
}

export default withRouter(App);
