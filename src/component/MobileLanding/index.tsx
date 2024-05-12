import React from "react";
import LandingNav from "../LandingNav";
import Mobile from "../Mobile";
import Pricing from "../Pricing";
import ContactUs from "../ContactUs";
import LandingFooter from "../LandingFooter";

const MobileLanding = () => {
  return (
    <div>
      <LandingNav />
      <Mobile />
      <Pricing />
      <ContactUs />
      <LandingFooter />
    </div>
  );
};

export default MobileLanding;
