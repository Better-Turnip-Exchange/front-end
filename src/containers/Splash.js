import React from 'react';

const Splash = props => {
  return (
    <div className='flex content-end mx-auto my-40'>
      <div class='welcome-wrapper text-center '>
        <h1 class='font-title text-4xl'>The</h1>
        <h1 class='font-title text-4xl'> Better Turnip Exchange</h1>
        <button class='rounded-lg bg-blue-300 mt-4 py-2 px-8 shadow-md hover:shadow-lg'>
          <a role='button' href='/login'>
            <span class='font-title'>Get Started</span>
          </a>
        </button>
      </div>
    </div>
  );
};
export default Splash;
