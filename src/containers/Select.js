import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './Select.css';
import keys from '../config';

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

  const [name, setName] = useState(initialState.name);
  const [keywords, setKeywords] = useState(initialState.keywords);
  const [price, setPrice] = useState(initialState.price);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  /* Event Calls */
  const onHandlePrice = e => {
    setPrice(e.target.value);
  };

  const onToggleKeyword = e => {
    e.preventDefault();
    toggleKeyword(e.currentTarget.id);
  };

  /* Keywords */
  const toggleKeyword = (key, bool = !keywords[key]) => {
    console.log('Toggling keyword', key, 'to', bool);
    setKeywords(prevState => ({
      ...prevState,
      [key]: bool,
    }));
  };

  const adjustKeywords = userKeywords => {
    Object.keys(keywords).forEach((word, i) => {
      toggleKeyword(word, userKeywords.includes(word));
    });
  };

  const getSelectedKeyWords = keywords => {
    const selected = [];
    for (const word in keywords) {
      if (keywords[word] === true) {
        selected.push(word);
      }
    }
    return selected;
  };

  /* Server calls */
  const putUser = async () => {
    const body = {
      villager_id: name,
      keywords: getSelectedKeyWords(keywords),
      price_threshold: price,
    };
    try {
      const res = await axios.post('villager/', body);

      console.log('putUser Success:', res.data);
    } catch (error) {
      console.error('putUser Error:', error);
    }
  };

  const getUser = async () => {
    console.log('getuser');
    try {
      const res = await axios.get(`villager/${name}/public`);

      setUserInfo(res.data);

      adjustKeywords(res.data.keywords);
      setPrice(res.data.price_threshold);
    } catch (error) {
      console.log('getUser Error', error);
    }
  };

  return (
    <div class='container mt-2 items-center'>
      <h3 class='font-title'> Welcome, {userName.split(' ')[0]}! </h3>
      <div class='mt-2'>
        <div class='mb-4'>
          <div class='mt-3'>
            <h1>Ignore Keywords</h1>
            <h5>
              We'll go ahead and ignore these keywords while finding islands for
              you. Feel free to remove any!
            </h5>
          </div>

          <ul class='py-1 keyword-list'>
            {Object.keys(keywords).map(keyword => (
              <div
                type='button'
                class={`keyword-label tag label btn-info mr-2 ${
                  keywords[keyword] ? 'btn-primary' : 'btn-light'
                  }`}
                id={keyword}
                onClick={!keywords[keyword] ? onToggleKeyword : null}
              >
                <span id={keyword}>{keyword}</span>
                <a
                  id={keyword}
                  style={!keywords[keyword] ? { display: 'none' } : null}
                  id={keyword}
                  onClick={onToggleKeyword}
                >
                  <FontAwesomeIcon icon={faTimesCircle} size='xs' />
                </a>
              </div>
            ))}
          </ul>
        </div>
        <div class=''>
          <h1>How Many Bells?</h1>
          <input
            type='text'
            class='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg '
            value={price}
            min='0'
            max='999'
            onChange={onHandlePrice}
          ></input>
        </div>

        <div class='button-wrapper mb-2'>
          <button type='button' class='btn btn-warning' onClick={putUser}>
            {' '}
            Update{' '}
          </button>
        </div>
      </div>
    </div>

  );
};
export default Select;
