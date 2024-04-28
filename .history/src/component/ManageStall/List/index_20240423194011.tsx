import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageStallContext } from "../Provider";
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditStallForm from "../Form";
import { useTranslation } from "../../Translator/Provider";
import { Drawer } from "flowbite-react";

const StallList: React.FC = () => {
  const { stalls, deletestall, addStall, editStall, toggleStatus } =
    useContext(ManageStallContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState(null);
  const { translate, language } = useTranslation();

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      handleDelete(id);
    }
  };
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDelete = async (id: number) => {
    try {
      await deletestall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
    }
  };

  const handleToggleStatus = async (id: number, newStatus: string) => {
    try {
      await toggleStatus(id, newStatus);
      toast.success("Stall status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall status.");
    }
  };

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleEditDrawerOpen = (stall: any) => {
    setSelectedStall(stall);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewStall = async (newStallData: any) => {
    try {
      // Set the status based on the user input
      const status = newStallData.status === "true" ? true : false;
      // Add the status to the new stall data
      const stallDataWithStatus = { ...newStallData, status };
      await addStall(stallDataWithStatus);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New stall added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new stall.");
    }
  };

  const handleUpdateStall = async (updatedStallData: any) => {
    try {
      await editStall(selectedStall.id, updatedStallData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Stall updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStall = currentPage * itemsPerPage;
  const indexOfFirstStall = indexOfLastStall - itemsPerPage;
  const currentStalls = stalls.slice(indexOfFirstStall, indexOfLastStall);

  const sortedStalls = sortBy
    ? currentStalls.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentStalls;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <button
            onClick={() => handleEditDrawerOpen(null)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addNew")}
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl
          className="inline-block mr-2 ml-2  "
          style={{ fontSize: "1.5em" }}
        />
        {translate("stalllist")}
      </h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                {translate("id")}
                {sortIcon("id")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("stallNumber")}
            >
              <div className="flex items-center">
                {translate("stallnumber")}
                {sortIcon("stallNumber")}
              </div>
            </th>

            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                {translate("status")}
                {sortIcon("status")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("details")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStalls
            .filter((stall) =>
              stall.stallNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((stall) => (
              <tr key={stall.id}>
                <td className="border border-gray-300 px-4 py-2">{stall.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {stall.stallNumber}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <label
                    className={`inline-flex items-center cursor-pointer ${
                      formClass === "rtl" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={stall.status}
                      onChange={() =>
                        handleToggleStatus(
                          stall.id,
                          stall.status ? "false" : "true"
                        )
                      }
                    />
                    <div
                      className={`relative w-11 h-6 rounded-full peer ${
                        stall.status ? "bg-green-600" : "bg-red-600"
                      } ${
                        formClass === "ltr"
                          ? "peer-checked:after:-translate-x-full"
                          : "peer-checked:before:translate-x-full"
                      } ${
                        formClass === "rtl"
                          ? "peer-checked:after:-translate-x-full"
                          : "peer-checked:after:translate-x-full"
                      } after:border-white after:content-[''] after:absolute after:top-0.5 ${
                        formClass === "rtl"
                          ? "peer-checked:after:-translate-x-full"
                          : "peer-checked:after:translate-x-full"
                      } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
                    ></div>
                    <span
                      className={`ms-3 text-sm font-medium ${
                        stall.status ? "text-gray-900" : "text-red-600"
                      } dark:text-gray-300 ${
                        formClass === "rtl" ? "me-3" : "ms-3"
                      }`}
                    >
                      {stall.status
                        ? translate("available")
                        : translate("booked")}
                    </span>
                  </label>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {stall.details}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(stall)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5  ml-2" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(stall.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                    >
                      <AiOutlineDelete className="w-5 h-5 mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Drawer open={isOpen} onClose={handleClose}>

            <EditStallForm
              stall={selectedStall}
              onSubmit={selectedStall ? handleUpdateStall : handleAddNewStall}
              onClose={() => setIsEditDrawerOpen(false)} // Assuming setIsEditDrawerOpen is the function to close the drawer
            />
               </Drawer.Items>
      </Drawer>
   
      <Pagination
        totalItems={stalls.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default StallList;
