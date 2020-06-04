import React, { Fragment } from 'react';
import { formatTime, formatCapacity } from '../../libs/selectLib';
import { v4 as uuid } from 'uuid';

const Islands = ({ islands }) => {
  return (
    <Fragment>
      {islands.map((island) => (
        <div class="w-full  rounded-lg bg-acLight shadow-md" key={uuid()}>
          <div id="island-main-info" class="shadow relative block px-4 py-6">
            <a
              href={island.link}
              target="_blank"
              class="block font-semibold mb-2 px-2 text-3xl overflow-x-scroll font-title text-acBrown"
            >
              {island.name}
            </a>
            <p class="block font-normal text-md px-2 text-acBrown">
              {formatTime(island.creationTime)}
            </p>
            <div class="p-2 h-auto md:h-40 overflow-y-scroll lg:h-48 border-b">
              <div class="text-acBrown font-semibold text-md leading-relaxed block">
                {island.description}
              </div>
            </div>
            <div id="island-subinfo" class="py-2 block">
              <p class="py-1 px-2 text-md text-acBrown font-title">
                Price: {island.turnipPrice} Bells{' '}
              </p>
              <div className="py-1 px-2">
                <div className="flex justify-between">
                  <p class="text-md text-acBrown font-title">Current Queue</p>
                  <p class="py-1 text-xs text-gray-700">{island.queued}</p>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-acYellow">
                  <div
                    style={{ width: formatCapacity(island) }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-acGreen"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Islands;
