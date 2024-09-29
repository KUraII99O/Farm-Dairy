import React, { useEffect, useState } from "react";
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
  const { translate, language } = useTranslation();
  
  const [items, setItems] = useState([]); // State to hold the fetched data

  // Fetch data from the backend
  useEffect(() => {
    fetch('https://auth-api-woad.vercel.app/api/dashboard-data') // Replace with your backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  // Map the backend data to include icons and colors
  const dashboardItems = items.map((item: any) => {
    let icon;
    let color;

    switch (item.title) {
      case "dashboard":
        icon = <FontAwesomeIcon icon={faUsers} />;
        color = "bg-red-500";
        break;
      case "manageCow":
        icon = <FontAwesomeIcon icon={faCow} />;
        color = "bg-blue-500";
        break;
      case "manageCowCalf":
        icon = <FontAwesomeIcon icon={faBaby} />;
        color = "bg-green-500";
        break;
      case "suppliers":
        icon = <FontAwesomeIcon icon={faTruck} />;
        color = "bg-yellow-500";
        break;
      case "manageStall":
        icon = <FontAwesomeIcon icon={faWarehouse} />;
        color = "bg-purple-500";
        break;
      case "farmExpense":
        icon = <FontAwesomeIcon icon={faMoneyBill} />;
        color = "bg-indigo-500";
        break;
      case "collectMilk":
        icon = <FontAwesomeIcon icon={faFlask} />;
        color = "bg-pink-500";
        break;
      case "saleMilk":
        icon = <FontAwesomeIcon icon={faShoppingCart} />;
        color = "bg-teal-500";
        break;
      case "todayCollectedMilk":
        icon = <FontAwesomeIcon icon={faCheese} />;
        color = "bg-orange-500";
        break;
      case "todaySoldMilk":
        icon = <FontAwesomeIcon icon={faGlassWhiskey} />;
        color = "bg-cyan-500";
        break;
      case "todayCollectedMilkAmount":
        icon = <FontAwesomeIcon icon={faSackDollar} />;
        color = "bg-gray-500";
        break;
      case "todaySoldMilkAmount":
        icon = <FontAwesomeIcon icon={faDollarSign} />;
        color = "bg-amber-500";
        break;
      default:
        icon = <FontAwesomeIcon icon={faUsers} />;
        color = "bg-red-500";
    }

    return {
      ...item,
      icon,
      color,
    };
  });

  return (
    <div className={language === "ar" ? "rtl" : ""}>
      <h1 className="text-3xl font-bold mb-4 text-secondary">{translate("adminDashboard")}</h1>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {dashboardItems.map((item) => (
          <DashboardItem key={item.id} item={item} isRTL={language === "ar"} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
