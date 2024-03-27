import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import ItemDetailDrawer from "../ItemDetails";
import { CowFeedContext } from "../Provider";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";

const CowFeedTable: React.FC = () => {
  const { cowFeeds, deletecowFeed } = useContext(CowFeedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cowFeedToDelete, setCowFeedToDelete] = useState<number | null>(null);
  const [selectedCowFeed, setSelectedCowFeed] = useState(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const { translate} = useTranslation();



  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(); // Adjust the date format as needed
    setCurrentDate(formattedDate);
  }, []);

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Sorting function for array of objects
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

  const filteredCowFeeds = cowFeeds.filter((cowFeed) =>
    Object.values(cowFeed).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort cowFeeds based on the selected field
  const sortedCowFeeds = sortBy
    ? filteredCowFeeds.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredCowFeeds;

  // Pagination
  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastCowFeed = currentPage * itemsPerPage;
  const indexOfFirstCowFeed = indexOfLastCowFeed - itemsPerPage;
  const currentCowFeeds = sortedCowFeeds.slice(
    indexOfFirstCowFeed,
    indexOfLastCowFeed
  );

  const handleDeleteConfirmation = (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this cow feed entry?")
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deletecowFeed(id);
      setIsDeleting(false);
      toast.success("Cow feed entry deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting cow feed entry.");
    }
  };

  const handleViewDetails = (cowFeed) => {
    setSelectedCowFeed(cowFeed);
  };

  const handleDrawerClose = () => {
    setSelectedCowFeed(null);
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
            to="/Add-cow-feed "
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            
            {translate("addNew")}
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2 ml-2" />
        {translate("cowfeedlist")}
      </h1>
      <table className="min-w-full bg-white border-collapse">
        {/* Table header */}
        <thead>
          <tr>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
              {translate("date")}
                {sortIcon("date")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("stallNo")}
            >
              <div className="flex items-center">
              {translate("stallNo")}
                {sortIcon("stallNo")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("cowNumber")}
            >
              <div className="flex items-center">
              {translate("cownumber")}
                {sortIcon("cowNumber")}
              </div>
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSort("note")}
            >
              <div className="flex items-center">
              {translate("note")}
                {sortIcon("note")}
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">{translate("action")}</th>{" "}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentCowFeeds.map((cowFeed) => (
            <tr key={cowFeed.id}>
              {/* Render each field accordingly */}
              <td className="border border-gray-300 px-4 py-2">
                {currentDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.stallNo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.cowNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cowFeed.note}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(cowFeed)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                    
                  </button>
                  {/* Edit link */}
                  <Link
                    to={`/Edit-Cow-Feed/${cowFeed.id}`}
                    className="text-blue-500 hover:underline flex items-center mr-4"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                    
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteConfirmation(cowFeed.id)}
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
      {/* Render ItemDetailDrawer outside of the table */}
      {selectedCowFeed && (
        <ItemDetailDrawer
          isOpen={true} // Ensure it's always open when a cowFeed is selected
          onClose={handleDrawerClose}
          cowFeed={selectedCowFeed}
        />
      )}
      {/* Pagination */}
      <Pagination
        totalItems={sortedCowFeeds.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CowFeedTable;
