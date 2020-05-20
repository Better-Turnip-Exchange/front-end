import React from 'react';

const Splash = props => {
  return (
    <div className='flex justify-center items-center mt-10 md:mt-40'>
      <div
        id='welcome-wrapper'
        class='text-center bg-acLight rounded-lg shadow-xl p-10 mx-10'
      >
        <h1 class='title'>The</h1>
        <h1 class='title'>Better Turnip Exchange</h1>
        <a class='btn btn-blue mt-4' href='/find'>
          Get Started
        </a>
      </div>
    </div>
  );
};
export default Splash;
