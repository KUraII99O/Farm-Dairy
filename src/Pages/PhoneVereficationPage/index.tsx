import React from 'react'
import PhoneVerification from '../../component/OTP'
import { useLocation } from 'react-router-dom';

const PhoneVereficationPage = () => {
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || ''; // Get phone number from location state
  const hiddenPhoneNumber = phoneNumber.replace(/^\d{5}/, '*****'); // Replace the first five digits with *****

  return (
    <div>
      <PhoneVerification phoneNumber={hiddenPhoneNumber} />
    </div>
  )
}

export default PhoneVereficationPage;
