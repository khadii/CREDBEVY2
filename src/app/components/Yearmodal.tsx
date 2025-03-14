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
            onClick={() => onSelect("year")}
            className="w-full text-center  text-xs text-black"
          >
           year
          </button>
          <button
            onClick={() => onSelect("months")}
            className="w-full text-center  text-xs text-black"
          >
           months
          </button>
          <button
            onClick={() => onSelect("weeks")}
            className="w-full text-center  text-xs text-black"
          >
         weeks
          </button>
          
        </div>
      
      </div>
 
  );
};




export default YearModal;