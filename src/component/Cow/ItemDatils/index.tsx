import React, { useRef, useEffect, useState  } from "react";
import { useTranslation } from "../../Translator/Provider";


const ItemDetailDrawer = ({ isOpen, onClose, cow }) => {
  const { translate } = useTranslation();
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };
  const [user, setUser] = useState<{ name: string;  }>({
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
        const storedUser = localStorage.getItem('loggedInUser');
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-40" >
          <div className="fixed inset-0  z-50 flex justify-end ">

            <div ref={ref}  className="w-full max-w-md bg-white shadow-lg p-6">

            <h1 className=" inline-block text-xl font-bold mb-4">

                
                {translate("cowdetails")}
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
                <th className="border border-gray-300 px-3 py-2 bg-gray-200">{translate("attribute")}</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-200">{translate("value")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("stallnumber")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.stallNumber}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("dateofbirth")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.dateOfBirth}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("animalage")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.animalAgeDays}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("weight")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.weight}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("height")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.height}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("color")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.color}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("numofpregnant")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.numOfPregnant}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("nextpregnancyapproxtime")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.nextPregnancyApproxTime ? cow.informations.nextPregnancyApproxTime : "Not available"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("buyfrom")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.buyFrom}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("prevVaccineDone")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.prevVaccineDone}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("note")}:</td>
                <td className="border border-gray-300 px-3 py-2">{cow.informations.note}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-semibold">{translate("createdBy")}:</td>
                <td className="border border-gray-300 px-3 py-2">{user.name}</td>
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

