import React, { useRef } from "react";
import LandingNav from "../LandingNav";
import Mobile from "../Mobile";
import Pricing from "../Pricing";
import ContactUs from "../ContactUs";
import LandingFooter from "../LandingFooter";

const MobileLanding = () => {
  const pricingRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <LandingNav 
        onPricingClick={scrollToPricing} 
        onServiceClick={scrollToServices} 
        onContactClick={scrollToContact} 
      />
      <div ref={servicesRef}>
        <Mobile />
      </div>
      <div ref={pricingRef}>
        <Pricing />
      </div>
      <div ref={contactRef}>
        <ContactUs />
      </div>
      <LandingFooter />
    </div>
  );
};

export default MobileLanding;
