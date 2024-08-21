import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

interface CowFeed {
  id: string;
  date: string;
  stallNo: string;
  cowNumber: string;
  note: string;
}

interface CowFeedListProps {
  currentCowFeeds: CowFeed[];
  handleSort: (field: keyof CowFeed) => void;
  sortIcon: (field: keyof CowFeed) => JSX.Element;
  handleDeleteConfirmation: (id: string) => void;
  translate: (key: string) => string;
  formClass?: string;
  handleViewDetails: (cowFeed: CowFeed) => void;
}

const CowFeedList: React.FC<CowFeedListProps> = ({
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
              {sortIcon("date")}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => handleSort("stallNo")}>
            <div className="flex items-center">
              {translate("Stall No")}
              {sortIcon("stallNo")}
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
          {currentCowFeeds.map((cowFeed) => (
            <Table.Row key={cowFeed.id}>
              <Table.Cell>{cowFeed.date}</Table.Cell>
              <Table.Cell>{cowFeed.stallNo}</Table.Cell>
              <Table.Cell>{cowFeed.cowNumber}</Table.Cell>
              <Table.Cell>{cowFeed.note}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button
                    onClick={() => handleViewDetails(cowFeed)}
                    className="text-secondary hover:text-primary focus:outline-none flex  mr-4"
                  >
                    <FaEye className="w-5 h-5 mr-1" />
                  </button>
                  <Link
                    to={`/edit-cow-feed/${String(cowFeed.id)}`}
                    className="text-blue-500 hover:underline flex items-center mr-2"
                  >
                    <BsPencil className="w-5 h-5 mr-1" />
                  </Link>
                  <button
                    onClick={() => handleDeleteConfirmation(cowFeed.id)}
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
