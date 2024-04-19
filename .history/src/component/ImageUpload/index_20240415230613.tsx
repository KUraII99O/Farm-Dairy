import React, { useState } from "react";

const ImageUpload = ({ formData,setFormData }) => {
  const [imageSrc, setImageSrc] = useState("");
  



  const handleFileChange = (event) => {
    const file = event.target.files[0];




    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataURL = e.target.result;
      setImageSrc(imageDataURL);
      
    };
    reader.readAsDataURL(file);
    setFormData({
      ...formData,
      image: file
    });
    console.log(formData.image);
  };

  return (
    <div className="relative">
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="hidden"
        id="uploadInput"
        accept="image/jpeg"
        capture="environment"
      />
      <label
        htmlFor="uploadInput"
        className="cursor-pointer border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-100 text-center"
        style={{
          width: "400px", // Adjust width as needed
          height: "400px", // Adjust height as needed
          display: "inline-block",
          lineHeight: "200px", // Adjust line height to center content vertically
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          "Select Image"
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
