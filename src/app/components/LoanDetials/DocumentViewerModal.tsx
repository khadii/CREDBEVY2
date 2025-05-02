"use client";

import React from "react";
import { useEffect, useState } from "react";
import AnimatedLoader from "../animation";

interface DocumentViewerModalProps {
  documentUrl: string;
  documentName: string;
  onClose: () => void;
}

const DocumentViewerModal = ({ documentUrl, documentName, onClose }: DocumentViewerModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    return extension;
  };

  // In case the URL doesn't have a file extension, try to infer from the MIME type
  const getFileTypeFromUrl = (url: string) => {
    // First try extension
    const fileType = getFileType(url);
    if (fileType && ['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return fileType;
    }
    
    // For URLs like Cloudinary/other CDNs that might not have extensions
    if (url.includes('ucarecdn.com') || !fileType) {
      // Safe fallback to image if URL looks like an image CDN
      return 'image';
    }
    
    return 'unknown';
  };

  const renderDocument = () => {
    const fileType = getFileTypeFromUrl(documentUrl);

    switch(fileType) {
      case 'pdf':
        return (
          <iframe 
            src={documentUrl} 
            className="w-full h-full" 
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'image': // Added generic image type
        return (
          <img 
            src={documentUrl} 
            alt={documentName}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
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
            <AnimatedLoader isLoading={isLoading}/>
          )}
          {imageError ? (
            <div className="flex items-center justify-center h-full w-full">
              <p>Error loading document. Please try downloading instead.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">{ renderDocument()}</div>
           
          )}
        </div>
       
      </div>
    </div>
  );
};

export default DocumentViewerModal;