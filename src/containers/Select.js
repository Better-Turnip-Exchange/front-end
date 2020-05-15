import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './Select.css';
import keys from '../config';

const Select = ({ userName }) => {
  const initialKeywords = {
    tip: true,
    gold: true,
    miles: true,
    entry: false,
    nmts: false,
  };
  const [keywords, setKeywords] = useState(initialKeywords);
  const [price, setPrice] = useState('500');

  const handlePrice = e => {
    setPrice(e.target.value);
  };

  const toggleKeyword = e => {
    e.preventDefault();

    setKeywords({
      ...keywords,
      [e.currentTarget.id]: !keywords[e.currentTarget.id],
    });
  };

  return (
    <div class='container mt-4 items-center'>
      <h3 class='welcome-message'> Welcome, {userName.split(' ')[0]}! </h3>
      <div class='mt-2'>
        <div class='keywords-wrapper flex mb-4'>
          <div class='keywords-header'>
            <h1>Keywords</h1>
            <h5>
              We'll go ahead and ignore these keywords while finding islands for
              you. Feel free to remove any!
            </h5>
          </div>

          <ul class='keyword-list'>
            {Object.keys(keywords).map(keyword => (
              <div
                type='button'
                class={`keyword-label tag label btn-info mr-2 ${
                  keywords[keyword] ? 'btn-primary' : 'btn-light'
                }`}
              >
                <span>{keyword}</span>
                <a id={keyword} onClick={toggleKeyword}>
                  <FontAwesomeIcon icon={faTimesCircle} size='xs' />
                </a>
              </div>
            ))}
          </ul>
        </div>

        <div class='input-group price-input mb-2'>
          <h1>How Many Bells?</h1>
          <input
            type='text'
            name='price-input'
            class=' price-input'
            value={price}
            min='0'
            max='999'
            onChange={handlePrice}
          ></input>
        </div>

        <div class='card-deck text-center'>
          <div class='card box-shadow'>
            <h3 class='card-header'>Islands</h3>
            <div class='card-body'>
              <p class='card-text'>
                View your islands here, or have them sent to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Select;
