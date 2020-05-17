import React from 'react';

const Splash = props => {
  return (
    <div className='flex content-end mx-auto my-40'>
      <div class='welcome-wrapper text-center bg-acLight rounded-lg p-10 shadow-xl h-auto'>
        <h1 class='title'>The</h1>
        <h1 class='title'>Better Turnip Exchange</h1>
        <a role='button' class='btn btn-blue mt-4' href='/login'>
          Get Started
        </a>
      </div>
    </div>
  );
};
export default Splash;
