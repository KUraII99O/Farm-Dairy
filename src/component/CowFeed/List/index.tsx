import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../Pagination";
import { BiListUl } from "react-icons/bi";
import ItemDetailDrawer from "../ItemDetails";
import { toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import CowFeedList from "../Table";
import { ManageCowFeedContext } from "../Provider";
import { Drawer, Button } from "flowbite-react";

const CowFeedTable: React.FC = () => {
  const { cowFeedRecords, deleteCowFeedRecord } = useContext(ManageCowFeedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCowFeed, setSelectedCowFeed] = useState(null);
  const [currentDate, setCurrentDate] = useState<string>("");
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

  const filteredCowFeeds = cowFeedRecords.filter((cowFeed) =>
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

  const handleDeleteConfirmation = (id: string) => {
    if ( 
      window.confirm("Are you sure you want to delete this cow feed entry?")
    ) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteCowFeedRecord(id);
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
      <CowFeedList
        currentCowFeeds={currentCowFeeds}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        handleViewDetails={handleViewDetails}
        translate={translate}
        formClass={formClass}
      />
      {/* Render ItemDetailDrawer outside of the table */}
      <Drawer
        open={selectedCowFeed !== null}
        onClose={handleDrawerClose}
        className="EditStallDrawer"
        position="right"
      >
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <ItemDetailDrawer
            isOpen={selectedCowFeed !== null}
            onClose={handleDrawerClose}
            cowFeed={selectedCowFeed}
          />
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={sortedCowFeeds.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CowFeedTable;
