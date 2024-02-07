
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCow,
  faBaby,
  faTruck,
  faWarehouse,
  faMoneyBill,
  faFlask,
  faShoppingCart,
  faCheese,
  faGlassWhiskey,
  faDollarSign,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import DashboardItem from "../dashboardItem";

const Dashboard: React.FC = () => {
  const items = [
    { id: 1, title: "TOTAL STAFF", icon: <FontAwesomeIcon icon={faUsers} />, color: "bg-red-500", value: "0" },
    { id: 2, title: "TOTAL COW", icon: <FontAwesomeIcon icon={faCow} />, color: "bg-blue-500", value: "0" },
    { id: 3, title: "TOTAL CALF", icon: <FontAwesomeIcon icon={faBaby} />, color: "bg-green-500", value: "0" },
    { id: 4, title: "TOTAL SUPPLIER", icon: <FontAwesomeIcon icon={faTruck} />, color: "bg-yellow-500", value: "0" },
    { id: 5, title: "TOTAL COW STALLS", icon: <FontAwesomeIcon icon={faWarehouse} />, color: "bg-purple-500", value: "0" },
    { id: 6, title: "TOTAL EXPENSE", icon: <FontAwesomeIcon icon={faMoneyBill} />, color: "bg-indigo-500", value: "0" },
    { id: 7, title: "TOTAL COLLECTED MILK", icon: <FontAwesomeIcon icon={faFlask} />, color: "bg-pink-500", value: "0" },
    { id: 8, title: "TOTAL SOLD MILK", icon: <FontAwesomeIcon icon={faShoppingCart} />, color: "bg-teal-500", value: "0" },
    { id: 9, title: "TODAY COLLECTED MILK", icon: <FontAwesomeIcon icon={faCheese} />, color: "bg-orange-500", value: "0" },
    { id: 10, title: "TODAY SOLD MILK", icon: <FontAwesomeIcon icon={faGlassWhiskey} />, color: "bg-cyan-500", value: "0" },
    { id: 11, title: "TODAY COLLECTED MILK AMOUNT", icon: <FontAwesomeIcon icon={faSackDollar} />, color: "bg-gray-500", value: "0" },
    { id: 12, title: "TODAY SOLD MILK AMOUNT", icon: <FontAwesomeIcon icon={faDollarSign} />, color: "bg-amber-500", value: "0" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
        {items.map((item) => (
          <DashboardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};


export default Dashboard;
