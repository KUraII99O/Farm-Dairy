import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTranslation } from "../../Translator/Provider";
import { ManagePregnancyContext } from "../Provider";
import { toast } from "react-toastify";
import EditPregnancyForm from "../Drawer";

const PregnancyRecordsTable: React.FC = () => {
  const { pregnancies, addPregnancy, deletePregnancy, editPregnancy } =
    useContext(ManagePregnancyContext);
  const { translate } = useTranslation();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // State to manage edit drawer visibility
  const [selectedPregnancy, setSelectedPregnancy] = useState(null); // State to store selected pregnancy for editing
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirmation = (id: number) => {
    if (window.confirm("Are you sure you want to delete this pregnancy?")) {
      handleDelete(id);
    }
  };

  const handleEditDrawerOpen = (pregnancy: any) => {
    setSelectedPregnancy(pregnancy);
    setIsEditDrawerOpen(true);
  };

  const handleAddNewPregnancy = async (newPregnancyData: any) => {
    try {
      // Assuming status is a boolean value in the newPregnancyData
      await addPregnancy(newPregnancyData);
      setIsEditDrawerOpen(false); // Close the drawer after adding
      toast.success("New pregnancy record added successfully!");
    } catch (error) {
      toast.error("An error occurred while adding new pregnancy record.");
    }
  };

  const handleUpdatePregnancy = async (updatedPregnancyData: any) => {
    try {
      await editPregnancy(selectedPregnancy.id, updatedPregnancyData);

      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Pregnancy record updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating pregnancy record.");
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);

    try {
      await deletePregnancy(id);
      setIsDeleting(false);
      toast.success("Pregnancy record deleted successfully!");
    } catch (error) {
      console.error("Error deleting pregnancy:", error.message);
      toast.error("An error occurred while deleting pregnancy record.");
    }
  };

  return (
    <div className="overflow-x-hidden ">
      <h1 className="text-xl font-bold mb-4 text-center">
        {translate("pregnancyRecords")}
      </h1>

      <table className="min-w-full bg-white border-collapse mb-6 ">
        {/* Table header */}
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              {translate("stallNo")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("pregnancytype")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("sementype")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("semenpushdate")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("pregnancystartdate")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("pregnantStatus")}
            </th>
            <th className="border border-gray-300 px-4 py-2">
              {translate("action")}
            </th>
          </tr>
        </thead>

        <tbody>
          {pregnancies
            .filter((pregnancy) =>
              Object.values(pregnancy).some((value) => value !== "")
            )
            .map((pregnancy) => (
              <tr key={pregnancy.id}>
                {/* Render each field accordingly */}
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.stallNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.pregnancyType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.semenType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.semenPushDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.pregnancyStartDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {pregnancy.pregnancyStatus}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditDrawerOpen(pregnancy)}
                      className="text-blue-500 hover:underline flex items-center mr-4"
                    >
                      <AiOutlineEdit className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(pregnancy.id)}
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
      {isEditDrawerOpen && (
        <EditPregnancyForm
          pregnancy={selectedPregnancy}
          onClose={() => setIsEditDrawerOpen(false)}
          onAdd={handleAddNewPregnancy}
          onUpdate={handleUpdatePregnancy}
        />
      )}
    </div>
  );
};

export default PregnancyRecordsTable;
