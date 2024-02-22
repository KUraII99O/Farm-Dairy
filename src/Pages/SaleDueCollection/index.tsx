// pages/SaleDueCollection/index.tsx
import React, { useState } from "react";
import InvoiceSearch from "../../component/InvoiceSearch";
import { MilkSale } from "../../component/Staff/types";
import { FaList } from "react-icons/fa";

const SaleDueCollection: React.FC = () => {
  const [sales] = useState<MilkSale[]>([
    {
      id: 1,
      Invoice: "00013	",
      Date: "	02/08/2024",
      AccountNo: "112",
      Name: "MD Rana",
      Contact: "01756000000",
      Email: "rahim@gmail.com"	,
      Litre: "2.00",
      Price: "Rs.100.00",
      Total: "Rs.200.00" ,
      Paid: "Rs.100.00	",
      Due: "Rs.100.00	",
      SoldBy: "Mr. Hasibur Rahman (Super Admin)",
    },

    {
      id: 2,
      Invoice: "00012	",
      Date: "02/04/2024",
      AccountNo: "112",
      Name: "MD Rana",
      Contact: "01756000000",
      Email: "asad@gmail.com"	,
      Litre: "120.00	",
      Price: "Rs.100.00"	,
      Total: "Rs.12,000.00 "	,
      Paid: "Rs.100.00	",
      Due: "Rs.11,900.00	",
      SoldBy: "Mr. Hasibur Rahman (Super Admin)",
    },
    {
      id: 3,
      Invoice: "00011	",
      Date: "01/08/2023	",
      AccountNo: "04062020	",
      Name: "Rahim Raja",
      Contact: "01356000000",
      Email: "rana@gmail.com",
      Litre: "3.00",
      Price: "Rs.3.00"	,
      Total: "Rs.9.00 "	,
      Paid: "Rs.9.00	",
      Due: "Rs.0.00	",
      SoldBy: "Mr. Hasibur Rahman (Super Admin)	",
    },
    {
      id: 4,
      Invoice: "00010",
      Date: "11/29/2022	",
      AccountNo: "04262020",
      Name: "Rahim Raja",
      Contact: "01356000000",
      Email: "rahim@gmail.com",
      Litre: "10.00	",
      Price:" Rs.3.00"	,
      Total: "Rs.30.00" 	,
      Paid: "30.00",
      Due: "Rs.0.00	",
      SoldBy: "Mr. Hasibur Rahman (Super Admin)",
    },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        <FaList className="mr-2" />
        <span>Milk Sale Due Pay</span>
      </h2>
      <InvoiceSearch sales={sales} />
    </div>
  );
};

export default SaleDueCollection;
