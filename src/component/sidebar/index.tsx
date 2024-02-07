import React, { useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
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

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { name: 'Human Resource', icon: FaUserFriends },
    { name: 'Milk Parlor', icon: GiMilkCarton },
    { name: 'Cow Feed', icon: PiForkKnifeFill },
    { name: 'Cow Monitor', icon: CgScreen },
    { name: 'Cow Sale', icon: FaMoneyBillAlt },
    { name: 'Farm Expense', icon: FaDollarSign },
    { name: 'Suppliers', icon: IoMdPerson },
    { name: 'Manage Cow', icon: FaCow },
    { name: 'Manage Cow Calf', icon: SiHappycow },
    { name: 'Manage Stall', icon: FaHouse },
    { name: 'Catalog', icon: GrCatalog },
    { name: 'Settings', icon: IoSettings },
    { name: 'Reports', icon: FaChartColumn },
  ];

  return (
    <div className={`min-h-screen bg-white transition-all duration-300 ${isOpen ? 'w-56' : 'w-[3.35rem]'}`}>
      <div className="sidebar overflow-hidden border-r relative">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="h-8 w-auto">
              <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                alt="Your Company"
              />
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              {menuItems.map((item, index) => (
                <li key={index} className="min-w-max">
                  <a
                    href="#"
                    className="relative flex items-center space-x-4  px-4 py-3 text-black hover:bg-green-500"
                  >
                    <item.icon className="h-6 w-6" /> {/* Render the icon */}
                    <span className="-mr-1 font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-end ">
          <button onClick={isOpen ? closeSidebar : openSidebar} className="px-4 py-2  text-white">
            {isOpen ? <MdOutlineKeyboardDoubleArrowLeft className="h-6 w-6 text-black" /> : <MdOutlineKeyboardDoubleArrowRight className="h-6 w-6 text-black" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
