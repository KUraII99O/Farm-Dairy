import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiMilkCarton } from "react-icons/gi";
import { PiForkKnifeFill } from "react-icons/pi";
import { CgScreen } from "react-icons/cg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { SiHappycow } from "react-icons/si";
import { FaCow } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { GrCatalog } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { useTranslation } from "../Translator/Provider";

const Sidebar: React.FC = () => {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [type, setType] = useState(""); // Declare 'type' state variable

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { type } = JSON.parse(loggedInUser);
      setType(type); // Set the user's type retrieved from local storage
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenSubmenuIndex(-1); // Close any open submenu when sidebar is closed
    }
  };

 

  const handleMenuItemClick = (index: number) => {
    if (openSubmenuIndex === index) {
      setOpenSubmenuIndex(-1); // Close the submenu if already open
    } else {
      setOpenSubmenuIndex(index);
    }
    setIsOpen(true); // Always keep the sidebar open when a menu item is clicked
  };

  const menuItems = [
    { name: translate("dashboard"), icon: MdSpaceDashboard, link: "/Dashboard" },
    {
      name: translate("humanResource"),
      icon: FaUserFriends,
      link: "/human-resource",
      submenu: [
        { name: translate("staffList"), link: "/staff" },
        { name: translate("userList"), link: "/User" },
        { name: translate("employeeSalary"), link: "/Employee" },
      ],
    },
    {
      name: translate("milkParlor"),
      icon: GiMilkCarton,
      link: "/milk-parlor",
      submenu: [
        { name: translate("collectMilk"), link: "/Milk" }, // Update link path to "/Milk"
        { name: translate("saleMilk"), link: "/Milk-Sale" },
        { name: translate("saleDueCollection"), link: "/SaleDueCollection" },
      ],
    },
    { name: translate("cowFeed"), icon: PiForkKnifeFill, link: "/cow-feed" },
    {
      name: translate("cowMonitor"),
      icon: CgScreen,
      link: "/cow-monitor",
      submenu: [
        { name: translate("routineMonitor"), link: "/Routine-Monitor" },
        { name: translate("vaccineMonitor"), link: "/Vaccine-Monitor" },
        { name: translate("animalPregnancy"), link: "/Animal-Pregnancy" },
      ],
    },
    {
      name: translate("cowSale"),
      icon: FaMoneyBillAlt,
      link: "/cow-sale",
      submenu: [
        { name: translate("saleList"), link: "/Cow-Sale-List" },
        { name: translate("saleDueCollection"), link: "/submenu-2" },
      ],
    },
    {
      name: translate("farmExpense"),
      icon: FaDollarSign,
      link: "/farm-expense",
      submenu: [
        { name: translate("expenseList"), link: "/Expense-List" },
        { name: translate("expensePurpose"), link: "/Purpose-List" },
      ],
    },
    { name: translate("suppliers"), icon: IoMdPerson, link: "/suppliers" },
    { name: translate("manageCow"), icon: FaCow, link: "/manage-cow" },
    { name: translate("manageCowCalf"), icon: SiHappycow, link: "/manage-cow-calf" },
    {
      name: translate("manageStall"),
      icon: FaHouse,
      link: "/manage-stall",
    },
    {
      name: translate("catalog"),
      icon: GrCatalog,
      link: "/catalog",
      submenu: [
        { name: translate("branch"), link: "/Branch-List" },
        { name: translate("userType"), link: "/User-Type-List" },
        { name: translate("designation"), link: "/Designation-List" },
        { name: translate("colors"), link: "/Color-List" },
        { name: translate("animalTypes"), link: "/Animal-Type" },
        { name: translate("vaccines"), link: "/Vaccine-List" },
        { name: translate("foodUnit"), link: "/submenu-2" },
        { name: translate("foodItem"), link: "/submenu-2" },
        { name: translate("monitoringServices"), link: "/submenu-2" },
      ],
    },
    { name: translate("settings"), icon: IoSettings, link: "/settings" },
    {
      name: translate("reports"),
      icon: FaChartColumn,
      link: "/reports",
    },
  ];

  const hideArrows = [
    translate("dashboard"),
    translate("cowFeed"),
    translate("suppliers"),
    translate("manageCow"),
    translate("manageCowCalf"),
    translate("settings"),
    translate("manageStall"),
    translate("reports"),
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (type === "admin") {
      return true; // Admin can see all menu items
    } else if (type === "user") {
      // Hide "Catalog", "Suppliers", and "Reports" for regular users
      return ![translate("catalog"), translate("suppliers"), translate("reports")].includes(item.name);
    } else if (type === "staff") {
      // Hide "Catalog", "Suppliers", "Reports", and "Farm Expense" for staff
      return ![translate("catalog"), translate("suppliers"), translate("reports"), translate("farmExpense")].includes(
        item.name
      );
    } else {
      
      return true; // Default to showing all items if user type is not recognized
    }
  });

  return (
    <div
      className={`h-full bg-white transition-all duration-300 ${
        isOpen ? "w-full lg:w-56" : "w-[3.35rem]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`sidebar overflow-y-auto border-r relative ${
          (isOpen || isHovered) && "scrollbar"
        }`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
        }}
      >
        <div className="flex h-screen flex-col justify-between pt-4 pb-6">
          <div>
            <Link
              to="/dashboard"
              className="h-8 w-auto flex items-center transition-opacity duration-500"
            >
              <img
                src="https://sakosys.com/envato/dairy-farm-management-system/storage/app/public/uploads/751280420015239.png"
                className="h-8 w-auto sm:h-12 sm:w-auto"
                alt="Your Company"
              />
              <h3 className="text-lg sm:text-xl font-bold ml-2 text-primary">
                Fam Dairy
              </h3>
            </Link>{" "}
            <ul className="mt-6 space-y-2">
              {filteredMenuItems.map((item, index) => (
                <li key={index} className="min-w-max">
                  {item.submenu ? (
                    <>
                      <div
                        onClick={() => handleMenuItemClick(index)}
                        className="relative flex items-center justify-between px-4 py-3 text-black hover:bg-primary transition duration-300 ease-in-out cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <item.icon className="h-6 w-6" />
                          <span className="-mr-1 font-medium">{item.name}</span>
                        </div>
                        <div>
                          {openSubmenuIndex === index ? (
                            <MdKeyboardArrowDown className="h-6 w-6" />
                          ) : (
                            <MdKeyboardArrowLeft className="h-6 w-6" />
                          )}
                        </div>
                      </div>
                      {openSubmenuIndex === index && (
                        <ul className="py-2 space-y-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.link}
                                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-black dark:hover:bg-primary"
                                onClick={() => handleMenuItemClick(index)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex items-center justify-between px-4 py-3 text-black hover:bg-primary transition duration-300 ease-in-out"
                      onClick={() => handleMenuItemClick(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <item.icon className="h-6 w-6" />
                        <span className="-mr-1 font-medium">{item.name}</span>
                      </div>
                      {!hideArrows.includes(item.name) &&
                        (isOpen || isHovered ? (
                          <MdKeyboardArrowLeft className="h-6 w-6" />
                        ) : null)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end ">
          <button onClick={toggleSidebar} className="px-4 py-2 text-white">
            {isOpen ? (
              <MdKeyboardArrowLeft className="h-6 w-6 text-black" />
            ) : (
              < MdOutlineKeyboardDoubleArrowLeft className="h-6 w-6 text-black transform rotate-180" />
            )}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
