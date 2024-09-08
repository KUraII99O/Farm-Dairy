import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

interface Information  {
  ServiceName: string;
  Result: string;
  MonitoringTime: string;
};

interface RoutineMonitor {
  id: string;
  date: string;
  stallNo: string;
  healthStatus: number; // Change to number
  note: string;
  reportedBy: string;
  userId: string;
  updatedWeight: string;
  updatedHeight: string;
  milkPerDay: string;
  monitoringDate: string;
  reports: string;
  animalID: string;
  informations: Information[];
}

type HealthStatus = {
  color: string;
  condition: string;
};

interface RoutineMonitorListProps {
  determineHealthStatus: (healthStatus: number) => HealthStatus; // Updated to number
  currentMonitors: RoutineMonitor[];
  handleSort: (field: keyof RoutineMonitor) => void;
  sortIcon: (field: keyof RoutineMonitor) => JSX.Element;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass?: string;
  reportedByuser: string;
  handleViewDetails: (monitor: RoutineMonitor) => void;
}

const RoutineMonitorList: React.FC<RoutineMonitorListProps> = ({
  determineHealthStatus,
  currentMonitors,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
 
  handleViewDetails
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
          <Table.HeadCell onClick={() => handleSort("stallNo")}>
            <div className="flex items-center">
              {translate("Stall No")}
              {sortIcon("stallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("animalID")}>
            <div className="flex items-center">
              {translate("Animal ID")}
              {sortIcon("animalID")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("note")}>
            <div className="flex items-center">
              {translate("Note")}
              {sortIcon("note")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("healthStatus")}>
            <div className="flex items-center">
              {translate("Health Status")}
              {sortIcon("healthStatus")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("reportedBy")}>
            <div className="flex items-center">
              {translate("Reported by")}
              {sortIcon("reportedBy")}
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
                    className={`bg-gray-300 h-6 w-full relative ${determineHealthStatus(monitor.healthStatus).color}`}
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
                    className={`text-xs font-semibold text-${determineHealthStatus(monitor.healthStatus).color}`}
                  >
                    {determineHealthStatus(monitor.healthStatus).condition}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell>{monitor.reportedBy}</Table.Cell>
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
