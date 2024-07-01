import React, { useRef } from 'react';
import LandingNav from '../LandingNav';
import Pricing from '../Pricing';
import ContactUs from '../ContactUs';
import LandingFooter from '../LandingFooter';
import Desktop from '../Desktop';
import OptionSelection from '../OptionSelection';

const DesktopLanding = () => {
  const optionSelectionRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToOptionSelection = () => {
    optionSelectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <LandingNav onPricingClick={scrollToPricing} />
      <Desktop scrollToOptionSelection={scrollToOptionSelection} />
      <div ref={pricingRef}>
        <Pricing />
      </div>
      <div ref={optionSelectionRef}>
        <OptionSelection id="OptionSelection" />
      </div>
      <ContactUs />
      <LandingFooter />
    </div>
  );
};

export default DesktopLanding;
