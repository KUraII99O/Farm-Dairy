import React from "react";

const CowPregnancyForm = () => {
  return (
    <div>
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-4">Animal Information:</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="stallNo" className="block mb-1 font-semibold">
              Stall No *:
            </label>
            <input
              type="text"
              id="stallNo"
              name="stallNo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="animalID" className="block mb-1 font-semibold">
              Animal ID *:
            </label>
            <input
              type="text"
              id="animalID"
              name="animalID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-4">Animal Pregnancy Details:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="pregnancyType" className="block mb-1 font-semibold">
              Pregnancy Type *:
            </label>
            <select
              id="pregnancyType"
              name="pregnancyType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">-- Select --</option>
              <option value="Automatic">Automatic</option>
              <option value="By Collected Semen">By Collected Semen</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="semenType" className="block mb-1 font-semibold">
              Semen Type:
            </label>
            <select
              id="semenType"
              name="semenType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
              <option value="Type 4">Type 4</option>
              <option value="Type 5">Type 5</option>
              <option value="Type 6">Type 6</option>
              <option value="Type 7">Type 7</option>
              <option value="Type 8">Type 8</option>
              {/* Populate options dynamically based on available semen types */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="semenPushDate" className="block mb-1 font-semibold">
              Semen Push Date:
            </label>
            <input
              type="date"
              id="semenPushDate"
              name="semenPushDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pregnancyStartDate"
              className="block mb-1 font-semibold"
            >
              Pregnancy Start Date *:
            </label>
            <input
              type="date"
              id="pregnancyStartDate"
              name="pregnancyStartDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="semenCost" className="block mb-1 font-semibold">
              Semen Cost:
            </label>
            <input
              type="text"
              id="semenCost"
              name="semenCost"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otherCost" className="block mb-1 font-semibold">
              Other Cost:
            </label>
            <input
              type="text"
              id="otherCost"
              name="otherCost"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="note" className="block mb-1 font-semibold">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4 col-span-2 border border-gray-300 rounded-md p-4 text-center">
            <label
              htmlFor="approximateDeliveryDate"
              className="block mb-2 font-semibold"
            >
              Approximate Delivery Date:
            </label>
            <div className="flex items-center justify-center">
              <progress
                id="deliveryProgress"
                className="w-full"
                value={10}
                max={283}
              ></progress>
              <span className="ml-2">10 / 283</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowPregnancyForm;
