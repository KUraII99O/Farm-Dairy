import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const RoutineMonitorList = ({
  determineHealthStatus,
  currentMonitors,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  reportedbyuser,
  handleViewDetails
  
}) => {
  // Get user name from localStorage

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
          <Table.HeadCell onClick={() => handleSort("AnimalID")}>
            <div className="flex items-center">
              {translate("Animal ID")}
              {sortIcon("AnimalID")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("Note")}>
            <div className="flex items-center">
              {translate("Note")}
              {sortIcon("Note")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("HealthStatus")}>
            <div className="flex items-center">
              {translate("Health Status")}
              {sortIcon("HealthStatus")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("ReportedBy")}>
            <div className="flex items-center">
              {translate("Reported by")}
              {sortIcon("ReportedBy")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("Action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentMonitors.map((monitor) => (
            <Table.Row key={monitor.id}> 
              <Table.Cell>{monitor.date}</Table.Cell>
              <Table.Cell>{monitor.stallNo}</Table.Cell>
              <Table.Cell>{monitor.animalID}</Table.Cell>
              <Table.Cell>{monitor.note}</Table.Cell>
              <Table.Cell>
                <div>
                  <div
                    className={`bg-gray-300 h-6 w-full relative ${
                      determineHealthStatus(monitor.healthStatus).color
                    }`}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${monitor.healthStatus}%`,
                        transition: "width 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-semibold text-${
                      determineHealthStatus(monitor.healthStatus).color
                    }`}
                  >
                    {determineHealthStatus(monitor.healthStatus).condition}
                  </span>
                </div>
              </Table.Cell>{" "}
              <Table.Cell>{monitor.reportedby}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                <button
                    onClick={() => handleViewDetails(monitor)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                    
                  </button>

                  <Link
                    to={`/edit-routine-monitor/${String(monitor.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(monitor.id)}
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

export default RoutineMonitorList;
