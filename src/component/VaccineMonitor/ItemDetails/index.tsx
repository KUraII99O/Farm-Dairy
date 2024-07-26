import React, { useRef, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

// Define the types for the props
interface VaccineMonitorInfo {
  VaccineName: string;
  Remarks: string;
  GivenTime: string;
}

interface VaccineMonitor {
  date: string;
  stallNo: string;
  animalID: string;
  note: string;
  healthStatus: string;
  reportedBy: string;
  informations: VaccineMonitorInfo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vaccineMonitor: VaccineMonitor;
}

const VaccineMonitorDetailsDrawer: React.FC<Props> = ({ isOpen, onClose, vaccineMonitor }) => {
  const { translate } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40">
          <div className="fixed inset-0 z-50 flex justify-end">
            <div ref={ref} className="w-full max-w-md bg-white shadow-lg p-6">
              <h1 className="inline-block text-xl font-bold mb-4">
                {translate("itemdetails")}
              </h1>
              <button
                className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <table className="w-full border-collapse mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("vaccinename")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("remark")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("giventime")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineMonitor.informations.map((info, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.VaccineName}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.Remarks}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.GivenTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={onClose}
                className="mt-4 bg-secondary hover:primary text-white py-2 px-4 rounded"
              >
                {translate("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VaccineMonitorDetailsDrawer;
