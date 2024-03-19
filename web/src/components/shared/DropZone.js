import React, { useState } from "react";

const DropZone = ({ onFileDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    onFileDrop(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    onFileDrop(file);
  };

  const fileInputRef = React.createRef();

  return (
    <div
      className={`w-full py-10 lg:py-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-all ${
        isDragging ? "bg-gray-200" : ""
      } flex items-center justify-center`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
      <div className="flex flex-col items-center gap-2 lg:gap-3">
        <svg
          className="w-10 lg:w-14 h-10 lg:h-14 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          ></path>
        </svg>
        <h1 className="text-lg md:text-2xl lg:text-5xl font-semibold text-gray-800">
          Upload and share your images
        </h1>
        <p className="text-gray-500 text-sm lg:text-xl text-center">
          Drag and drop anywhere you want and start uploading your images now.
          32 MB limit.
          <br /> Direct image links.
        </p>
      </div>
    </div>
  );
};

export default DropZone;



