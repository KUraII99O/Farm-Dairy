// ImageUpload.js

import React, { useState } from "react";
import { readAndCompressImage } from 'browser-image-resizer';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image path

  const imageConfig = {
    quality: 0.7,
    maxWidth: 1024,
    maxHeight: 1024,
    autoRotate: true,
    debug: true,
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    try {
      const compressedFile = await readAndCompressImage(file, imageConfig);
      const blobURL = URL.createObjectURL(compressedFile);
      setSelectedImage(blobURL);
  
      const blob = await fetchBlobData(blobURL);
      const base64Data = await blobToBase64(blob);

      // Call the onImageUpload function with the base64 image data
      onImageUpload(base64Data);
    } catch (error) {
      console.error("Error handling file change:", error);
    } finally {
      URL.revokeObjectURL(blobURL);
    }
  };

  async function fetchBlobData(blobURL) {
    const response = await fetch(blobURL);
    const blob = await response.blob();
    return blob;
  }

  async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <label htmlFor="uploadInput" className="cursor-pointer border my-6 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-100 text-center">
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
        ) : (
          "Select Image"
        )}
      </label>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="hidden"
        id="uploadInput"
        accept="image/jpeg"
        capture="environment"
      />
    </div>
  );
};

export default ImageUpload;
