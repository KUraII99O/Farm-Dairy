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
import { Drawer } from "flowbite-react";

interface CowFeedInfo {
  foodItem: string;
  quantity: string;
  feedingTime: string;
  unit: string;
}

interface CowFeed {
  id: string;
  date: string;
  StallNo: string;
  cowNumber: string;
  note: string;
  userId: string;
  informations: CowFeedInfo[]; // Ensure this is an array
}

const CowFeedTable: React.FC = () => {
  const { cowFeedRecords, deleteCowFeedRecord } = useContext(ManageCowFeedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [, setIsDeleting] = useState(false);
  const [selectedCowFeed, setSelectedCowFeed] = useState<CowFeed | null>(null);
  const [, setCurrentDate] = useState<string>("");
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
    const formattedDate = date.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, []);

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const filteredCowFeeds = cowFeedRecords.filter((cowFeed: CowFeed) =>
    Object.values(cowFeed).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCowFeeds = sortBy
    ? filteredCowFeeds.slice().sort((a: CowFeed, b: CowFeed) => {
      const aValue = a[sortBy as keyof CowFeed];
      const bValue = b[sortBy as keyof CowFeed];
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    })
    : filteredCowFeeds;

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

  const handleViewDetails = (cowFeed: CowFeed) => {
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
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default CowFeedTable;
