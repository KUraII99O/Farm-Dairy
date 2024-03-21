import EditStaff from "../../component/Staff/Form";

const EditStaffPage = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="md:w-1/2">
        <EditStaff />
      </div>
      <div className="md:w-1/2">
      </div>
    </div>
  );
};

export default EditStaffPage;
