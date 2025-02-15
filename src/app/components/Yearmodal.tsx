"use client";

import { useState } from "react";

type YearModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (year: string) => void;
};

const YearModal = ({ isOpen, onClose, onSelect }: YearModalProps) => {
  if (!isOpen) return null;

  return (
   
      <div className="bg-white rounded-lg shadow-lg p-2 ">
      
        <div className="space-y-3">
          <button
            onClick={() => onSelect("This Year")}
            className="w-full text-center  text-xs text-black"
          >
            This Year
          </button>
          <button
            onClick={() => onSelect("Last Year")}
            className="w-full text-center  text-xs text-black"
          >
            Last Year
          </button>
        </div>
      
      </div>
 
  );
};

export default YearModal;