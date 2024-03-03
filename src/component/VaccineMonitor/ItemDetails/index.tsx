import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vaccineMonitor: {
    date: string;
    stallNo: string;
    animalID: string;
    note: string;
    healthStatus: string;
    reportedBy: string;
    informations: {
      VaccineName: string;
      Remarks: string;
      GivenTime: string;
    }[];
  };
}

const VaccineMonitorDetailsDrawer: React.FC<Props> = ({ isOpen, onClose, vaccineMonitor }) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose(); // Close the modal only if the overlay itself is clicked
    }
  };

  if (!isOpen || !vaccineMonitor) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-25 z-40 ${isOpen ? "block" : "hidden"}`} onClick={handleOverlayClick}></div>
      <div className={`fixed inset-y-0 right-0 flex flex-col justify-center w-2/3 max-w-md z-50 ${isOpen ? "" : "hidden"}`}>
        <div className={`vaccine-monitor-drawer bg-white h-full shadow-lg transform transition-transform ease-in-out duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Vaccine Monitor Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-3 py-2">Vaccine Name</th>
                  <th className="border border-gray-400 px-3 py-2">Remarks</th>
                  <th className="border border-gray-400 px-3 py-2">Given Time</th>
                </tr>
              </thead>
              <tbody>
                {vaccineMonitor.informations.map((info, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-3 py-2">{info.VaccineName}</td>
                    <td className="border border-gray-400 px-3 py-2">{info.Remarks}</td>
                    <td className="border border-gray-400 px-3 py-2">{info.GivenTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default VaccineMonitorDetailsDrawer;
