import React from 'react';

// Define the props type for the Card component
interface CardProps {
  title: string;
  value: string | number;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-[#156064] text-white w-full rounded-lg 
 flex flex-col justify-center px-4 max-h-[140px] py-[35px]">
      <h2 className="text-[14px] sm:text-[16px] font-bold truncate">{value}</h2>
      <p className="text-[12px] sm:text-[14px] font-semibold leading-tight truncate">{description}</p>
    </div>
  );
};

export default Card;
