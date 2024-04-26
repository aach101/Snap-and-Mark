import React, { useState } from 'react';
import axios from 'axios';
import getEnvironment from '../getenvironment';

const UploadVid = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const apiUrl = getEnvironment();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profile', file);

    try {
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success === 1) {
        console.log('File state before clearing:', file); // Debugging
        setUploadMessage('Video uploaded successfully');
        setFile(null); // Clear the selected video file
        console.log('File state after clearing:', file); // Debugging
      } else {
        setUploadMessage('Video not uploaded');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadMessage('An error occurred while uploading the video');
    }
  };

  return (
    <div className="m-5 ">
      <div className="text-center"><p className="font-bold text-2xl text-black-500 underline mb-2 "> Upload Video</p></div>
      <div className="m-5 flex flex-wrap justify-evenly items-center border-2 p-4 rounded-lg bg-white hover:border-3 hover:shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="video"></label>
            <input type="file" id="video" accept="video/*" onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            disabled={!file}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Video
          </button>
        </form>
        {uploadMessage && <p className="mt-4">{uploadMessage}</p>}
      </div>
    </div>
  );
};

export default UploadVid;
