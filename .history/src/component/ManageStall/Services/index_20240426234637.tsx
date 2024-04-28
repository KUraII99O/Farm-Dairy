import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { ManageStallContext } from "../Provider";

const StallService = () => {
  const { stalls, deletestall, addStall, editStall, toggleStatus } =
    useContext(ManageStallContext);
  const { translate, language } = useTranslation();

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      await handleDelete(id);
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleDelete = async (id: number) => {
    try {
      await deletestall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
    }
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const drawer = document.querySelector(".Drawer") as HTMLElement;

    if (drawer && !drawer.contains(target)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggleStatus = async (id: number, newStatus: string) => {
    try {
      await toggleStatus(id, newStatus);
      toast.success("Stall status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall status.");
    }
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

  const handleEditDrawerOpen = (stall: any) => {
    setSelectedStall(stall);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewStall = async (newStallData: any) => {
    try {
      // Set the status based on the user input
      const status = newStallData.status === "true" ? true : false;
      // Add the status to the new stall data
      const stallDataWithStatus = { ...newStallData, status };
      await addStall(stallDataWithStatus);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New stall added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new stall.");
    }
  };

  const handleUpdateStall = async (updatedStallData: any) => {
    try {
      await editStall(selectedStall.id, updatedStallData);
      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Stall updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall.");
    }
  };

  const handlePageChange = (page: number, itemsPerPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStall = currentPage * itemsPerPage;
  const indexOfFirstStall = indexOfLastStall - itemsPerPage;
  const currentStalls = stalls.slice(indexOfFirstStall, indexOfLastStall);

  const sortedStalls = sortBy
    ? currentStalls.slice().sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      })
    : currentStalls;

  return {
    handleDeleteConfirmation,
    isArabic,
    formClass,
    handleDelete,
    handleCloseDrawer,
    handleOutsideClick,
    handleToggleStatus,
    handleSort,
    sortIcon,
    handleEditDrawerOpen,
    handleAddNewStall,
    handleUpdateStall,
    handlePageChange,
    sortedStalls,
  };
};

export default StallService;
