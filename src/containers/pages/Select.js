import React, { useState, useEffect, Fragment } from 'react';
import { loadState, saveState } from '../../libs/updateStorage';
import useInterval from '../../libs/useInterval';
import axios from 'axios';

import {
  initialState,
  getSelectedKeyWords,
  formatKeyword,
  renderIslands,
  handleNotification,
  sortIslands,
} from '../../libs/selectLib';

import NookAlert from '../molecules/NookAlert';
import Islands from '../molecules/Islands';

navigator.serviceWorker.register('notification-sw.js');

const Select = () => {
  const villager_id = 'test';
  const [state, setState] = useState(loadState() || initialState);
  const [openIslands, setOpenIslands] = useState({});
  const [displayIslands, setDisplayIslands] = useState([]);
  const [delay] = useState(7000);
  const [isRunning, setIsRunning] = useState(false);
  const [alertType, setAlertType] = useState('DEFUALT');
  const { keywords, price } = state;
  const [isIslandNotify, setIsIslandNotify] = useState(false);

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

  /* Server calls */
  const putUser = async () => {
    const body = {
      villager_id,
      price_threshold: price,
      keywords: getSelectedKeyWords(keywords),
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
    console.log('Post on /Run started');
    try {
      const {
        data: { islands_visited },
      } = await axios.post(`/run?villager_id=${villager_id}`);

      console.log(islands_visited);
      // Run notifications
      let diff = Object.keys(openIslands).filter(
        (island) => !Object.keys(islands_visited).includes(island),
      );
      if (diff.length != 0) {
        console.log('New Islands!');
        setAlertType('NEW_ISLANDS');
        notifyIsland();
      }
      // Set data
      var sortedIslands = sortIslands(Object.values(openIslands));
      setOpenIslands(islands_visited);
      setDisplayIslands(sortedIslands);
    } catch (error) {
      setAlertType('ERROR');
      console.error('POST /run error:', error.msg);
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

  /* Notification */
  const notifyIsland = () => {
    if (isIslandNotify) {
      console.log('notif already open');
    } else if (handleNotification) {
      const options = {
        body: 'We found a new Island for you, come check it out!',
        icon: 'http://pngimg.com/uploads/raccoon/raccoon_PNG16969.png',
        requireInteraction: true,
      };
      let notify = new Notification('New Island Found!', options);
      console.log('new notif', isIslandNotify);
      notify.onclose((e) => {
        setIsIslandNotify(false);
      });

      setIsIslandNotify(true);
    }
  };

  /* Render Keywords */
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

  return (
    <Fragment>
      <NookAlert alertType={alertType} />

      <div
        id="select-container"
        className="flex flex-col py-4 justify-center container max-w-screen-lg"
      >
        <div id="welcome-wrapper" className="text-center card py-6">
          <div className="title text-4xl">Welcome!</div>
          <div id="welcome-message" className="text-lg">
            Maybe a description of what this website does goes here?
          </div>
          <button className="btn btn-blue mt-10" onClick={(e) => onRun(e)}>
            {isRunning ? 'Stop' : 'Go!'}
          </button>
        </div>
        <div id="keyword-wrapper" className="card mt-4">
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
        <div id="price-wrapper" className="text-center mt-4 card">
          <h1 className="title text-3xl font-bolder my-2">How Many Bells?</h1>
          <input
            id="price-input"
            type="text"
            className="bg-white mb-2 py-2 px-2 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg "
            value={state.price}
            min="0"
            max="999"
            onChange={onHandlePrice}
          ></input>
        </div>
        <div id="island-wrapper" name="islands" className="mt-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-between">
            <Islands islands={displayIslands} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Select;
