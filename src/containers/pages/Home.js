import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center mt-10 md:mt-40">
      <div id="welcome-card" className="card text-center p-10 mx-10">
        <h1 className="title">The</h1>
        <h1 className="title">Better Turnip Exchange</h1>
        <a id="welcome-btn" className="btn btn-blue mt-4" href="/find">
          Get Started
        </a>
      </div>
    </div>
  );
};
export default Home;
