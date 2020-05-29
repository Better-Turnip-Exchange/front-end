import React from 'react';
import PropTypes from 'prop-types';

import { handleNotificationTest } from '../libs/selectLib';

const NookAlert = ({ alertType }) => {
  const alert_mesage = () => {
    console.log('alert', alertType);
    switch (alertType) {
      case 'NEW_ISLANDS':
        return 'We found new islands! Scroll down to check them out.';
      case 'ERROR':
        return 'Oops! Something went wrong!';
      case 'DEFAULT':
      default:
        return 'Hello! Set some search parameters and click GO! to get started.';
    }
  };

  return (
    <div id="nook_alert">
      <div className="chat-bubble ml-3">
        <h1>{alert_mesage()}</h1>
      </div>
      <div id="raccoon" onClick={handleNotificationTest}></div>
    </div>
  );
};

NookAlert.propTypes = {
  alertType: PropTypes.string.isRequired,
};

export default NookAlert;
