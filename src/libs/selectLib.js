import { useState } from 'react';
import moment from 'moment';

export const initialState = {
  keywords: {
    tip: false,
    gold: false,
    miles: false,
    entry: true,
    nmts: false,
  },
  price: 500,
};

/* Keyword Helpers */
export const getSelectedKeyWords = (keywords) => {
  let selected = [];
  for (const word in keywords) {
    if (keywords[word] === true) {
      selected.push(word);
    }
  }
  console.log(selected);
  return selected;
};

export const formatKeyword = (keyword) => {
  return keyword.charAt(0).toUpperCase() + keyword.slice(1);
};

/* Islands Formatters */
export const formatCapacity = (island) => {
  const current = island.queued.split('/')[0];
  const max = island.maxQueue;
  const capactiy = Number(current) / max;
  return String(capactiy * 100) + '%';
};
export const formatTime = (time) => {
  let localTime = moment(time).utc(true).format('YYYY-MM-DD hh:mm');
  return moment(localTime).calendar();
};
export const sortIslands = (islands) => {
  let sortedIslands = islands.sort(function (a, b) {
    return moment(b.creationTime).utc(true) - moment(a.creationTime).utc(true);
  });
  return sortedIslands;
};

export const handleNotification = () => {
  if (!('Notification' in window)) {
    console.warn('Notifications are not supported by this browser');
  } else if (Notification.permission == 'granted') {
    return true;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        return true;
      }
    });
  }
  return false;
};
