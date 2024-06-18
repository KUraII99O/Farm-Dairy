import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const CowFeedList = ({
  currentCowFeeds,
  handleSort,
  sortIcon,
  handleDeleteConfirmation,
  translate,
  formClass,
  handleViewDetails
}) => {
  return (
    <div className="rtl:mirror-x">
      <Table>
        <Table.Head>
          <Table.HeadCell onClick={() => handleSort("date")}>
            <div className="flex items-center">
              {translate("Date")}
              {sortIcon("Date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("StallNo")}>
            <div className="flex items-center">
              {translate("Stall No")}
              {sortIcon("StallNo")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("cowNumber")}>
            <div className="flex items-center">
              {translate("Cow number")}
              {sortIcon("cowNumber")}
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
          {currentCowFeeds.map((CowFeed) => (
            <Table.Row key={CowFeed.id}>
              <Table.Cell>{CowFeed.date}</Table.Cell>
              <Table.Cell>{CowFeed.stallNo}</Table.Cell>
              <Table.Cell>{CowFeed.cowNumber}</Table.Cell>
              <Table.Cell>{CowFeed.note}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                <button
                    onClick={() => handleViewDetails(CowFeed)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                    
                  </button>
                  <Link
                    to={`/edit-cow-feed/${String(CowFeed.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(CowFeed.id)}
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

export default CowFeedList;
