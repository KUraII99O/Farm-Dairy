import React, { useState, useEffect } from "react";
import { useTranslation } from "../../Translator/Provider";




export type  Cow ={

  id: string,
  image: string,
  userId: string,
  animal: string,
  buyDate: string,
  stallNumber: string,
  buyingPrice: string,
  dateAdded: string,
  pregnantStatus: string,
  milkPerDay: string,
  status: boolean,
  gender: string,
  informations: {
    stallNumber: string,
    dateOfBirth: string,
    animalAgeDays: string,
    weight: string,
    height: string,
    color: string,
    numOfPregnant: string,
    nextPregnancyApproxTime: string,
    buyFrom: string,
    prevVaccineDone: string,
    note: string,
    createdBy: string,
  },
  vaccinations: {
    BDV: boolean,
    PI3: boolean,
    BRSV: boolean,
    BVD: boolean,
    VitaminA: boolean,
    Anthrax: boolean,
  },
};

interface FormData {
  animalId: string;
}

interface CowDetailsProps {
  formData: FormData;
  cowList: Cow[];
}



const CowDetails: React.FC<CowDetailsProps> = ({ formData, cowList }) => {
  const [selectedCow, setSelectedCow] = useState<Cow | null>(null);
  const { translate } = useTranslation();

  useEffect(() => {
    console.log("formData.animalId:", formData.animalId);
    console.log("cowList:", cowList);

    // Filter the cow from the cowList based on the selected animalID
    const cow = cowList.find((cow: Cow) => {
      // Convert both IDs to the same type for comparison
      const animalId = formData.animalId.toString();
      return cow.id.toString() === animalId;
    });

    console.log("Selected Cow:", cow); // Debugging

    setSelectedCow(cow || null);
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
            className="w-60 h-auto border"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="w-1/2">
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  {translate("dateofbirth")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.informations.dateOfBirth}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  {translate("animalage")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.informations.animalAgeDays}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  {translate("buytime")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.buyDate}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  {translate("animalgender")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.gender}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2">
                  {translate("animaltype")}
                </td>
                <td className="border border-gray-300 px-4 py-2 w-60">
                  {selectedCow.animal}
                </td>
              </tr>
              <tr>
                <td className="font-normal text-gray-800 border border-gray-300 px-4 py-2 w-60">
                  {translate("vaccinestatus")}
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