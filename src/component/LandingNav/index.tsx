import React, { useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../Translator/Provider";

const LandingNav: React.FC = () => {
  const { translate, setLanguage, language } = useTranslation();

  const handleChangeLanguage = (newLanguage: string) => {
    console.log("Changing language to:", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <Link
            to="/" // Corrected link destination
            className="h-8 w-auto flex items-center transition-opacity duration-500"
          >
            <img
              src="https://sakosys.com/envato/dairy-farm-management-system/storage/app/public/uploads/751280420015239.png"
              className="h-8 w-auto sm:h-12 sm:w-auto ml-24"
              alt="Your Company"
            />
            <h3 className="text-lg sm:text-xl font-bold ml-2 text-primary">
              {translate("Ges Cow")} {/* Translate the company name */}
            </h3>
          </Link>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button className="bg-primary mr-24">
            {translate("getstarted")}
          </Button>{" "}
          {/* Translate the button text */}
          <div className="flex items-center ">
            <select
              value={language}
              onChange={(e) => handleChangeLanguage(e.target.value)}
              className="mr-2"
            >
              <option value="en">{translate("🇺🇸")}</option>{" "}
              {/* Translate the country flag emojis */}
              <option value="fr">{translate("🇫🇷")}</option>
              <option value="ar">{translate("🇹🇳")}</option>
            </select>
          </div>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="/">{translate("home")}</NavbarLink>{" "}
          {/* Translate navbar links */}
          <Dropdown label={translate("solutions")} inline>
            <Dropdown.Item>
              <a href="link_to_web_solution">{translate("web")}</a>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/solutions/mobile">{translate("mobilee")}</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/solutions/desktop">{translate("desktop")}</Link>
            </Dropdown.Item>
          </Dropdown>
          <NavbarLink href="#">{translate("services")}</NavbarLink>
          <NavbarLink href="#">{translate("pricing")}</NavbarLink>
          <NavbarLink href="#">{translate("contact")}</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default LandingNav;
