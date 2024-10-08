import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Vaccine } from "../VaccineService";

// Define the type for the props of VaccineTable
interface VaccineTableProps {
  sortedVaccines: Vaccine[];
  handleSort: (key: string) => void;
  sortIcon: (key: string) => React.ReactNode;
  handleEditDrawerOpen: (vaccine: Vaccine) => void;
  handleDeleteConfirmation: (id: string) => void;
  translate: (text: string) => string;
  formClass: string;
}

const VaccineTable: React.FC<VaccineTableProps> = ({
  sortedVaccines,
  handleSort,
  sortIcon,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
}) => (
  <Table>
    <Table.Head>
      <Table.HeadCell onClick={() => handleSort("id")}>
        <div className="flex items-center">
          {translate("#ID")}
          {sortIcon("id")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("name")}>
        <div className="flex items-center">
          {translate("Vaccine Name")}
          {sortIcon("name")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("period")}>
        <div className="flex items-center">
          {translate("Period (Days)")}
          {sortIcon("period")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("repeat")}>
        <div className="flex items-center">
          {translate("Repeat Vaccine")}
          {sortIcon("repeat")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("dose")}>
        <div className="flex items-center">
          {translate("Dose")}
          {sortIcon("dose")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell onClick={() => handleSort("note")}>
        <div className="flex items-center">
          {translate("Note")}
          {sortIcon("note")}
        </div>
      </Table.HeadCell>
      <Table.HeadCell>{translate("Action")}</Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
      {sortedVaccines.map((vaccine, index) => (
        <Table.Row
          key={vaccine.id}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1} {/* Display row number */}
          </Table.Cell>
          <Table.Cell>{vaccine.vaccineName}</Table.Cell>
          <Table.Cell>{vaccine.periodDays}</Table.Cell>
          <Table.Cell>{vaccine.repeatVaccine ? "Yes" : "No"}</Table.Cell>
          <Table.Cell>{vaccine.dose}</Table.Cell>
          <Table.Cell>{vaccine.note}</Table.Cell>
          <Table.Cell>
            <div className="flex items-center">
              <button
                onClick={() => handleEditDrawerOpen(vaccine)}
                className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
              >
                <BsPencil className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => handleDeleteConfirmation(vaccine.id!)}
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
);

export default VaccineTable;
