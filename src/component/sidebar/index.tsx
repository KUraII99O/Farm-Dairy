import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
    { name: 'Human Resource', icon: FaUserFriends, link: '/human-resource' },
    { name: 'Milk Parlor', icon: GiMilkCarton, link: '/milk-parlor' },
    { name: 'Cow Feed', icon: PiForkKnifeFill, link: '/cow-feed' },
    { name: 'Cow Monitor', icon: CgScreen, link: '/cow-monitor' },
    { name: 'Cow Sale', icon: FaMoneyBillAlt, link: '/cow-sale' },
    { name: 'Farm Expense', icon: FaDollarSign, link: '/farm-expense' },
    { name: 'Suppliers', icon: IoMdPerson, link: '/suppliers' },
    { name: 'Manage Cow', icon: FaCow, link: '/manage-cow' },
    { name: 'Manage Cow Calf', icon: SiHappycow, link: '/manage-cow-calf' },
    { name: 'Manage Stall', icon: FaHouse, link: '/manage-stall' },
    { name: 'Catalog', icon: GrCatalog, link: '/catalog' },
    { name: 'Settings', icon: IoSettings, link: '/settings' },
    { name: 'Reports', icon: FaChartColumn, link: '/reports' },
  ];

  return (
    <div className={`h-full bg-white  transition-all duration-300 ${isOpen ? 'w-56' : 'w-[3.35rem]'}`}>
      <div className="sidebar overflow-hidden  border-r relative">
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
                  <Link to={item.link} className="relative flex items-center space-x-4  px-4 py-3 text-black hover:bg-lime-300 transition duration-300 ease-in-out">
                    <item.icon className="h-6 w-6" /> 
                    <span className="-mr-1 font-medium">{item.name}</span>
                  </Link>
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
