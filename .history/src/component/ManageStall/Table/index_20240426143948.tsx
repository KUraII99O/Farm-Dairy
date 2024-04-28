import React from "react";

const StallTable = ({
  sortedStalls,
  searchTerm,
  handleToggleStatus,
  handleEditDrawerOpen,
  handleDeleteConfirmation,
  translate,
  formClass,
}) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          <th
            className="border border-gray-300 px-4 py-2 cursor-pointer"
            onClick={() => handleSort("id")}
          >
            <div className="flex items-center">
              {translate("id")}
              {sortIcon("id")}
            </div>
          </th>
          <th
            className="border border-gray-300 px-4 py-2 cursor-pointer"
            onClick={() => handleSort("stallNumber")}
          >
            <div className="flex items-center">
              {translate("stallnumber")}
              {sortIcon("stallNumber")}
            </div>
          </th>

          <th
            className="border border-gray-300 px-4 py-2 cursor-pointer"
            onClick={() => handleSort("status")}
          >
            <div className="flex items-center">
              {translate("status")}
              {sortIcon("status")}
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            {translate("details")}
          </th>
          <th className="border border-gray-300 px-4 py-2">
            {translate("action")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedStalls
          .filter((stall) =>
            stall.stallNumber.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((stall) => (
            <tr key={stall.id}>
              <td className="border border-gray-300 px-4 py-2">{stall.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {stall.stallNumber}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                <label
                  className={`inline-flex items-center cursor-pointer ${
                    formClass === "rtl" ? "flex-row-reverse" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={stall.status}
                    onChange={() =>
                      handleToggleStatus(
                        stall.id,
                        stall.status ? "false" : "true"
                      )
                    }
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full peer ${
                      stall.status ? "bg-green-600" : "bg-red-600"
                    } ${
                      formClass === "ltr"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:before:translate-x-full"
                    } ${
                      formClass === "rtl"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:after:translate-x-full"
                    } after:border-white after:content-[''] after:absolute after:top-0.5 ${
                      formClass === "rtl"
                        ? "peer-checked:after:-translate-x-full"
                        : "peer-checked:after:translate-x-full"
                    } after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform duration-200 ease-in-out dark:border-gray-600 peer-checked:bg-green-600`}
                  ></div>
                  <span
                    className={`ms-3 text-sm font-medium ${
                      stall.status ? "text-gray-900" : "text-red-600"
                    } dark:text-gray-300 ${
                      formClass === "rtl" ? "me-3" : "ms-3"
                    }`}
                  >
                    {stall.status
                      ? translate("available")
                      : translate("booked")}
                  </span>
                </label>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {stall.details}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleEditDrawerOpen(stall)}
                    className="text-blue-500 hover:underline flex items-center mr-4 focus:outline-none"
                  >
                    <BsPencil className="w-5 h-5  ml-2" />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(stall.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                  >
                    <AiOutlineDelete className="w-5 h-5 mr-1" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default StallTable;
