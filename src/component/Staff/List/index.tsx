import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useTranslation } from "../../Translator/Provider";
import StaffList from "../Table";
import { ManageStaffContext } from "../Provider";
import * as XLSX from "xlsx";

const StaffTable: React.FC = () => {
  const { staff, toggleStaffStatus, deleteStaff, addStaff } = useContext(
    ManageStaffContext
  );
  const { translate, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(5,); // Number of staff per page
  const location = useLocation();
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();

  useEffect(() => {
    const result = query.get("result");
    const error = query.get("error");

    if (result === "success") {
      toast.success("Staff Added successfully!");
      navigate(location.pathname, { replace: true });
    } else if (error === "limit-reached") {
      toast.error(
        <span onClick={() => navigate("/settings")}>
          Limit has been reached. Click here to <b>upgrade</b>.
        </span>,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
      navigate(location.pathname, { replace: true });
    }
  }, [query, location.pathname, navigate]);

  // Filter staff based on search term
  const filteredStaff = staff.filter((staffMember) =>
    Object.values(staffMember).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort staff based on the selected field
  const sortedStaff = sortBy
    ? filteredStaff.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] < b[sortBy]
          ? 1
          : -1
      )
    : filteredStaff;

  const handleSort = (fieldName: string) => {
    if (sortBy === fieldName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(fieldName);
      setSortOrder("asc");
    }
  };

  const sortIcon = (fieldName: string) => {
    if (sortBy === fieldName) {
      return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleToggleStatus = async (id: number, newStatus: string) => {
    try {
      await toggleStaffStatus(id, newStatus);
      toast.success("Staff status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating staff status.");
    }
  };

  const handleDeleteConfirmation = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      await handleDelete(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStaff(id);
      toast.success("Staff member deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting staff member.");
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          saveImportedData(excelData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const saveImportedData = async (data: any[]) => {
    try {
      for (const row of data) {
        await addStaff({
          name: row[1],
          email: row[2],
          mobile: row[3],
          designation: row[4],
          joiningDate: row[5],
          grossSalary: row[6],
          status: row[7],
          image: row[0],
        });
      }
      toast.success("Data imported successfully!");
    } catch (error) {
      toast.error("An error occurred while importing data.");
      console.error("Error adding staff:", error);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(staff);
    XLSX.utils.book_append_sheet(wb, ws, "Staff");
    XLSX.writeFile(wb, "staff_data.xlsx");
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center"></div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={translate("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300 ml-2"
          />
          <Link
            to="/add-staff"
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
          >
            {translate("addStaff")}
          </Link>
          <label className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2">
            Import
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".xlsx,.xls"
              style={{ display: "none" }}
            />
          </label>
          <button
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary ml-2"
            onClick={exportToExcel}
          >
            {translate("export")}
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">{translate("staffTable")}</h1>{" "}
      {/* Translate table title */}
      <div className="rtl:mirror-x">
        <StaffList
          staff={sortedStaff}
          handleSort={handleSort}
          sortIcon={sortIcon}
          handleToggleStatus={handleToggleStatus}
          handleDeleteConfirmation={handleDeleteConfirmation}
          translate={translate}
          formClass={formClass}
          itemsPerPage={itemsPerPage}
        />
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default StaffTable;
