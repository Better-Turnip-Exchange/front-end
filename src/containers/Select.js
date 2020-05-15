import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import './Select.css';

const Select = props => {
    const [name, setName] = useState(props.userName)
    const [keywords, setKeywords] = useState(['tip', 'gold', 'miles']);
    const [price, setPrice] = useState('500');
    const [userInfo, setUserInfo] = useState({});
    const [open, setOpen] = useState(false);
    const sendFilters = () => {
        axios.post('villager/', {
            villager_id: name,
            keywords: keywords,
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
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const removeKeyword = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target)
        let removed = e.currentTarget.id;
        console.log(removed)
        setKeywords(keywords.filter(word => word !== removed))
        console.log(keywords)
    }
    return (
        <div class='container mt-4 items-center'>
            <h3 class='welcome-message'> Welcome, {props.userName.split(' ')[0]}! </h3>
            <div class='mt-2'>
                <div class='keywords-wrapper flex mb-4'>
                    <div class='keywords-header'>
                        <h1>Keywords</h1>
                        <h5>We'll go ahead and ignore these keywords while finding islands for you. Feel free to remove any!</h5>
                    </div>

                    <ul class='keyword-list'>
                        {keywords && keywords.map((keyword, index) =>
                            <div type='button' class='keyword-label tag label btn-info mr-2' >
                                <span>{keyword}</span>
                                <a id={keyword} onClick={removeKeyword}><FontAwesomeIcon icon={faTimesCircle} size='xs' /></a>
                            </div>
                        )}
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
                <div class='card-deck text-center'>
                    <div class='card box-shadow'>
                        <h3 class='card-header'>
                            Islands
                                </h3>
                        <div class='card-body'>
                            <p class='card-text'>View your islands here, or have them sent to you.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}
export default Select;