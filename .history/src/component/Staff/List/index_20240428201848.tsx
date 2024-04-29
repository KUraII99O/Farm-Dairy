import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { useTranslation } from "../../Translator/Provider";
import { Button } from "flowbite-react";
import StaffList from "../Table";
import { ManageStaffContext } from "../Provider";

const StaffTable: React.FC = () => {
  const { staff, toggleStaffStatus, deleteStaff } = useContext(ManageStaffContext);
  const { translate, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of staff per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);

  // Filter staff based on search term
  const filteredStaff = staff.filter((staffMember) =>
    Object.values(staffMember).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort staff based on the selected field
  const sortedStaff = sortBy
    ? filteredStaff.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredStaff;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = sortedStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  // Pagination end

  const handleToggleStatus = (id: number) => {
    toggleStaffStatus(id);
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

  const handleDeleteConfirmation = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await deleteStaff(id);
        // The deletion was successful, no need to show an error message here
      } catch (error) {
        toast.error("Failed to delete staff member");
      }
    }
  };
  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

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
          <Link to="/add-staff">
            <Button className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2">
              {translate("addStaff")}
            </Button>
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">{translate("staffTable")}</h1>{" "}
      {/* Translate table title */}
      <div className="rtl:mirror-x">
        <StaffList
        handleEditStaff={handleEditStaff}
          currentStaff={currentStaff} // Pass sortedStaff as currentStaff
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleToggleStatus={handleToggleStatus}
          handleDeleteConfirmation={handleDeleteConfirmation}
          translate={translate}
          formClass={formClass}
        />
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={sortedStaff.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default StaffTable;
