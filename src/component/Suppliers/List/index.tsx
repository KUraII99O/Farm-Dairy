import React, { useState, useContext } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import EditSupplierForm from "../Form";
import { useSupplier } from "../Provider";
import SupplierTable from "../Table";
import { useTranslation } from "../../Translator/Provider";



interface Supplier {
  id: string;
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  image: string;
}

type SupplierWithoutId = Omit<Supplier, 'id'>;

const SupplierList: React.FC = () => {
  const { suppliers, deleteSupplier, addSupplier, editSupplier } =
  useSupplier();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";
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

  const handleAddNewSupplier = async (newSupplierData: SupplierWithoutId) => {
    try {
      await addSupplier(newSupplierData);
      setIsEditDrawerOpen(false);
      toast.success("New supplier added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding the new supplier.");
    }
  };
  
  const handleUpdateSupplier = async (updatedSupplierData: SupplierWithoutId) => {
    try {
      if (selectedSupplier) {
        await editSupplier(selectedSupplier.id, updatedSupplierData);
        setIsEditDrawerOpen(false);
        toast.success("Supplier updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while updating the supplier.");
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this Supplier?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully!");
    } catch (error) {
      console.error("Error deleting Supplier:", error);
      toast.error("An error occurred while deleting the Supplier.");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const dynamicSort = (property: string) => {
    const sortOrderValue = sortOrder === "asc" ? 1 : -1;
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
      const aValue = a[sortBy as keyof Supplier];
      const bValue = b[sortBy as keyof Supplier];
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
          onSubmit={selectedSupplier ? handleUpdateSupplier : handleAddNewSupplier}
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
        <SupplierTable
        sortedSuppliers={sortedSuppliers}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleEditDrawerOpen={handleEditDrawerOpen}
        handleDeleteConfirmation={handleDeleteConfirmation}
        formClass={formClass}
        translate={translate}
      />
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
