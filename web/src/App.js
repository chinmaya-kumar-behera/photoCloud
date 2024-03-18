// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const response = await axios.post(
//       `${process.env.REACT_APP_API_BASE_URL}/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setImageUrl(response.data.imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div className="container p-5 mx-auto mt-10">
//       <h1 className="text-3xl font-bold mb-5">Photo Cloud</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleUpload}
//       >
//         Upload
//       </button>
//       {imageUrl && (
//         <div className="mt-5">
//           <img src={imageUrl} alt="Uploaded" className="max-w-md" />
//           <p className="mt-2">Image URL: {imageUrl}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [expirationTime, setExpirationTime] = useState(5); // Default expiration time in minutes

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExpirationChange = (e) => {
    setExpirationTime(parseInt(e.target.value));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("expirationTime", expirationTime); // Send expiration time along with the image

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
    <div className="container p-5 mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Photo Cloud</h1>
      <input type="file" onChange={handleFileChange} />
      <select value={expirationTime} onChange={handleExpirationChange}>
        <option value={1}>1 minutes</option>
        <option value={5}>5 minutes</option>
        <option value="">forever</option>
        {/* Add more options for different expiration durations */}
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
      )}
    </div>
  );
}

export default App;
