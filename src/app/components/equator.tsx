import React from 'react';

const EqualHeightContainer = ({ leftContent, rightContent }:{ leftContent:any, rightContent:any }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 bg-[#FAFAFA]">
      <div className="md:col-span-2 flex flex-col h-full">
        {leftContent}
      </div>
      <div className="md:col-span-1 flex flex-col h-full">
        {rightContent}
      </div>
    </div>
  );
};

export default EqualHeightContainer;
export const TwoContainer = ({ leftContent, rightContent }:{ leftContent:any, rightContent:any }) => {
  return (
<div className="w-full grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 bg-[#FAFAFA]">
      <div className="md:col-span-1 flex flex-col h-full">
        {leftContent}
      </div>
      <div className="md:col-span-2 flex flex-col h-full">
        {rightContent}
      </div>
    </div>
  );
};




export const TheeContainer = ({ leftContent, rightContent ,middle}:{ leftContent:any, rightContent:any ,middle:any}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 bg-[#FAFAFA]">
      <div className="md:col-span-1 flex flex-col h-full">
        {leftContent}
      </div>
      <div className="md:col-span-1 flex flex-col h-full">
        {middle}
      </div>
      <div className="md:col-span-1 flex flex-col h-full">
        {rightContent}
      </div>
    </div>
  );
};
