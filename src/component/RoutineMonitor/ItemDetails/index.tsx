import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routineMonitor: {
    serviceName: string;
    result: string;
    monitoringTime: string;
    informations: {
      ServiceName: string;
      Result: string;
      MonitoringTime: string;
    }[];
  };
}

const RoutineMonitorDetailsDrawer: React.FC<Props> = ({ isOpen, onClose, routineMonitor }) => {

  if (!isOpen || !routineMonitor) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden flex justify-end z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      <div className={`routine-monitor-drawer bg-white w-2/3 max-w-md h-full shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform ease-in-out duration-300`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Routine Monitor Details</h2>
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
                <th className="border border-gray-400 px-3 py-2">Service Name</th>
                <th className="border border-gray-400 px-3 py-2">Result</th>
                <th className="border border-gray-400 px-3 py-2">Monitoring Time</th>
              </tr>
            </thead>
            <tbody>
              {routineMonitor.informations.map((info, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-3 py-2">{info.ServiceName}</td>
                  <td className="border border-gray-400 px-3 py-2">{info.Result}</td>
                  <td className="border border-gray-400 px-3 py-2">{info.MonitoringTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div onClick={onClose} className={`fixed inset-0 bg-black opacity-25 ${isOpen ? "block" : "hidden"}`}></div>
    </div>
  );
};

export default RoutineMonitorDetailsDrawer;
