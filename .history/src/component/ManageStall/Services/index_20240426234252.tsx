import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "../../Translator/Provider";
import { ManageStallContext } from "../Provider";

const StallService = () => {
  const { deletestall, addStall, editStall, toggleStatus } =
    useContext(ManageStallContext);
  const { translate } = useTranslation();

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      await handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletestall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
    }
  };

  const handleToggleStatus = async (id: number, newStatus: string) => {
    try {
      await toggleStatus(id, newStatus);
      toast.success("Stall status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall status.");
    }
  };

  const handleAddNewStall = async (newStallData: any) => {
    try {
      // Set the status based on the user input
      const status = newStallData.status === "true" ? true : false;
      // Add the status to the new stall data
      const stallDataWithStatus = { ...newStallData, status };
      await addStall(stallDataWithStatus);
      toast.success("New stall added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new stall.");
    }
  };

  const handleUpdateStall = async (selectedStall: any, updatedStallData: any) => {
    try {
      await editStall(selectedStall.id, updatedStallData);
      toast.success("Stall updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating stall.");
    }
  };

  return {
    handleDeleteConfirmation,
    handleToggleStatus,
    handleAddNewStall,
    handleUpdateStall,
  };
};

export default StallService;
