import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Invoices from "../Invoices";
import ProfileISettings from "../ProfileISettings";
import Subscription from "../Subscription";
import DashboardSettings from "../DashboardSettings";
import { useTranslation } from "../Translator/Provider";

const SettingHeader: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("/Subscription");

  // State to manage visible items in the dashboard
  const [visibleItems, setVisibleItems] = useState<number[]>([1, 2, 3, 4]); // Set your initial visible items here

  const isActive = (pathname: string) => {
    return location.pathname === pathname || activeSection === pathname;
  };

  const getLinkStyles = (pathname: string) => {
    const isActiveLink = isActive(pathname);
    return `inline-flex items-center justify-center p-4 border-b-2 ${
      isActiveLink
        ? "border-b-2 text-secondary dark:text-secondary"
        : "border-transparent hover:text-gray-600 dark:hover:text-gray-300 group"
    } rounded-t-lg`;
  };

  const getIconColor = (pathname: string) => {
    return isActive(pathname)
      ? "text-secondary dark:text-secondary"
      : "text-gray-400 dark:text-gray-500";
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  // Function to toggle visibility of dashboard items
  const handleToggle = (itemId: number, isVisible: boolean) => {
    setVisibleItems((prev) => {
      if (isVisible) {
        return [...prev, itemId]; // Add item if checked
      } else {
        return prev.filter(id => id !== itemId); // Remove item if unchecked
      }
    });
  };

  const { translate } = useTranslation();

  return (
    <div className="border-b text-secondary dark:text-secondary w-full">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <Link
            to="#"
            onClick={() => handleSectionClick("/profile")}
            className={getLinkStyles("/profile")}
          >
            <svg
              className={`w-4 h-4 me-2 ${getIconColor("/profile")}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            {translate("profile")}
          </Link>
        </li>
        <li className="me-2">
          <Link
            to="#"
            onClick={() => handleSectionClick("/dashboard")}
            className={getLinkStyles("/dashboard")}
          >
            <svg
              className={`w-4 h-4 me-2 ${getIconColor("/dashboard")}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143v-1.286A3.243 3.243 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            {translate("dashboard")}
          </Link>
        </li>
        <li className="me-2">
          <Link
            to="#"
            onClick={() => handleSectionClick("/Subscription")}
            className={getLinkStyles("/Subscription")}
          >
            <svg
              className={`w-4 h-4 me-2 ${getIconColor("/Subscription")}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
            </svg>
            {translate("subscription")}
          </Link>
        </li>
        <li className="me-2">
          <a
            onClick={() => handleSectionClick("/invoice")}
            className={getLinkStyles("/invoice")}
            style={{ cursor: "pointer" }}
          >
            <svg
              className={`w-4 h-4 me-2 ${getIconColor("/invoice")}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8l6-6V4c0-1.1-.9-2-2-2zM14 2v6h6M8 14h8v2H8zm0-4h8v2H8zm0-4h4v2H8zm-4 8h12v2H4zm0-8h4v2H4zm0 4h4v2H4zm0 4h4v2H4zm16-2h-4v2h4v-2z" />
            </svg>
            {translate("invoice")}
          </a>
        </li>
      </ul>
      <div className="py-4">
        {activeSection === "/dashboard" && (
          <DashboardSettings
            visibleItems={visibleItems}
            onToggle={handleToggle}
          />
        )}
        {activeSection === "/profile" && <ProfileISettings />}
        {activeSection === "/Subscription" && <Subscription />}
        {activeSection === "/invoice" && <Invoices />}
      </div>
    </div>
  );
};

export default SettingHeader;
