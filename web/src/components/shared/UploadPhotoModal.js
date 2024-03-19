import React from 'react'
import Dialog from '../UI/Dialog/Dialog';

const UploadPhotoModal = ({ isOpen, onClose, image }) => {
  return (
    <Dialog
      className="relative"
      contentClassName="w-full max-w-2xl h-auto bg-white"
      overlayClassName="backdrop-blur oveflow-y-scroll"
      isOpen={isOpen}
      closable={true}
      onClose={onClose}
      onRequestClose={onClose}
    >
      <div className="h-[300px] w-[200px]">
        <img alt="image-for-display" src={image} className="object-contain" />
      </div>
      hello sir
    </Dialog>
  );
};

export default UploadPhotoModal