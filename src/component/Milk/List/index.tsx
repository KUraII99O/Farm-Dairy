import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../../Translator/Provider";

import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { ManageMilkContext } from "../Provider";
import MilkList from "../Table";

const MilkTable: React.FC = () => {
  const { milkRecords, deleteMilkRecord } = useContext(ManageMilkContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<{ username: string }>({
    username: "",
  });
  const { translate, language } = useTranslation();
  const isArabic = language === "ar";
  const location = useLocation();
  const navigate = useNavigate();
  const formClass = isArabic ? "rtl" : "ltr";

  const filteredMilks = milkRecords.filter(
    (milk) =>
      Object.values(milk).some(
        (field) =>
          field &&
          typeof field === "string" &&
          field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  useEffect(() => {
    if (query.get("result") === "success") {
      toast.success("Cow Added successfully!");
      navigate(location.pathname, { replace: true });
    }
  }, [query, location.pathname, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username } = userData;
          setUser({ username: username }); // Set 'username' field correctly
          setFormData(prevFormData => ({
            ...prevFormData,
            AddedBy: username,
            Date: new Date().toLocaleDateString(), // Set current date
          }));
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
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy])
      )
    : filteredMilks;

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

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteMilkRecord(id.toString()); // Ensure id is passed as string if needed
      setIsDeleting(false);
      toast.success("Milk entry deleted successfully");
      // Implement your deletion logic here
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting milk entry:", error);
      toast.error("Failed to delete milk entry");
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
        currentMilks={sortedMilks}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default MilkTable;
