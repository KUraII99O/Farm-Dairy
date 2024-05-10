import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown ,
} from "flowbite-react";
import { Link } from "react-router-dom";

const LandingNav = () => {
  return (
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
            GesCow
          </h3>
        </Link>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button className="bg-primary mr-24">Get started</Button>
        
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <Dropdown label="Solutions" inline>
      <Dropdown.Item>Web</Dropdown.Item>
      <Dropdown.Item>Mobile </Dropdown.Item>
      <Dropdown.Item>Desktop</Dropdown.Item>
    </Dropdown>
            <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default LandingNav;
