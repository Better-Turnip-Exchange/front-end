import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
      <App class='h-screen' />
  </Router>,
  document.getElementById('root')
);

