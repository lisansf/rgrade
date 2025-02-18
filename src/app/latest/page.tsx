'use client';

import React from 'react';

export default function Latest() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Latest News
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles Section */}
        <div className="flex-1 grid grid-cols-1 gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`article-${index}`}
              className="bg-gray-100 w-[857px] rounded-lg shadow-md flex flex-col"
            >
              {/* Artikel Box */}
              <div className="h-[280px] w-full bg-gray-300 flex items-start justify-start p-4 rounded-t-lg">
                Article Box {index + 1}
              </div>
              {/* Judul Artikel */}
              <div className="p-4 w-full bg-white rounded-b-lg">
                <h2 className="text-lg font-medium text-gray-800">
                  Article Title {index + 1}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Advertisements Section */}
        <div className="w-full lg:w-[279px] flex flex-col gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`ad-${index}`}
              className="bg-gray-200 w-full rounded-lg shadow-md flex items-start justify-start p-4"
            >
              Ad Box {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
