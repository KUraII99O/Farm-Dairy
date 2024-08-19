import React  from "react";
import EditEmployee from "../../component/Employee/Form";

const EditEmployePage = () => {
 
    

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <EditEmployee employee={undefined} onSubmit={undefined}   />
      </div>
      
    </div>
  );
};

export default EditEmployePage;
