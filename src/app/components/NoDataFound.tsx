import React from 'react';

export default function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Document Icon */}
        <div className="relative mb-8">
          {/* Back document */}
          <div className="absolute top-2 left-2 w-16 h-20 bg-gray-300 rounded-lg border-2 border-gray-400 opacity-60"></div>
          {/* Front document */}
          <div className="relative w-16 h-20 bg-white rounded-lg border-2 border-gray-400 shadow-sm">
            {/* Document corner fold */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-gray-200 border-l border-b border-gray-400" 
                 style={{
                   clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                 }}>
            </div>
            {/* Document lines */}
            <div className="p-2 pt-3 space-y-1">
              <div className="h-0.5 bg-gray-300 rounded w-8"></div>
              <div className="h-0.5 bg-gray-300 rounded w-6"></div>
              <div className="h-0.5 bg-gray-300 rounded w-7"></div>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#4A4A4A] mb-2">
          No data found
        </h2>
        
        {/* Subtitle */}
        <p className="text-[#4A4A4A] text-sm font-normal">
          Sorry, we couldn't find any data for you
        </p>
        
       
      </div>
    </div>
  );
}