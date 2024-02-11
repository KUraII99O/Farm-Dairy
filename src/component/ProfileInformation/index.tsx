import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

interface ProfileInformation {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  nid: string;
  designation: string;
  userType: string;
  presentAddress: string;
  permanentAddress: string;
  basicSalary: number;
  grossSalary: number;
  joiningDate: Date;
  resignDate: Date;
}

const ProfileForm: React.FC = () => {
  const [profileInformation, setProfileInformation] =
    useState<ProfileInformation>({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      nid: "",
      designation: "",
      userType: "",
      presentAddress: "",
      permanentAddress: "",
      basicSalary: 0,
      grossSalary: 0,
      joiningDate: new Date(),
      resignDate: new Date(),
    });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setProfileInformation({ ...profileInformation, [name]: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileInformation({ ...profileInformation, [name]: new Date(value) });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted profile information:", profileInformation);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaUserPlus className="mr-2" /> {/* Add FaUserPlus icon */}
        <span>Profile Information</span>
      </h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name:
        </label>
        <input
          style={{ width: "800px" }} // Set the width here
          type="text"
          id="fullName"
          name="fullName"
          value={profileInformation.fullName}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="emailAddress"
          className="text-sm font-medium text-gray-700"
        >
          Email Address:
        </label>
        <input
          style={{ width: "800px" }}
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={profileInformation.emailAddress}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700"
        >
          Phone Number:
        </label>
        <input
          style={{ width: "800px" }}
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={profileInformation.phoneNumber}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="nid" className="text-sm font-medium text-gray-700">
          NID:
        </label>
        <input
          style={{ width: "800px" }}
          type="text"
          id="nid"
          name="nid"
          value={profileInformation.nid}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="designation"
          className="text-sm font-medium text-gray-700"
        >
          Designation:
        </label>
        <select
          style={{ width: "800px" }}
          id="designation"
          name="designation"
          value={profileInformation.designation}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">--Select--</option>
          <option value="Manager">Accountant</option>
          <option value="Supervisor">Executive</option>
        </select>
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="userType" className="text-sm font-medium text-gray-700">
          User Type:
        </label>
        <select
          style={{ width: "800px" }}
          id="userType"
          name="userType"
          value={profileInformation.userType}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        >
          <option value="">--Select--</option>
          <option value="Admin">Accountant</option>
          <option value="Employee">Admin</option>
          <option value="Employee">Marketing Executive</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="presentAddress"
          className="text-sm font-medium text-gray-700"
        >
          Present Address:
        </label>
        <textarea
          style={{ width: "800px" }}
          id="presentAddress"
          name="presentAddress"
          value={profileInformation.presentAddress}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="permanentAddress"
          className="text-sm font-medium text-gray-700"
        >
          Permanent Address:
        </label>
        <textarea
          style={{ width: "800px" }}
          id="permanentAddress"
          name="permanentAddress"
          value={profileInformation.permanentAddress}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="basicSalary"
          className="text-sm font-medium text-gray-700"
        >
          Basic Salary:
        </label>
        <input
          type="number"
          id="basicSalary"
          name="basicSalary"
          value={profileInformation.basicSalary}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{ width: "800px" }}
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="grossSalary"
          className="text-sm font-medium text-gray-700"
        >
          Gross Salary:
        </label>
        <input
          type="number"
          id="grossSalary"
          name="grossSalary"
          value={profileInformation.grossSalary}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{ width: "800px" }}
          required
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="joiningDate"
          className="text-sm font-medium text-gray-700"
        >
          Joining Date:
        </label>
        <input
          style={{ width: "800px" }}
          type="date"
          id="joiningDate"
          name="joiningDate"
          value={profileInformation.joiningDate.toISOString().split("T")[0]} // Convert to ISO string and format to yyyy-MM-dd
          onChange={handleDateChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="resignDate"
          className="text-sm font-medium text-gray-700"
        >
          Resign Date:
        </label>
        <input
          style={{ width: "800px" }}
          type="date"
          id="resignDate"
          name="resignDate"
          value={profileInformation.resignDate.toISOString().split("T")[0]} // Convert to ISO string and format to yyyy-MM-dd
          onChange={handleDateChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
  type="submit"
  className="bg-secondary hover:bg-primary text-black px-4 py-2 rounded-md flex items-center" // Use flexbox for alignment
  style={{ width: "100px" }}
>
  <FaSave className="mr-2" style={{ verticalAlign: "middle" }} /> {/* Adjust vertical alignment */}
  Save
</button>
    </form>
  );
};

export default ProfileForm;
