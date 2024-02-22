import React, { useState } from "react";
import EditStaff from "../../component/Staff/Form";
import ProfileImageUploader from "../../component/FileUpload";

const EditStaffPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    permanentAddress: "",
    nid: "",
    image: "", // Remove the 'image' field from here
    userType: "",
    presentAddress: "",
    basicSalary: "",
    grossSalary: "",
    resignDate: "",
  });

  const handleImageChange = (imageData: string) => {
    setFormData({
      ...formData,
      image: imageData,
    });
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <EditStaff />
      </div>
      <div className="md:w-1/2">
        <ProfileImageUploader onImageChange={handleImageChange} />
      </div>
    </div>
  );
};

export default EditStaffPage;
