// ToggleButton.tsx
import React from "react";

interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const CheckToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`w-6 h-6 rounded ${
        isActive ? "bg-[#156064] text-white" : "bg-white border border-gray-300"
      } flex items-center justify-center`}
      onClick={onClick}
    >
      {isActive && <CheckIcon />}
    </button>
  );
};

// Check icon component
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default CheckToggleButton;