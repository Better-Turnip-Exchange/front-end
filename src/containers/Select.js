import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { loadState, saveState } from '../libs/updateStorage';
import axios from 'axios';

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
  const [state, setState] = useState(loadState() || initialState);
  const { keywords, price } = state;

  useEffect(() => {
    saveState(state);
  }, [state]);

  /* Event Calls */
  const onHandlePrice = e => {
    setState({ ...state, price: e.target.value });
  };

  const onToggleKeyword = e => {
    e.preventDefault();
    toggleKeyword(e.currentTarget.id);
  };

  /* Keywords */
  const toggleKeyword = (key, bool = !keywords[key]) => {
    console.log('Toggling keyword', key, 'to', bool);
    setState(prevState => ({
      ...prevState,
      keywords: {
        ...prevState.keywords,
        [key]: bool,
      },
    }));
  };

  /* Filters selected keywords for PUT request */
  const getSelectedKeyWords = keywords => {
    const selected = [];
    for (const word in keywords) {
      if (keywords[word] === true) {
        selected.push(word);
      }
    }
    return selected;
  };

  const formatKeyword = keyword => {
    return keyword.charAt(0).toUpperCase() + keyword.slice(1);
  };
  const renderKeywordList = keywords => {
    return Object.keys(keywords).map(keyword => (
      <button
        class={`spin keyword-label rounded py-2 px-2 mr-2 shadow-md w-20 ${
          keywords[keyword]
            ? 'bg-orange-200 hover:shadow-lg'
            : 'bg-gray-100 hover:bg-gray-200 hover:shadow-lg'
        }`}
        id={keyword}
        onClick={!keywords[keyword] ? onToggleKeyword : null}
      >
        <a
          id={keyword}
          class={
            !keywords[keyword]
              ? 'hidden'
              : 'fill-current opacity-50 hover:opacity-100'
          }
          id={keyword}
          onClick={onToggleKeyword}
        >
          <FontAwesomeIcon icon={faTimesCircle} size='xs' />
        </a>
        <span
          class={`keyword title-font ${keywords[keyword] ? 'ml-1' : null}`}
          id={keyword}
        >
          {formatKeyword(keyword)}
        </span>
      </button>
    ));
  };

  /* Server calls */
  const putUser = async () => {
    const body = {
      state,
    };
    try {
      const res = await axios.post('villager/', body);

      console.log('putUser Success:', res.data);
    } catch (error) {
      console.error('putUser Error:', error);
    }
  };

  return (
    <div id='select-container' class='flex py-10 content-center justify-center'>
      <div id='select-wrapper'>
        <div id='welcome-wrapper' className='text-center mb-12 card'>
          <div class='title text-4xl'>Welcome!</div>
          <div id='welcome-message' class='text-lg'>
            Maybe a description of what this website does goes here?
          </div>
        </div>
        <div id='keyword-wrapper' className='card'>
          <div class='keyword-message mt-3 text-center'>
            <h1 class='title font-bolder text-3xl py-1'>Ignore Keywords</h1>
            <h5 class='py-1 text-xl'>
              We'll go ahead and ignore these keywords while finding islands for
              you. Feel free to remove any!
            </h5>
          </div>
          <ul class='keyword-list py-1 flex items-center justify-center'>
            {renderKeywordList(state.keywords)}
          </ul>
        </div>
        <div id='price-wrapper' class='container text-center mt-4 card'>
          <h1 class='title text-3xl font-bolder my-2'>How Many Bells?</h1>
          <input
            type='text'
            class='bg-white mb-2 py-2 px-2 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg '
            value={state.price}
            min='0'
            max='999'
            onChange={onHandlePrice}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default Select;
