import React from 'react';

const Splash = props => {
    return (
        <div className="flex h-screen text-center mx-auto items-center">
            <div class='welcome-wrapper'>
                <h1 class='font-title text-4xl'>The</h1>
                <h1 class='font-title text-4xl'> Better Turnip Exchange</h1>
                <button class='rounded-lg bg-blue-300 mt-4 py-2 px-8 shadow-md hover:shadow-lg'>
                    <a role='button' href='/login'>
                        <span class='font-title'>
                            Get Started
                </span>
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Splash;