import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { ExpensePurposeContext } from "../Provider";
import { toast, ToastContainer } from "react-toastify";
import EditPurposeForm from "../Form";
import { BsPencil } from "react-icons/bs";

const PurposeList: React.FC = () => {
    const { expensePurposes, deleteExpensePurpose, addExpensePurpose, editExpensePurpose } = useContext(ExpensePurposeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState(null);
  
    // Define handleUpdatePurpose function
    const handleUpdatePurpose = async (updatedPurposeData) => {
      try {
        await editExpensePurpose(selectedPurpose.id, updatedPurposeData);
        setIsEditDrawerOpen(false);
        toast.success("Purpose updated successfully!");
      } catch (error) {
        toast.error("An error occurred while updating the purpose.");
      }
    };

    const handleAddNewPurpose = async (newPurposeData: any) => {
        try {
          await addExpensePurpose(newPurposeData);
          setIsEditDrawerOpen(false);
          toast.success("New purpose added successfully!");
        } catch (error) {
          toast.error("An error occurred while adding new purpose.");
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

  const handleEditDrawerOpen = (purpose: any) => {
    setSelectedPurpose(purpose);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this purpose?")) {
      try {
        await deleteExpensePurpose(id);
        toast.success("Purpose deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while deleting the purpose.");
      }
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const dynamicSort = (property: string) => {
    let sortOrderValue = sortOrder === "asc" ? 1 : -1;
    return function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * sortOrderValue;
      } else if (a[property] > b[property]) {
        return 1 * sortOrderValue;
      } else {
        return 0;
      }
    };
  };

  const filteredPurposes = expensePurposes.filter((purpose) =>
    Object.values(purpose).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedPurposes = sortBy
    ? filteredPurposes.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredPurposes;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastPurpose = currentPage * itemsPerPage;
  const indexOfFirstPurpose = indexOfLastPurpose - itemsPerPage;
  const currentPurposes = sortedPurposes.slice(
    indexOfFirstPurpose,
    indexOfLastPurpose
  );

  return (
    <>
      {isEditDrawerOpen && (
        <EditPurposeForm
          purpose={selectedPurpose}
          onSubmit={selectedPurpose ? handleUpdatePurpose : handleAddNewPurpose}
          onClose={() => setIsEditDrawerOpen(false)}
        />
      )}
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center"></div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded border border-gray-300 "
            />
            <button
              onClick={() => handleEditDrawerOpen(null)}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
            >
              Add New
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4">
          <BiListUl className="inline-block mr-2" />
          Purpose List
        </h1>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  #
                  {sortIcon("id")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Purpose Name
                  {sortIcon("name")}
                </div>
              </th>
              <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
            </tr>
          </thead>

          <tbody>
            {currentPurposes.map((purpose) => (
              <tr key={purpose.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {purpose.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {purpose.name}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(purpose)}
                      className="text-blue-500 hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />

                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(purpose.id)}
                      className="text-red-500 hover:hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                  <AiOutlineDelete className="w-5 h-5 mr-1" />

                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={sortedPurposes.length}
          defaultItemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default PurposeList;
