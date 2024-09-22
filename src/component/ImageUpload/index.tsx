import React, { useState } from "react";
import { readAndCompressImage } from 'browser-image-resizer';

// Placeholder image for the default profile picture (you can replace this with an actual blank profile image URL)
const defaultProfilePicture = "https://via.placeholder.com/150?text=Profile+Picture";

interface ImageUploadProps {
  onImageUpload: (base64Image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image path

  const imageConfig = {
    quality: 0.7,
    maxWidth: 1024,
    maxHeight: 1024,
    autoRotate: true,
    debug: true,
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    }
  };

  async function fetchBlobData(blobURL: string): Promise<Blob> {
    const response = await fetch(blobURL);
    const blob = await response.blob();
    return blob;
  }

  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Display either the selected image or the default profile picture */}
        <img
          src={selectedImage || defaultProfilePicture}
          alt="Uploaded"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        {/* Upload button, styled like a camera icon overlay */}
        <label
          htmlFor="uploadInput"
          className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.8 4.8M5 12l5-5L20 12M4 4h6l2 2h8v12H4z"
            />
          </svg>
        </label>
      </div>

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
