import React, { useState, useContext } from "react";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { SupplierContext } from "../Provider";
import { toast, ToastContainer } from "react-toastify";
import EditSupplierForm from "../Form";

const SupplierList: React.FC = () => {
  const { suppliers, deleteSupplier, addSupplier, editSupplier } =
    useContext(SupplierContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const handleEditDrawerOpen = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewSupplier = async (newSupplierData: any) => {
    try {
      await addSupplier(newSupplierData);
      setIsEditDrawerOpen(false);
      toast.success("New supplier added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new supplier.");
    }
  };

  const handleUpdateSupplier = async (updatedSupplierData: any) => {
    try {
      await editSupplier(selectedSupplier.id, updatedSupplierData);
      setIsEditDrawerOpen(false);
      toast.success("Supplier updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating Supplier.");
    }
  };

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        toast.success("Supplier deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while deleting the supplier.");
      }
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
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

  const filteredSuppliers = suppliers.filter((supplier) =>
    Object.values(supplier).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedSuppliers = sortBy
    ? filteredSuppliers.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredSuppliers;

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = sortedSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  return (
    <>
      {isEditDrawerOpen && (
        <EditSupplierForm
          supplier={selectedSupplier}
          onSubmit={handleUpdateSupplier}
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
          Supplier List
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
                onClick={() => handleSort("image")}
              >
                <div className="flex items-center">
                  Image
                  {sortIcon("image")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Supplier Name
                  {sortIcon("name")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("companyName")}
              >
                <div className="flex items-center">
                  Company Name
                  {sortIcon("companyName")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("phoneNumber")}
              >
                <div className="flex items-center">
                  Phone Number
                  {sortIcon("phoneNumber")}
                </div>
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email
                  {sortIcon("email")}
                </div>
              </th>
              <th className="border border-gray-300 px-4 py-2">Action</th>{" "}
            </tr>
          </thead>

          <tbody>
            {currentSuppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {supplier.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={supplier.image}
                    alt="Supplier Image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>{" "}
                <td className="border border-gray-300 px-4 py-2">
                  {supplier.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {supplier.companyName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {supplier.phoneNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {supplier.email}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(supplier)}
                      className="text-blue-500 hover:underline flex items-center mr-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      <BsPencil className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(supplier.id)}
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
          totalItems={sortedSuppliers.length}
          defaultItemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default SupplierList;
