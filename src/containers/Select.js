import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import './Select.css';
import keys from '../config';

const Select = ({ userName }) => {

  const initialKeywords = {
    tip: false,
    gold: false,
    miles: false,
    entry: false,
    nmts: false,
  };

  const [name, setName] = useState(userName)
  const [keywords, setKeywords] = useState(initialKeywords);
  const [price, setPrice] = useState('500');
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);


  const handlePrice = e => {
    setPrice(e.target.value);
  };

  const toggleKeyword = e => {
    e.preventDefault();
    console.log('Toggling keyword');
    console.log(e.target)
    setKeywords({
      ...keywords,
      [e.currentTarget.id]: !keywords[e.currentTarget.id],
    });
  };
  const getSelectedKeyWords = (keywords) => {
    const selected = [];
    for (const word in keywords) {
      if (keywords[word] === true) {
        selected.push(word)
      }
    }
    return selected;
  }

  const sendFilters = () => {
    let words = getSelectedKeyWords(keywords)
    axios.post('villager/', {
      villager_id: name,
      keywords: words,
      price_threshold: price
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      });

  }
  const getFilters = () => {
    axios.get(`villager/${name}/public`)
      .then((res) => {

        console.log(res);
        setUserInfo(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err)
      });

  }


  const adjustKeywords = (userKeywords) => {
    if (userKeywords) {
      userKeywords.forEach((word, i) => {
        keywords[word] = true
      })
    }
    else {
      for (let i = 0; i < Object.keys(initialKeywords).length / 2; i++) {
        console.log(Object.keys(initialKeywords)[i])
        keywords[Object.keys(initialKeywords)[i]] = true;
        console.log(keywords)
      }
    }
  }

  async function getUser() {
    await axios.get(`villager/${name}/public`)
      .then((res) => {

        console.log(res);
        setUserInfo(res.data);
        adjustKeywords(res.data.keywords)
        setPrice(res.data.price_threshold)
        setOpen(true);
      })
      .catch((err) => {
        console.log(err)
        adjustKeywords(null)
      });

  }

  useEffect(() => {
    getUser();
  }, [name])




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
                id={keyword}
                onClick={!keywords[keyword] ? toggleKeyword : null}
              >
                <span id={keyword}>{keyword}</span>
                <a id={keyword} style={!keywords[keyword] ? { "display": "none" } : null} id={keyword} onClick={toggleKeyword}>
                  <FontAwesomeIcon icon={faTimesCircle} size='xs' />
                </a>
              </div>
            ))}
          </ul>
        </div>
        <div class="input-group price-input mb-2">
          <h1>How Many Bells?</h1>
          <input type="text" name='price-input' class=" price-input" value={price} min='0' max="999" onChange={handlePrice}></input>
        </div>

        <div class='button-wrapper mb-2'>
          <button type='button' class='btn btn-warning' onClick={sendFilters}> Update </button>
        </div>
        <div class='button-wrapper mb-2'>
          <button type='button' class='btn btn-warning' onClick={getFilters}> Get Villager Info </button>
        </div>
        <div class="user-info-modal modal fade" show={open} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
                             </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >

  );
};
export default Select;
