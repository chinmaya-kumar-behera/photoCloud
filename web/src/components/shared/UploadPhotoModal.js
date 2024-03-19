import React from "react";
import Dialog from "../UI/Dialog/Dialog";
import LoaderSpinner from "./LoaderSpinner";

const UploadPhotoModal = ({ isOpen, onClose, image, expirationTime, handleExpirationChange, handleUpload, loading }) => {
  const getObjectURL = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <Dialog
      className="relative"
      contentClassName="w-full max-w-2xl h-auto bg-white px-5 py-10 lg:px-10 rounded"
      overlayClassName="backdrop-blur oveflow-y-scroll"
      isOpen={isOpen}
      closable={true}
      onClose={onClose}
      onRequestClose={onClose}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 flex items-center justify-center bg-gray-100">
          {image && (
            <div className="max-h-[300px] h-full w-full max-w-[300px] overflow-hidden">
              <img
                src={getObjectURL(image)}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 flex flex-col jusitfy-between items-between gap-2">
          <div className="w-full h-full space-y-2">
            <label className="">Select Duration</label>
            <select
              className="w-full p-2 rounded text-blue-500"
              value={expirationTime}
              onChange={handleExpirationChange}
            >
              <option value={1}>1 minutes</option>
              <option value={5}>5 minutes</option>
              <option value="">forever</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <LoaderSpinner /> : "Generate link"}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadPhotoModal;
