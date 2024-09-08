import React from "react";
import EditEmployee from "../../component/Employee/Form";
import { Employee } from "../../component/Employee/EmployeeService";

const EditEmployePage: React.FC = () => {
  const handleEditEmployeeSubmit = (formData: Employee) => {
    // Handle the form submission logic here, e.g., sending formData to the server
    console.log("Form data submitted:", formData);
  };
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <EditEmployee employee={undefined} onSubmit={handleEditEmployeeSubmit} />
      </div>
    </div>
  );
};

export default EditEmployePage;
