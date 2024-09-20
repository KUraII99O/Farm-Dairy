import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../Translator/Provider";

interface LandingNavProps {
  onPricingClick?: () => void;
  onServiceClick?: () => void;
  onContactClick?: () => void;
}

const LandingNav: React.FC<LandingNavProps> = ({
  onPricingClick,
  onServiceClick,
  onContactClick,
}) => {
  const { translate, setLanguage, language } = useTranslation();
  const navigate = useNavigate();

  const handleChangeLanguage = (newLanguage: string) => {
    console.log("Changing language to:", newLanguage);
    setLanguage(newLanguage);
  };

  const handlePricingClick = () => {
    if (onPricingClick) {
      onPricingClick();
    } else {
      navigate("/desktop#pricing");
    }
  };

  const handleServiceClick = () => {
    if (onServiceClick) {
      onServiceClick();
    } else {
      navigate("/desktop#services");
    }
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      navigate("/desktop#contact");
    }
  };

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="/">
          <Link
            to="/"
            className="h-8 w-auto flex items-center transition-opacity duration-500"
          >
            <img
              src="https://sakosys.com/envato/dairy-farm-management-system/storage/app/public/uploads/751280420015239.png"
              className="h-8 w-auto sm:h-12 sm:w-auto ml-2 sm:ml-24"
              alt="Your Company"
            />
            <h3 className="text-lg sm:text-xl font-bold ml-2 text-primary">
              {translate("Ges Cow")}
            </h3>
          </Link>
        </NavbarBrand>
        <div className="flex items-center justify-end md:order-2">
          <Link
            to="/app/login"
            className="inline-block px-6 py-2 mr-3 bg-primary text-white font-semibold rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {translate("getstarted")}
          </Link>

          <div className="flex items-center ">
            <select
              value={language}
              onChange={(e) => handleChangeLanguage(e.target.value)}
              className="mr-2"
            >
              <option value="en">{translate("🇺🇸")}</option>
              <option value="fr">{translate("🇫🇷")}</option>
              <option value="ar">{translate("🇹🇳")}</option>
            </select>
          </div>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink href="/">{translate("home")}</NavbarLink>
          <Dropdown label={translate("solutions")} inline>
            <Dropdown.Item>
              <Link to="/solutions/web">{translate("web")}</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/solutions/mobile">{translate("mobile")}</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/solutions/desktop">{translate("desktop")}</Link>
            </Dropdown.Item>
          </Dropdown>
          <NavbarLink className="cursor-pointer" onClick={handleServiceClick}>
            {translate("services")}
          </NavbarLink>
          <NavbarLink className="cursor-pointer" onClick={handlePricingClick}>
            {translate("pricing")}
          </NavbarLink>
          <NavbarLink className="cursor-pointer" onClick={handleContactClick}>
            {translate("contact")}
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default LandingNav;
