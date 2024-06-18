import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiListUl } from "react-icons/bi";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../../Pagination";
import { useTranslation } from "../../Translator/Provider";
import { ManageSalesContext } from "../provider";
import { CowSales } from "../CowSaleService";
import { Drawer } from "flowbite-react"; // Assuming Drawer is imported correctly
import SalesList from "../Table";
import ItemDetailDrawer from "../ItemDetails";

const SaleList: React.FC = () => {
  const { sales, deleteSale } = useContext(ManageSalesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSale, setSelectedSale] = useState<CowSales | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const filteredSales = sales.filter((sale) =>
    Object.values(sale).some((field) =>
      String(field).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedSales = sortBy
    ? filteredSales.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : filteredSales;

  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = sortedSales.slice(indexOfFirstSale, indexOfLastSale);

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteSale(id);
      setIsDeleting(false);
      toast.success("Sale deleted successfully!");
    } catch (error) {
      setIsDeleting(false);
      toast.error("An error occurred while deleting sale.");
    }
  };

  const handleViewDetails = (sale: CowSales) => {
    setSelectedSale(sale);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSelectedSale(null);
    setIsDrawerOpen(false);
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
            className="p-2 rounded border border-gray-300"
          />

          <Link
            to="/Add-sale"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            Add New
          </Link>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">
        <BiListUl className="inline-block mr-2" />
        Sale List
      </h1>
      <SalesList
        currentSales={currentSales}
        handleViewDetails={handleViewDetails}
        handleSort={handleSort}
        sortIcon={sortIcon}
        handleDeleteConfirmation={handleDeleteConfirmation}
        translate={translate}
        formClass={formClass}
      />
      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        position="right"
      >
        <Drawer.Header title={translate("detailsDrawerTitle")} />
        <Drawer.Items>
          {selectedSale && (
            <ItemDetailDrawer
              isOpen={isDrawerOpen}
              onClose={handleDrawerClose}
              selectedSale={selectedSale}
            />
          )}
        </Drawer.Items>
      </Drawer>
      <Pagination
        totalItems={sortedSales.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ToastContainer />
    </div>
  );
};

export default SaleList;
