import React from "react";
import EditMilkInformation from "../../component/EditMilkInformation";

const EditMilkCollect = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
    <div className="md:w-1/2">
      <EditMilkInformation />
      </div>
  </div>
  );
};

export default EditMilkCollect;
