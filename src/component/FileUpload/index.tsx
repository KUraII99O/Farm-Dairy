import React, { useState } from 'react';
import { FaImage } from "react-icons/fa"; // Import FaImage icon

const ProfileImageUploader: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className="container pl-4 bg-white ">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaImage className="mr-2" /> 
                <span>Upload Profile Image :</span>
            </h2>
            <div className="flex justify-center"> {/* Flex container to center content */}
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col">
                    <input id="fileUpload" type="file" accept="image/*" onChange={onImageSelect} className="hidden" />
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected profile" className="rounded-lg h-48 w-48 object-cover" />
                    ) : (
                        <div className="h-48 w-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">No image selected</span>
                        </div>
                    )}
                </label>
            </div>
            {/* Center the button */}
            <div className="text-center">
                <button
                    type='button'
                    onClick={() => document.getElementById('fileUpload')?.click()}
                    className='mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary item'>
                    Browse
                </button>
            </div>
        </div>
    );
};

export default ProfileImageUploader;
