import React from 'react';
import LandingNav from '../LandingNav';
import LandingIntro from '../LandingIntro';
import WhyChooseGescow from '../whatweoffer';
import WhyGesCow from '../Pricing';
import ContactUs from '../ContactUs';
import LandingFooter from '../LandingFooter';

const Landing = () => {
  return (
    <div>
      <LandingNav />
      <LandingIntro />
      <WhyChooseGescow />
      <WhyGesCow />
      <ContactUs />
      <LandingFooter />

      
      
    </div>
  );
};

export default Landing;
