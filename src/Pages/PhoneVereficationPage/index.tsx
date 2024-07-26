import React from 'react';
import { useLocation } from 'react-router-dom';
import EmailVerification from '../../component/OTP';

const PhoneVereficationPage = () => {
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from location state
  const hiddenEmail = email.replace(/(.{2})(.*)(@.*)/, '$1****$3'); // Replace part of the email with ****

  return (
    <div>
      <EmailVerification email={hiddenEmail} /> {/* Pass email prop */}
    </div>
  )
}

export default PhoneVereficationPage;
