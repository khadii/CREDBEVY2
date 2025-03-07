"use client";

import React, { useState } from "react";

interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 ${
        isEnabled ? "bg-[#156064]" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full transform duration-300 ease-in-out ${
          isEnabled ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;