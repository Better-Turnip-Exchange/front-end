import React, { useState, useEffect, Fragment } from 'react';
import { loadState, saveState } from '../libs/updateStorage';
import axios from 'axios';
import useInterval from '../libs/useInterval';

navigator.serviceWorker.register('notification-sw.js');

const Select = ({ userName }) => {
  const initialState = {
    name: userName,
    keywords: {
      tip: false,
      gold: false,
      miles: false,
      entry: true,
      nmts: false,
    },
    price: 500,
  };
  const villager_id = 'test';
  const [state, setState] = useState(loadState() || initialState);
  const [openIslands, setOpenIslands] = useState({});
  const [delay] = useState(7000);
  const [isRunning, setIsRunning] = useState(false);
  const { keywords, price } = state;

  useEffect(() => {
    saveState(state);
    if (isRunning) {
      putUser();
      postRun();
    }
  }, [state]);

  useInterval(
    () => {
      postRun();
    },
    isRunning ? delay : null,
  );

  /* Keywords */
  const toggleKeyword = (key, bool = !keywords[key]) => {
    console.log('Toggling keyword', key, 'to', bool);
    setState((prevState) => ({
      ...prevState,
      keywords: {
        ...prevState.keywords,
        [key]: bool,
      },
    }));
  };

  /* Filters selected keywords for PUT request */
  const getSelectedKeyWords = () => {
    let selected = [];
    for (const word in keywords) {
      if (keywords[word] === true) {
        selected.push(word);
      }
    }
    console.log(selected);
    return selected;
  };

  const formatKeyword = (keyword) => {
    return keyword.charAt(0).toUpperCase() + keyword.slice(1);
  };

  /* Notifications */
  const handleNotification = async () => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('./notification-sw.js');
    // }
    let permission = await Notification.requestPermission();
    if (permission === 'granted') {
      let msg = await navigator.serviceWorker.ready;
      msg.showNotification('New Island Found!', {
        body: 'We found a new Island for you, come check it out!',
        icon: 'https://duckduckgo.com/i/9da3dfa1.png',
      });
    }
  };

  /* Server calls */
  const putUser = async () => {
    const body = {
      villager_id,
      price_threshold: price,
      keywords: getSelectedKeyWords(),
      islands_visited: {},
    };
    try {
      const res = await axios.post('/villager/', body);

      console.log('putUser Success:', res.data);
    } catch (error) {
      console.error('putUser Error:', error);
    }
  };

  const postRun = async () => {
    // const config = {
    //   params: {
    //     villager_id,
    //   },
    // };
    console.log('post run');
    try {
      const {
        data: { islands_visited },
      } = await axios.post(`/run?villager_id=${villager_id}`);

      // Run notifications
      let diff = Object.keys(openIslands).filter(
        (island) => !Object.keys(islands_visited).includes(island),
      );
      if (diff.length != 0) {
        handleNotification();
      }

      // Set data
      setOpenIslands(islands_visited);
    } catch (error) {
      console.error('POST /run error:', error);
      setIsRunning(false);
    }
  };

  /* Event Calls */
  const onHandlePrice = (e) => {
    setState({ ...state, price: e.target.value });
  };

  const onToggleKeyword = (e) => {
    e.preventDefault();
    toggleKeyword(e.currentTarget.id);
  };

  const onRun = (e) => {
    if (isRunning) {
      console.log('Stopping run');
      setIsRunning(false);
    } else {
      putUser();
      postRun();
      setIsRunning(true);
    }
  };

  /* render */
  const renderKeywordList = (keywords) => {
    return Object.keys(keywords).map((keyword, i) => (
      <button
        className={`spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 ${
          keywords[keyword]
            ? 'bg-orange-200 hover:shadow-lg'
            : 'bg-gray-100 hover:bg-gray-200 hover:shadow-lg'
          }`}
        id={keyword}
        key={i}
        onClick={onToggleKeyword}
      >
        <span
          className={`keyword title-font ${keywords[keyword] ? 'ml-1' : null}`}
          id={keyword}
        >
          {formatKeyword(keyword)}
        </span>
      </button>
    ));
  };

  const renderIslands = (openIslands) => {
    if (openIslands === {}) {
      return <Fragment />;
    }
    return Object.keys(openIslands).map((island) => (
      <div className="card w-56 my-2">
        <a
          className="text-acBlue hover:text-acGreen"
          href={openIslands[island]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {openIslands[island]}
        </a>
      </div>
    ));
  };

  return (
    <div
      id="select-container"
      className="flex flex-col py-10 justify-center container max-w-screen-lg"
    >
      <div id="welcome-wrapper" className="text-center mb-12 card">
        <button onClick={handleNotification}>Notif?</button>
        <div className="title text-4xl">Welcome!</div>
        <div id="welcome-message" className="text-lg">
          Maybe a description of what this website does goes here?
        </div>
        <button className="btn btn-blue mt-10" onClick={(e) => onRun(e)}>
          {isRunning ? 'Stop' : 'Go!'}
        </button>
      </div>
      <div id="keyword-wrapper" className="card">
        <div className="keyword-message mt-3 text-center">
          <h1 className="title font-bolder text-3xl py-1">Ignore Keywords</h1>
          <h5 className="py-1 text-xl">
            We'll go ahead and ignore these keywords while finding islands for
            you. Feel free to remove any!
          </h5>
        </div>
        <ul className="keyword-list py-1 flex items-center justify-center">
          {renderKeywordList(state.keywords)}
        </ul>
      </div>
      <div id="price-wrapper" className="container text-center mt-4 card">
        <h1 className="title text-3xl font-bolder my-2">How Many Bells?</h1>
        <input
          id='price-input'
          type="text"
          className="bg-white mb-2 py-2 px-2 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg "
          value={state.price}
          min="0"
          max="999"
          onChange={onHandlePrice}
        ></input>
      </div>
      <div id="island-wrapper" className="container mt-8 p-0">
        <div className="flex flex-wrap justify-between">
          {renderIslands(openIslands)}
        </div>
      </div>
    </div>
  );
};
export default Select;
