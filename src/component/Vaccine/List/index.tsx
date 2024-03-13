import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ManageVaccineContext } from "../Provider"; // Assuming you've renamed the provider file to 'Provider'
import Pagination from "../../Pagination";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import EditVaccineForm from "../Form"; // Assuming you have a form for editing vaccines

const VaccineList: React.FC = () => {
  const { vaccines, deleteVaccine, addVaccine, editVaccine } = useContext(
    ManageVaccineContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVaccine(id);
      toast.success("Vaccine deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting vaccine.");
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

  const handleEditDrawerOpen = (vaccine: any) => {
    setSelectedVaccine(vaccine);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewVaccine = async (newVaccineData: any) => {
    try {
      await addVaccine(newVaccineData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New vaccine added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new vaccine.");
    }
  };

  const handleUpdateVaccine = async (updatedVaccineData) => {
    try {
      await editVaccine(selectedVaccine.id, updatedVaccineData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Vaccine updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating vaccine.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastVaccine = currentPage * itemsPerPage;
  const indexOfFirstVaccine = indexOfLastVaccine - itemsPerPage;
  const currentVaccines = vaccines.slice(indexOfFirstVaccine, indexOfLastVaccine);

  const sortedVaccines = sortBy
    ? currentVaccines.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentVaccines;

  return (
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
        Vaccine List
      </h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                #ID
                {sortIcon("id")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("vaccineName")}
            >
              <div className="flex items-center">
                Vaccine Name
                {sortIcon("vaccineName")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("periodDays")}
            >
              <div className="flex items-center">
                Period (Days)
                {sortIcon("periodDays")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("repeatVaccine")}
            >
              <div className="flex items-center">
                Repeat Vaccine
                {sortIcon("repeatVaccine")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Dose</th>
            <th className="border border-gray-300 px-4 py-2">Note</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedVaccines
            .filter((vaccine) =>
              vaccine.vaccineName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((vaccine) => (
              <tr key={vaccine.id}>
                <td className="border border-gray-300 px-4 py-2">{vaccine.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.vaccineName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.periodDays}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.repeatVaccine}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.dose}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.note}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(vaccine)}
                      className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(vaccine.id)}
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
      {isEditDrawerOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedVaccine ? "Edit Vaccine" : "Add New Vaccine"}
            </h2>
            <EditVaccineForm
              vaccine={selectedVaccine}
              onSubmit={selectedVaccine ? handleUpdateVaccine : handleAddNewVaccine}
              onClose={() => setIsEditDrawerOpen(false)}
            />
          </div>
        </div>
      )}
      <Pagination
        totalItems={vaccines.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default VaccineList;
