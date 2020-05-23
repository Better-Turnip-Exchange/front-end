import React, { useState, useEffect, useRef, Fragment } from 'react';
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

      console.log(islands_visited)
      // Run notifications
      let diff = Object.keys(openIslands).filter(
        (island) => !Object.keys(islands_visited).includes(island),
      );
      if (diff.length !== 0) {
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

  const onRun = () => {
    if (isRunning) {
      console.log('Stopping run');
      setIsRunning(false);
    } else {
      putUser();
      postRun();
      setIsRunning(true);
    }

  };

  const handleClick = () => {
    onRun();

  }

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
  const renderStars = (stars) => {
    for (const i in stars) {
      return <h1>i</h1>
    }


  }

  const renderIslands = (openIslands) => {
    if (openIslands === {}) {
      return <Fragment />;
    }
    console.log(openIslands);
    return Object.keys(openIslands).map((island) => (
      <div class="w-full lg:w-1/3 md:mx-2 mb-4 m-10 md:mb-0 bg-acLight">
        <div class="rounded-lg overflow-hidden shadow relative">
          <div class="p-4 h-auto md:h-40 lg:h-48">
            <a href="#" class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg">
              {openIslands[island].name}
            </a>
            <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
            </div>
            <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
              <a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#something</a>
              <a class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700" href="#">#sky</a>
            </div>
          </div>
        </div>
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
        <button className="btn btn-blue mt-10" onClick={handleClick}>
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
      <div id="island-wrapper" name='islands' className="container mt-8 p-0">
        <div className="block lg:flex flex-wrap justify-between">
          {renderIslands(openIslands)}
        </div>
      </div>
    </div>
  );
};
export default Select;
