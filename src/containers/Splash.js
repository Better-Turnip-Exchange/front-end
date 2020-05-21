import React from 'react';

const Splash = props => {
  return (
    <div className='flex justify-center items-center mt-10 md:mt-40'>
      <div id='welcome-wrapper' className='card text-center p-10 mx-10'>
        <h1 className='title'>The</h1>
        <h1 className='title'>Better Turnip Exchange</h1>
        <a id='get-started-btn' className='btn btn-blue mt-4' href='/find'>
          Get Started
        </a>
      </div>
    </div>
  );
};
export default Splash;
