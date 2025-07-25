// components/Modals/SearchInputModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { LucideSearch, X } from "lucide-react";

interface SearchInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit: (searchTerm: string) => void;
}

const SearchInputModal: React.FC<SearchInputModalProps> = ({
  isOpen,
  onClose,
  onSearchSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Clear search term when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <div className="fixed inset-0 bg-[#17191CBA] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Search</h2>
        <form onSubmit={handleSubmit} className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="flex-grow p-3 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-[#156064] text-white p-3 hover:bg-[#114b4f] transition-colors duration-200"
          >
            <LucideSearch size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Press Enter to search or click the search icon.</p>
      </div>
    </div>
  );
};

export default SearchInputModal;