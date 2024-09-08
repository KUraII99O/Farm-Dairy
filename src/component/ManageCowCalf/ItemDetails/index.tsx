import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "../../Translator/Provider";

// Define the type for the calf prop
export interface Calf {
  informations: {
    stallNumber: string;
    dateOfBirth: string;
    animalAgeDays: string;
    weight: string;
    height: string;
    color: string;
    buyFrom: string;
    prevVaccineDone: string;
    note: string;
    createdBy: string;
  };
}

// Define the props interface for the component
interface ItemDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  calf: Calf;
}

const ItemDetailDrawer: React.FC<ItemDetailDrawerProps> = ({
  isOpen,
  onClose,
  calf,
}) => {
  const { translate } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const [user, setUser] = useState<{ name: string }>({
    name: "",
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const { username } = userData;
          setUser({ name: username });
          console.log("Username fetched successfully:", username);
        } else {
          console.error("No user data found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data from local storage:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40">
          <div className="fixed inset-0 z-50 flex justify-end">
            <div ref={ref} className="w-full max-w-md bg-white shadow-lg p-6">
              <h1 className="inline-block text-xl font-bold mb-4">
                {translate("calfdetails")}
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
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 bg-gray-200">
                      {translate("attribute")}
                    </th>
                    <th className="border border-gray-300 px-3 py-2 bg-gray-200">
                      {translate("value")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("stallnumber")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.stallNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("dateofbirth")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.dateOfBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("animalage")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.animalAgeDays}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("weight")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.weight}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("height")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.height}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("color")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.color}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("buyfrom")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.buyFrom}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("prevVaccineDone")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.prevVaccineDone}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("note")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {calf.informations.note}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      {translate("createdBy")}:
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {user.name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailDrawer;
