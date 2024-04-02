import React, { useEffect, useState } from "react";
import PageContainer from "../components/shared/PageContainer";
import axios from "axios";
import DropZone from "../components/shared/DropZone";
import UploadPhotoModal from "../components/shared/UploadPhotoModal";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [expirationTime, setExpirationTime] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleFileChange = (value) => {
    setFile(value);
    setIsOpen(true);
  };

  const handleExpirationChange = (e) => {
    setExpirationTime(parseInt(e.target.value));
  };

  async function imageToBuffer(image) {
    return await (await fetch(image)).blob();
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("expirationTime", expirationTime);
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data);
      setIsOpen(false);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-3 py-5 space-y-5">
        <div className="py-5 space-y-2 bg-gray-100 p-2 lg:p-5 rounded-lg">
          <h1 className="text-3xl font-bold">
            Share Your Moments with the World
          </h1>
          <p className="text-lg text-gray-600">
            Upload and share your photos instantly!
          </p>
        </div>
        {!imageUrl && <DropZone onFileDrop={handleFileChange} />}

        {imageUrl && (
          <div className="flex flex-col lg:flex-row gap-10 p-5 items-center border-2 border-dashed rounded-xl ">
            <div className="max-h-[300px] h-full w-full max-w-[300px]">
              <div className="h-full w-full overflow-hidden">
                <img
                  src={imageUrl.image}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="p-3 w-full space-y-10 bg-gray-50 rounded-lg">
                <div className="space-y-2 w-fit">
                  <label>Generated image URL</label>
                  <div className="flex flex-wrap gap-5 items-center bg-gray-100 p-3 rounded-lg text-gray-700">
                    <p className="break-all">{imageUrl.image}</p>
                    <p className="break-all">{imageUrl.previewImage}</p>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md"
                      onClick={() => copyToClipboard(imageUrl)}
                    >
                      {copied ? "Copied!" : "Copy URL"}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Embedded HTML</label>
                  <div className="flex flex-wrap gap-5 items-center bg-gray-100 p-3 rounded-lg text-gray-700 overflow-x-auto">
                    <p className="break-words">{` <img src="${imageUrl.image}"/>`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <UploadPhotoModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          image={file}
          setExpirationTime={setExpirationTime}
          handleUpload={handleUpload}
          loading={loading}
          handleExpirationChange={handleExpirationChange}
        />
      )}
    </PageContainer>
  );
};

export default UploadPage;
