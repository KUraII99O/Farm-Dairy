import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslation } from "../../Translator/Provider";
import { useManagePregnancy } from "../Provider";
import { toast } from "react-toastify";
import EditPregnancyForm from "../Drawer";
import { Table } from "flowbite-react";
import { BsPencil } from "react-icons/bs";
import { Pregnancy } from "../CowPregnancyService";





const PregnancyRecordsTable: React.FC = () => {
  const { pregnancies, addPregnancy, deletePregnancy, editPregnancy } =
  useManagePregnancy();
  const { translate } = useTranslation();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // State to manage edit drawer visibility
  const [selectedPregnancy] = useState<Pregnancy | null>(null);
  const [, setIsDeleting] = useState(false);

  const handleDeleteConfirmation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this pregnancy?")) {
      handleDelete(id);
    }
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

  const handleUpdatePregnancy = async (updatedPregnancyData: Pregnancy) => {
    try {
      if (selectedPregnancy)
      await editPregnancy(selectedPregnancy.id, updatedPregnancyData);

      setIsEditDrawerOpen(false); // Close the drawer after updating
      toast.success("Pregnancy record updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating pregnancy record.");
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
  
    try {
      await deletePregnancy(id);
      setIsDeleting(false);
      toast.success("Pregnancy record deleted successfully!");
    } catch (error) {
      setIsDeleting(false); // Ensure that isDeleting is set to false on error
      if (error instanceof Error) {
        console.error("Error deleting pregnancy:", error.message);
        toast.error("An error occurred while deleting pregnancy record.");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="overflow-x-hidden ">
      <h1 className="text-xl font-bold mb-4 text-center">
        {translate("pregnancyRecords")}
      </h1>

      <Table>
      <Table.Head>
        <Table.HeadCell >
          <div className="flex items-center">{translate("stallNo")}</div>
        </Table.HeadCell>
        <Table.HeadCell >
          <div className="flex items-center">
            {translate("pregnancyType")}
           
          </div>
        </Table.HeadCell>
        <Table.HeadCell >
          <div className="flex items-center">
            {translate("semenType")}
          
          </div>
        </Table.HeadCell>
        <Table.HeadCell >
          <div className="flex items-center">
            {translate("semenPushDate")}
           
          </div>
        </Table.HeadCell>
        <Table.HeadCell >
          <div className="flex items-center">
            {translate("pregnancyStartDate")}
           
          </div>
        </Table.HeadCell>
        <Table.HeadCell>
          <div className="flex items-center">
            {translate("pregnancyStatus")}
           
          </div>
        </Table.HeadCell>
        <Table.HeadCell>{translate("action")}</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {pregnancies.map((pregnancy:Pregnancy) => (
          <Table.Row key={pregnancy.id}>
            <Table.Cell>{pregnancy.stallNumber}</Table.Cell>
            <Table.Cell>{pregnancy.pregnancyType}</Table.Cell>
            <Table.Cell>{pregnancy.semenType}</Table.Cell>
            <Table.Cell>{pregnancy.semenPushDate}</Table.Cell>
            <Table.Cell>{pregnancy.pregnancyStartDate}</Table.Cell>
            <Table.Cell>{pregnancy.pregnancyStatus}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                <Link
                  to={`/edit-pregnancy/${String(pregnancy.id)}`}
                  className="text-blue-500 hover:underline flex items-center mr-2"
                >
                  <BsPencil className="w-5 h-5 mr-1" />
                </Link>
                <button
                  onClick={() => handleDeleteConfirmation(pregnancy.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                >
                  <AiOutlineDelete className="w-5 h-5 mr-1" />
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
      {isEditDrawerOpen && (
        <EditPregnancyForm
          pregnancy={selectedPregnancy || undefined}
          onClose={() => setIsEditDrawerOpen(false)}
          onAdd={handleAddNewPregnancy}
          onUpdate={handleUpdatePregnancy}
        />
      )}
    </div>
  );
};

export default PregnancyRecordsTable;
