import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown
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

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? -1 : index);
  };

  const menuItems = [
    { name: "Dashboard", icon: MdSpaceDashboard, link: "/#" },
    {
      name: "Human Resource",
      icon: FaUserFriends,
      link: "/human-resource",
      submenu: [
        { name: "Add Staff", link: "/AddStaff" },
        { name: "Staff List", link: "/submenu-2" },
        { name: "User List", link: "/submenu-2" },
        { name: "Employee Salary", link: "/submenu-2" },
      ],
    },
    {
      name: "Milk Parlor",
      icon: GiMilkCarton,
      link: "/milk-parlor",
      submenu: [
        { name: "Collect Milk", link: "/submenu-1" },
        { name: "Sale Milk", link: "/submenu-2" },
        { name: "Sale Due Collection", link: "/submenu-2" },
      ],
    },
    { name: "Cow Feed", icon: PiForkKnifeFill, link: "/cow-feed" },
    {
      name: "Cow Monitor",
      icon: CgScreen,
      link: "/cow-monitor",
      submenu: [
        { name: "Routine Monitor", link: "/submenu-1" },
        { name: "Vaccine Monitor", link: "/submenu-2" },
        { name: "Animal Pregnancy", link: "/submenu-2" },
      ],
    },
    {
      name: "Cow Sale",
      icon: FaMoneyBillAlt,
      link: "/cow-sale",
      submenu: [
        { name: "Sale List", link: "/submenu-1" },
        { name: "Sale Due Collection", link: "/submenu-2" },
      ],
    },
    {
      name: "Farm Expense",
      icon: FaDollarSign,
      link: "/farm-expense",
      submenu: [
        { name: "Expense List", link: "/submenu-1" },
        { name: "Expense Purpose", link: "/submenu-2" },
      ],
    },
    { name: "Suppliers", icon: IoMdPerson, link: "/suppliers" },
    { name: "Manage Cow", icon: FaCow, link: "/manage-cow" },
    { name: "Manage Cow Calf", icon: SiHappycow, link: "/manage-cow-calf" },
    {
      name: "Manage Stall",
      icon: FaHouse,
      link: "/manage-stall",
      
    },
    {
      name: "Catalog",
      icon: GrCatalog,
      link: "/catalog",
      submenu: [
        { name: "Branch", link: "/submenu-1" },
        { name: "User Type", link: "/submenu-2" },
        { name: "Designation", link: "/submenu-2" },
        { name: "Colors", link: "/submenu-2" },
        { name: "Animal Types", link: "/submenu-2" },
        { name: "Vaccines", link: "/submenu-2" },
        { name: "Food Unit", link: "/submenu-2" },
        { name: "Food Item", link: "/submenu-2" },
        { name: "Monitoring Services", link: "/submenu-2" },
      ],
    },
    { name: "Settings", icon: IoSettings, link: "/settings" },
    {
      name: "Reports",
      icon: FaChartColumn,
      link: "/reports",
    
      
    },
  ];

  const hideArrows = ["Dashboard", "Cow Feed", "Suppliers", "Manage Cow", "Manage Cow Calf", "Settings","Manage Stall" , "Reports"];

  return (
    <div
      className={`h-full bg-white transition-all duration-300 ${
        isOpen ? "w-56" : "w-[3.35rem]"
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
        scrollbarColor: "rgba(0, 0, 0, 0.3) transparent"
      }}
      >
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="h-8 w-auto flex items-center transition-opacity duration-500">
              <img
                src="https://sakosys.com/envato/dairy-farm-management-system/storage/app/public/uploads/751280420015239.png"
                className="h-8 w-auto sm:h-12 sm:w-auto"
                alt="Your Company"
              />
              <h3 className="text-lg sm:text-xl font-bold ml-2 text-primary">
                Fam Dairy
              </h3>
            </div>
            <ul className="mt-6 space-y-2">
              {menuItems.map((item, index) => (
                <li key={index} className="min-w-max">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(index)}
                        className="relative flex items-center space-x-4 px-4 py-3 text-black hover:bg-primary transition duration-300 ease-in-out"
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="-mr-1 font-medium">{item.name}</span>
                        {openSubmenuIndex === index ? (
                          <MdKeyboardArrowDown className="h-6 w-6 ml-auto" />
                        ) : (
                          <MdKeyboardArrowLeft className="h-6 w-6 ml-auto" />
                        )}
                      </button>
                      {openSubmenuIndex === index && (
                        <ul className="py-2 space-y-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.link}
                                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-black dark:hover:bg-primary"
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
                      className="relative flex items-center space-x-4 px-4 py-3 text-black hover:bg-primary transition duration-300 ease-in-out"
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="-mr-1 font-medium">{item.name}</span>
                      {!hideArrows.includes(item.name) && (
                        isOpen || isHovered ?
                          <MdKeyboardArrowLeft className="h-6 w-6 ml-auto" /> : null
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end ">
          <button
            onClick={toggleSidebar}
            className="px-4 py-2 text-white"
          >
            {isOpen ? (
              <MdOutlineKeyboardDoubleArrowLeft className="h-6 w-6 text-black" />
            ) : (
              <MdKeyboardArrowLeft className="h-6 w-6 text-black transform rotate-180" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
