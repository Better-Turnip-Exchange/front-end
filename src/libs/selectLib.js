import React, { Fragment } from 'react';
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

}
export const formatTime = (time) => {
    return (moment.utc(time, "YYYY-MM-DD hh:mm:ss").fromNow());
}

/* Island Renderer */
export const renderIslands = (openIslands) => {
    if (openIslands === {}) {
        return <Fragment />;
    }
    return Object.keys(openIslands).map((island) => (
        <div class="w-full lg:w-1/3 md:mx-2 my-12 rounded-lg bg-acLight shadow-md">
            <div id='island-main-info' class="shadow relative block px-4 py-6">
                <a href={openIslands[island].link} class="block font-semibold mb-2 px-2 text-3xl font-title text-acBrown">
                    {openIslands[island].name}
                </a>
                <p class='block font-normal text-md px-2 text-acBrown'>
                    {formatTime(openIslands[island].creationTime)}
                </p>
                <div class="p-2 h-auto md:h-40 overflow-y-scroll lg:h-48 border-b">
                    <div class="text-acBrown font-semibold text-md leading-relaxed block">
                        {openIslands[island].description}
                    </div>
                </div>
                <div id='island-subinfo' class="py-2 block">
                    <p class="py-1 px-2 text-md text-acBrown font-title">Price: {openIslands[island].turnipPrice} Bells </p>
                    <div className="py-1 px-2">
                        <div className='flex justify-between'>
                            <p class='text-md text-acBrown font-title'>Current Queue</p>
                            <p class='py-1 text-xs text-gray-700'>{openIslands[island].queued}</p>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-acYellow">
                            <div style={{ width: formatCapacity(openIslands[island]) }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-acGreen"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ));
};

/* Notifications */
export const handleNotification = async () => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('./notification-sw.js');
    // }
    let permission = await Notification.requestPermission();
    if (permission === 'granted') {
        let msg = await navigator.serviceWorker.ready;
        msg.showNotification('New Island Found!', {
            body: 'We found a new Island for you, come check it out!',
            icon: 'https://duckduckgo.com/i/9da3dfa1.png',
        });
    }
};
