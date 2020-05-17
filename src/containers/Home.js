import React, { Fragment } from 'react';
import Splash from './Splash';
import Select from './Select';
import './Home.css';

const Home = props => {
  const renderLogin = () => {
    return <Splash {...props} />;
  };
  const renderSelect = () => {
    return <Select {...props} />;
  };
  return (
    <Fragment>{props.authenticated ? renderSelect() : renderLogin()}</Fragment>
  );
};
export default Home;
