import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'; // Using Feather Icons from react-icons

interface ErrorDisplayProps {
  /**
   * The error message to display.
   * If not provided, a default message will be shown.
   */
  error?: string;
  /**
   * The title for the error display.
   * Defaults to "Unable to Load Details" if not provided.
   */
  title?: string;
  /**
   * Optional icon component to display.
   * Defaults to FiAlertTriangle if not provided.
   * Example: <FiAlertCircle /> or any React Icon component.
   */
  icon?: React.ElementType;
  /**
   * Optional callback function to execute when the retry button is clicked.
   * The retry button will only be shown if this prop is provided.
   */
  onRetry?: () => void;
}

/**
 * A reusable component to display error messages with an optional retry mechanism.
 * It provides a clear visual indication of an error and allows for customization
 * of the error message, title, and icon.
 */
export default function ErrorDisplay({
  error,
  title = "Unable to Load Data", // Default title
  icon: IconComponent = FiAlertTriangle, // Default icon
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="w-full bg-[#FAFAFA] pb-[60px] flex flex-col h-full font-sans">
      {/* Page Title - Can be made dynamic if needed, but kept static for context */}
      <div>
        {/* <p className="mb-[32px] text-[34px] font-bold">Details</p> */}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="p-12 max-w-md w-full mx-4 text-center  relative overflow-hidden">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-red-50 border-2 border-red-200 rounded-full p-4">
              {/* Render the passed IconComponent or the default FiAlertTriangle */}
              <IconComponent className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Error Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {title}
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {error || "Something went wrong. Please try again."}
          </p>

          {/* Retry Button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiRefreshCw className="h-4 w-4" />
              Try Again
            </button>
          )}

          {/* Decorative elements (kept for visual flair) */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-gray-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 left-8 w-2.5 h-2.5 bg-gray-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
}
