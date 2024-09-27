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
import { useTranslation } from "../Translator/Provider";
import "./index.css"; // Import CSS file for Dashboard styles

const Dashboard: React.FC = () => {
  const { translate, language } = useTranslation(); // Use the useTranslation hook to access translation function and selected language

  const items = [
    // Dashboard items with translated titles
    { id: 1, title: translate("dashboard"), icon: <FontAwesomeIcon icon={faUsers} />, color: "bg-red-500", value: "0" },
    { id: 2, title: translate("manageCow"), icon: <FontAwesomeIcon icon={faCow} />, color: "bg-blue-500 ", value: "0" },
    { id: 3, title: translate("manageCowCalf"), icon: <FontAwesomeIcon icon={faBaby} />, color: "bg-green-500", value: "0" },
    { id: 4, title: translate("suppliers"), icon: <FontAwesomeIcon icon={faTruck} />, color: "bg-yellow-500", value: "0" },
    { id: 5, title: translate("manageStall"), icon: <FontAwesomeIcon icon={faWarehouse} />, color: "bg-purple-500", value: "0" },
    { id: 6, title: translate("farmExpense"), icon: <FontAwesomeIcon icon={faMoneyBill} />, color: "bg-indigo-500", value: "0" },
    { id: 7, title: translate("collectMilk"), icon: <FontAwesomeIcon icon={faFlask} />, color: "bg-pink-500", value: "0" },
    { id: 8, title: translate("saleMilk"), icon: <FontAwesomeIcon icon={faShoppingCart} />, color: "bg-teal-500", value: "0" },
    { id: 9, title: translate("todayCollectedMilk"), icon: <FontAwesomeIcon icon={faCheese} />, color: "bg-orange-500", value: "0" },
    { id: 10, title: translate("todaySoldMilk"), icon: <FontAwesomeIcon icon={faGlassWhiskey} />, color: "bg-cyan-500", value: "0" },
    { id: 11, title: translate("todayCollectedMilkAmount"), icon: <FontAwesomeIcon icon={faSackDollar} />, color: "bg-gray-500", value: "0" },
    { id: 12, title: translate("todaySoldMilkAmount"), icon: <FontAwesomeIcon icon={faDollarSign} />, color: "bg-amber-500", value: "0" },
  ];

  return (
    <div className={language === "ar" ? "rtl" : ""}> {/* Conditionally apply "rtl" class for Arabic language */}
      <h1 className="text-3xl font-bold mb-4 text-secondary">{translate("adminDashboard")}</h1>
      <div className="grid grid-cols-1 gap-4  mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
        {items.map((item) => (
          <DashboardItem key={item.id} item={item} isRTL={language === "ar"} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
