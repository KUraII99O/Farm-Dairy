import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiListUl } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import CalvesList from "../Table";
import ItemDetailDrawer from "../ItemDetails/";
import { ManageCowCalfContext } from "../Provider"; // Corrected import
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const CalfList: React.FC = () => {
  const { calves, deleteCalf, toggleCalfStatus } = useContext(ManageCowCalfContext);
  const { translate, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCalf, setSelectedCalf] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  useEffect(() => {
    const result = query.get("result");
    const error = query.get("error");

    if (result === "success") {
      toast.success("Calf Added successfully!");
      navigate(location.pathname, { replace: true });
    } else if (error === "limit-reached") {
      toast.error(
        <span onClick={() => navigate("/settings")}>
          Limit has been reached. Click here to <b>upgrade</b>.
        </span>,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
      navigate(location.pathname, { replace: true });
    }
  }, [query, location.pathname, navigate]);

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

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const filteredCalves = calves.filter((calf: any) =>
    Object.values(calf).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCalves = sortBy
    ? filteredCalves.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredCalves;

  const handleToggleStatus = (id: string) => {
    toggleCalfStatus(id);
  };

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this calf?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteCalf(id);
      setIsDeleting(false);
      toast.success("Calf deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting calf.");
    }
  };

  const handleViewDetails = (calf: any) => {
    setSelectedCalf(calf);
    console.log("Selected Calf:", calf); // Add this line to log the selected calf
  };

  const handleCloseDrawer = () => {
    setSelectedCalf(null);
  };

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

          <Link
            to="/Add-calf"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New Calf
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Calf List
      </h1>
      <CalvesList
        currentCalves={sortedCalves}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleViewDetails={handleViewDetails}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
        handleToggleStatus={handleToggleStatus}
      />

      {selectedCalf && (
        <ItemDetailDrawer
          isOpen={true} // Ensure it's always open when a calf is selected
          onClose={handleCloseDrawer}
          calf={selectedCalf}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CalfList;
