import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";

import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import MilkList from "../Table";
import { ManageMilkContext } from "../Provider";

const MilkTable: React.FC = () => {
  const { milkRecords, deleteMilkRecord } = useContext(ManageMilkContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of milk entries per page
  const [isDeleting, setIsDeleting] = useState(false);
  const [milkToDelete, setMilkToDelete] = useState<number | null>(null);
  const [user, setUser] = useState<{ username: string }>({
    username: "",
  });
  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";

  const formClass = isArabic ? "rtl" : "ltr";

  const filteredMilks = milkRecords.filter(
    (milk: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(milk).some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  const [formData, setFormData] = useState({
    AccountNo: "",
    StallNo: "",
    AnimalID: "",
    Liter: "",
    CollectedFrom: "",
    Fate: "",
    Price: "",
    Total: "",
    AddedBy: "", // Ensure this field is included
    Date: "",
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username } = userData;
          setUser({ username: username }); // Corrected to set 'username' field
          setFormData(prevFormData => ({ ...prevFormData, AddedBy: username })); // Update AddedBy field in formData
          console.log("Username fetched successfully:", username);
        } else {
          console.error("No user data found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const sortedMilks = sortBy
    ? filteredMilks.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredMilks;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastMilk = currentPage * itemsPerPage;
  const indexOfFirstMilk = indexOfLastMilk - itemsPerPage;
  const currentMilk = sortedMilks.slice(indexOfFirstMilk, indexOfLastMilk);

  // Pagination end

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

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this milk entry?")) {
      // If the user confirms, directly call handleDelete
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteMilkRecord(id);
      setIsDeleting(false);
      // Implement your deletion logic here
    } catch (error) {
      setIsDeleting(false);
    }
  };

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
          <Link
            to="/Collect-Milk"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addmilk")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">{translate("milktable")}</h1>
      <MilkList
        currentMilks={currentMilk}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
        AddedByUser={formData.AddedBy} // Pass the AddedBy field as prop
      />
      {/* Pagination */}
      <Pagination
        totalItems={sortedMilks.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default MilkTable;
