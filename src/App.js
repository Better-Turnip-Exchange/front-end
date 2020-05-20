import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import './build.css';

function App() {
  return (
    <div className='bg-acBlue h-screen'>
      <div
        id='navbar'
        className='flex flex-wrap p-3 items-center border-b bg-yellow-100 border-yellow-200'
      >
        <a className='navbar-brand mb-0 h1 text-xl text-center' href='/'>
          <span className='font-title font-extrabold'>The </span>Better Turnip
          Exchange
        </a>
      </div>
      <div className='mx-auto'>
        <Routes appProps={{}} />
      </div>
    </div>
  );
}

export default withRouter(App);
