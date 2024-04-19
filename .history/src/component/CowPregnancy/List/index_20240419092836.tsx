import React, { useState, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";

const CowDetails = ({ formData, cowList }) => {
  const [selectedCow, setSelectedCow] = useState(null);
  const { translate } = useTranslation();

  useEffect(() => {
    
    // Filter the cow from the cowList based on the selected animalID
    const cow = cowList.find(cow => {
      // Convert formData.animalID to a number for comparison
      const animalId = parseInt(formData.animalId);
      return cow.id === animalId;
    });

    console.log("Selected Cow:", cow); // Debugging

    setSelectedCow(cow);
  }, [formData, cowList]);

  if (!selectedCow) {
    return <p>No cow selected</p>;
  }
  return (
    <>
      <div className="text-xl font-bold text-center mt-6 mb-6">{translate("cowdetails")}</div>

      <div className="flex items-center border border-gray-300 p-4 rounded-lg mt-6 mb-6">
        <div className="w-1/2 pr-8">
          <img
            src={selectedCow.image}
            alt="Cow Image"
            className="w-60 h-auto border" // Adjust width as needed
            style={{ maxWidth: "100%", height: "auto" }} // Maintain aspect ratio
          />
        </div>
        {/* Right half with cow details */}
        <div className="w-1/2">
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  Date of Birth{translate("cowdetails")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.informations.dateOfBirth}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  Animal Age{translate("cowdetails")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.informations.animalAgeDays}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  Buy Time
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.buyDate}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  Animal Gender
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.gender}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2">
                  Animal Type
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.animalType}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  Vaccine Status
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.vaccinations ? "Vaccinated" : "Not Vaccinated"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CowDetails;
