import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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

  const [name, setName] = useState(initialState.name);
  const [keywords, setKeywords] = useState(initialState.keywords);
  const [price, setPrice] = useState(initialState.price);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUser();
  });

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
    <div class='container flex py-40 justify-center'>
      <div class='inline-block mt-2'>
        <div class='welcome-wrapper text-center'>
          <h3 class='font-title text-4xl'>
            {' '}
            Welcome, {userName.split(' ')[0]}!{' '}
          </h3>
        </div>
        <div class='filter-wrapper'>
          <div class='keyword-wrapper'>
            <div class='keyword-message mt-3 text-center'>
              <h1 class='font-title font-bolder text-3xl py-1'>
                Ignore Keywords
              </h1>
              <h5 class='py-1 text-xl'>
                We'll go ahead and ignore these keywords while finding islands
                for you. Feel free to remove any!
              </h5>
            </div>

            <ul class='keyword-list py-1 flex items-center justify-center'>
              {Object.keys(keywords).map(keyword => (
                <button
                  class={`spin keyword-label rounded py-2 px-3 mr-2 shadow-md ${
                    keywords[keyword]
                      ? 'bg-yellow-200 hover:shadow-lg'
                      : 'bg-gray-100 hover:bg-yellow-200 hover:shadow-lg'
                  }`}
                  id={keyword}
                  onClick={!keywords[keyword] ? onToggleKeyword : null}
                >
                  <a
                    id={keyword}
                    class={!keywords[keyword] ? 'hidden' : null}
                    id={keyword}
                    onClick={onToggleKeyword}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} size='xs' />
                  </a>
                  <span
                    class={`keyword title-font ${
                      keywords[keyword] ? 'ml-2' : null
                    }`}
                    id={keyword}
                  >
                    {keyword}
                  </span>
                </button>
              ))}
            </ul>
          </div>
          <div class='container text-center mt-4'>
            <h1 class='font-title text-3xl font-bolder my-2'>
              How Many Bells?
            </h1>
            <input
              type='text'
              class='bg-white mb-2 px-1 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg '
              value={price}
              min='0'
              max='999'
              onChange={onHandlePrice}
            ></input>
            <div class='button-wrapper items-center my-1'>
              <button
                class='bg-green-300 rounded-lg py-3 px-8 shadow-md hover:bg-green-400 hover:shadow-lg'
                onClick={putUser}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Select;
