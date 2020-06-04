import React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import './build.css';

function App() {
  navigator.serviceWorker.register('./notification-sw.js');

  return (
    <div className="h-full">
      <div
        id="navbar"
        className="flex flex-wrap p-3 items-center bg-acLight border-b-4 border-acGrass-green"
      >
        <a
          className="navbar-brand mb-0 h1 text-xl text-center text-acBrown"
          id="nav_title"
          href="/"
        >
          <span
            className="font-title font-extrabold inline-block transform rotate-15"
            id="the"
          >
            The
          </span>
          {'  '}Better Turnip Exchange
        </a>
      </div>
      <div className="mx-auto">
        <Routes appProps={{}} />
      </div>
    </div>
  );
}

export default withRouter(App);
