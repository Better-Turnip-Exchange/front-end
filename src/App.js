import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import './build.css';

function App() {
  return (
    <div className='h-full'>
      <div
        id='navbar'
        className='flex flex-wrap p-3 items-center border-b bg-acLight border-acYellow'
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
