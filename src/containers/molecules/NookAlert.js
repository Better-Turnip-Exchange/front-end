import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInterval from '../../libs/useInterval';

import './NookAlert.css';
import { CSSTransition } from 'react-transition-group';

import { handleNotification } from '../../libs/selectLib';

const NookAlert = ({ alertType }) => {
  const timer_delay = 12000;
  const [isOpen, setIsOpen] = useState(true);
  const [timer, setTimer] = useState(timer_delay);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setResetFlag(true);
    }
    resetTimer();
    setIsOpen(true);
  }, [alertType]);

  useInterval(() => {
    if (resetFlag) {
      setResetFlag(false);
    } else {
      setIsOpen(false);
      setTimer(null);
    }
  }, timer);

  const resetTimer = () => {
    setTimer(null);
    setTimer(timer_delay);
  };

  const alert_mesage = () => {
    console.log('alert', alertType);

    switch (alertType) {
      case 'STARTING_RUN':
        return 'Hold on a sec, were looking for some islands now!';
      case 'NEW_ISLANDS':
        return 'We found new islands! Scroll down to check them out.';
      case 'ERROR':
        return 'Oops! Something went wrong!';
      case 'DEFAULT':
      default:
        return 'Hello! Set some search parameters and click GO! to get started.';
    }
  };

  const notifyTest = () => {
    if (handleNotification) {
      const options = {
        body: 'Hello',
        icon: 'http://pngimg.com/uploads/raccoon/raccoon_PNG16974.png',
      };
      new Notification('Oh, Looks like notifications are working', options);
    }
  };

  return (
    <div>
      <CSSTransition in={isOpen} classNames="nook" appear={true} timeout={5000}>
        <div class="nook">
          <div className="chat-bubble ml-3">
            <h1>{alert_mesage()}</h1>
          </div>
          <div
            id="raccoon"
            onClick={(e) => {
              notifyTest();
            }}
          ></div>
        </div>
      </CSSTransition>
    </div>
  );
};

NookAlert.propTypes = {
  alertType: PropTypes.string.isRequired,
};

export default NookAlert;

export const AlertTypes = {
  STARTING_RUN: 'STARTING_RUN',
  NEW_ISLANDS: 'NEW_ISLANDS',
  ERROR: 'ERROR',
  DEFAULT: 'DEFAULT',
};
