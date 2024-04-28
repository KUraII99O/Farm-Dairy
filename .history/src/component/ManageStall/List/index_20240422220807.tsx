import React, { useState, useContext } from "react";
import { Button, Table, TextInput, Card } from "flowbite-react";
import Drawer from "../Form";
import { useTranslation } from "../../Translator/Provider";
import { ManageStallContext } from "../Provider";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiListUl } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

const StallList = () => {
  const { stalls, deletestall, addStall, editStall, toggleStatus } =
    useContext(ManageStallContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStall, setSelectedStall] = useState(null);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const { translate } = useTranslation();

  const handleDeleteConfirmation = (id) => {
    if (window.confirm("Are you sure you want to delete this stall?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletestall(id);
      toast.success("Stall deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting stall.");
    }
  };

  // Other functions...

  return (
    <div className="p-6">
      <Card className="mb-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {translate("stalllist")}
        </h5>
      </Card>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {translate("stalllist")}
        </h1>
        <Button color="blue" onClick={() => setShowRightPanel(true)}>
          {translate("addNew")}
        </Button>
      </div>

      <Table>
        {/* Table headers */}
      </Table>

      {/* Table body */}

      <Drawer isOpen={showRightPanel} setIsOpen={setShowRightPanel} header="Create Project">
        {/* Form inside the drawer */}
      </Drawer>
    </div>
  );
};

export default StallList;
