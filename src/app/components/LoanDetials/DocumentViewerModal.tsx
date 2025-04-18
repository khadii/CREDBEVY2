"use client";

import React from "react";
import { useEffect, useState } from "react";

interface DocumentViewerModalProps {
  documentUrl: string;
  documentName: string;
  onClose: () => void;
}

const DocumentViewerModal = ({ documentUrl, documentName, onClose }: DocumentViewerModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return extension;
  };

  const renderDocument = () => {
    const fileType = getFileType(documentUrl);

    switch(fileType) {
      case 'pdf':
        return (
          <iframe 
            src={documentUrl} 
            className="w-full h-full" 
            onLoad={() => setIsLoading(false)}
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <img 
            src={documentUrl} 
            alt={documentName}
            className="max-w-full max-h-full"
            onLoad={() => setIsLoading(false)}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>Preview not available for this file type. Please download to view.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-4/5 h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">{documentName}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>Loading document...</p>
            </div>
          )}
          {renderDocument()}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;