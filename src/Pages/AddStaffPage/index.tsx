import React from "react";
import ProfileInformation from "../../component/ProfileInformation";
import FileUpload from "../../component/FileUpload";
import PasswordForm from "../../component/Password";

const AddStaff = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <ProfileInformation />
      </div>
      <div className="md:w-1/2 ">
        <FileUpload />
        <PasswordForm /> {/* Place PasswordForm component here */}
      </div>
    </div>
  );
};

export default AddStaff;
