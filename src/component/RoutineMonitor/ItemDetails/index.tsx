import React, { useRef, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

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

const ItemDetailDrawer: React.FC<Props> = ({ isOpen, onClose, routineMonitor }) => {
  const { translate } = useTranslation();
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!routineMonitor) return null;

  return (
    <>
      {isOpen && (
        <div >
          <div>
            <div ref={ref} className="w-full max-w-md bg-white  p-6">
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
                      {translate("servicename")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("result")}
                    </th>
                    <th className="border border-gray-400 px-3 py-2">
                      {translate("monitoringtime")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {routineMonitor.informations.map((info, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.ServiceName}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.Result} {info.unit}
                      </td>
                      <td className="border border-gray-400 px-3 py-2">
                        {info.MonitoringTime}
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

export default ItemDetailDrawer;
