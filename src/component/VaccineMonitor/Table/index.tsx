import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

// Define types for props
interface VaccineMonitor {
  id: string;
  date: string;
  StallNo: string;
  CowNumber: string;
  note: string;
  reportedby: string;
}

interface VaccineMonitorListProps {
  currentVaccineMonitors: VaccineMonitor[];
  handleSort: (key: keyof VaccineMonitor) => void;
  sortIcon: (key: keyof VaccineMonitor) => JSX.Element;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass: string; // If formClass is not used in the component, you can remove this
  reportedbyuser: string; // If reportedbyuser is not used in the component, you can remove this
  handleViewDetails: (vaccine: VaccineMonitor) => void;
}

const VaccineMonitorList: React.FC<VaccineMonitorListProps> = ({
  currentVaccineMonitors,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  handleViewDetails,
}) => {
  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("date")}>
            <div className="flex items-center">
              {translate("Date")}
              {sortIcon("date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("StallNo")}>
            <div className="flex items-center">
              {translate("Stall No")}
              {sortIcon("StallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("CowNumber")}>
            <div className="flex items-center">
              {translate("CowNumber")}
              {sortIcon("CowNumber")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("note")}>
            <div className="flex items-center">
              {translate("Note")}
              {sortIcon("note")}
            </div>
          </Table.HeadCell>

          <Table.HeadCell onClick={() => handleSort("reportedby")}>
            <div className="flex items-center">
              {translate("Reported by")}
              {sortIcon("reportedby")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentVaccineMonitors.map((vaccine) => (
            <Table.Row key={vaccine.id}>
              <Table.Cell>{vaccine.date}</Table.Cell>
              <Table.Cell>{vaccine.StallNo}</Table.Cell>
              <Table.Cell>{vaccine.CowNumber}</Table.Cell>
              <Table.Cell>{vaccine.note}</Table.Cell>
              <Table.Cell>{vaccine.reportedby}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(vaccine)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>

                  <Link
                    to={`/Edit-Vaccine-Monitor/${String(vaccine.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(vaccine.id)}
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
    </div>
  );
};

export default VaccineMonitorList;
