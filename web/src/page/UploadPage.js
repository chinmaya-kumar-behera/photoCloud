import React, { useState } from 'react'
import PageContainer from '../components/shared/PageContainer';
import axios from 'axios';
import DropZone from '../components/shared/DropZone';
import UploadPhotoModal from '../components/shared/UploadPhotoModal';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [expirationTime, setExpirationTime] = useState(5);

    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (value) => {
        setFile(value);
        setIsOpen(true)
    };

    const handleExpirationChange = (e) => {
      setExpirationTime(parseInt(e.target.value));
    };

    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("expirationTime", expirationTime);

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

  return (
    <PageContainer>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">Photo Cloud</h1>
        <DropZone onFileDrop={handleFileChange} />
        {/* <select value={expirationTime} onChange={handleExpirationChange}>
          <option value={1}>1 minutes</option>
          <option value={5}>5 minutes</option>
          <option value="">forever</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
        {imageUrl && (
          <div className="mt-5">
            <img src={imageUrl} alt="Uploaded" className="max-w-md" />
            <p className="mt-2">Image URL: {imageUrl}</p>
          </div>
        )} */}
      </div>

      {isOpen && (
        <UploadPhotoModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          image={file}
          setExpirationTime={setExpirationTime}
        />
      )}
    </PageContainer>
  );
}

export default UploadPage