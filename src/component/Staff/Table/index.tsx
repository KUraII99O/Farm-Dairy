import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react"; // Adjust based on your table library
import { Link } from "react-router-dom";
import Pagination from "../../Pagination"; // Import pagination component

interface StaffListProps {
  staff: any[]; // Update with actual type of staff data
  handleSort: (fieldName: string) => void;
  sortIcon: (fieldName: string) => React.ReactNode;
  handleToggleStatus: (id: string, newStatus: string) => void;
  handleDeleteConfirmation: (id: number) => void;
  translate: (key: string) => string;
  formClass: string;
  itemsPerPage: number;
}

const StaffList: React.FC<StaffListProps> = ({
  staff,
  handleSort,
  sortIcon,
  handleToggleStatus,
  handleDeleteConfirmation,
  translate,
  formClass,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Pagination
  const handlePageChange = (page: React.SetStateAction<number>, itemsPerPage: React.SetStateAction<number>) => {
    setCurrentPage(page);
    setItemsPerPage(itemsPerPage);
  };

  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("image")}>
            <div className="flex items-center">{translate("image")}</div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("name")}>
            <div className="flex items-center">
              {translate("staffName")}
              {sortIcon("name")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("email")}>
            <div className="flex items-center">
              {translate("email")}
              {sortIcon("email")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("mobile")}>
            <div className="flex items-center">
              {translate("mobile")}
              {sortIcon("mobile")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("designation")}>
            <div className="flex items-center">
              {translate("designation")}
              {sortIcon("designation")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("joiningDate")}>
            <div className="flex items-center">
              {translate("joiningDate")}
              {sortIcon("joiningDate")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("salary")}>
            <div className="flex items-center">
              {translate("salary")}
              {sortIcon("GrossSalary")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("status")}>
            <div className="flex items-center">{translate("status")}</div>
          </Table.HeadCell>
          <Table.HeadCell>{translate("action")}</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentStaff.map((staffMember) => (
            <Table.Row key={staffMember.id}>
              <Table.Cell>
                <img
                  src={staffMember.image}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </Table.Cell>
              <Table.Cell>{staffMember.name}</Table.Cell>
              <Table.Cell>{staffMember.email}</Table.Cell>
              <Table.Cell>{staffMember.mobile}</Table.Cell>
              <Table.Cell>{staffMember.designation}</Table.Cell>
              <Table.Cell>{staffMember.joiningDate}</Table.Cell>
              <Table.Cell>{staffMember.grossSalary}</Table.Cell>
              <Table.Cell>
                <label
                  className={`inline-flex items-center cursor-pointer ${
                    formClass === "rtl" ? "flex-row-reverse" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={staffMember.status}
                    onChange={() =>
                      handleToggleStatus(
                        staffMember.id,
                        staffMember.status ? "false" : "true"
                      )
                    }
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 ${
                      formClass === "ltr"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:before:translate-x-full"
                    } peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 ${
                      formClass === "rtl"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:after:translate-x-full"
                    } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
                  ></div>
                  <span
                    className={`ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                      formClass === "rtl" ? "me-3" : "ms-3"
                    }`}
                  >
                    {staffMember.status
                      ? translate("active")
                      : translate("inactive")}
                  </span>
                </label>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <Link
                    to={`/edit-staff/${String(staffMember.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(staffMember.id)}
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
      <Pagination
        totalItems={staff.length}
        defaultItemsPerPage={itemsPerPage}
        onPageChange={handlePageChange} itemsPerPage={0} currentPage={0} setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } }      />
    </div>
  );
};

export default StaffList;