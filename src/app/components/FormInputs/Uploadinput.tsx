import React, { useState } from "react";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  onBlur: () => void;
  value: File | null;
  error?: any;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  onBlur,
  value,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("File size must be less than 1 MB");
        return;
      }
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG and JPG files are allowed");
        return;
      }
    }
    onChange(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          w-full h-48 border-2 border-dashed rounded-lg 
          flex flex-col items-center justify-center 
          transition-colors duration-300
          ${
            dragActive
              ? "border-[#156064] bg-blue-50"
              : "border-gray-300 hover:border-[#156064]"
          }
          ${error ? "border-red-500 bg-red-50" : ""}
        `}
      >
        <input
          type="file"
          accept=".png,.jpg"
          onChange={(e) =>
            handleFileChange(e.target.files ? e.target.files[0] : null)
          }
          className="hidden"
          id="fileUpload"
          multiple={false}
          onBlur={onBlur}
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-[#E5EAEF] mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6.75v10.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="text-xs text-[#8A8B9F] font-semibold text-center">
            {value ? (
              `Selected: ${value.name}`
            ) : (
              <p>
                <span className="text-[#156064]">Click</span> or drag and drop
                to upload
              </p>
            )}
          </div>
          <p className="text-xs text-[#8A8B9F] font-semibold mt-1">
            PNG, JPG (Max. 1 MB)
          </p>
        </label>
      </div>

      {/* Image Preview */}
      {value && (
        <div className="mt-4">
          {/* <p className="text-sm font-semibold mb-2">Uploaded Image:</p> */}
          <img
            src={URL.createObjectURL(value)}
            alt="Uploaded Preview"
            className="w-[45px] h-[45px] rounded-full object-cover"
          />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
