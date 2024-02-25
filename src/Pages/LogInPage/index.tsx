import React from 'react';
import LogIn from '../../component/LogIn';

const LoginPage: React.FC = () => {
  // Define a function to handle login
  const handleLogin = () => {
    // Logic for handling login, for example, setting a token in localStorage
    // After successful login, call the onLogin prop
    console.log('Logged in');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Utilize Tailwind's flexbox utilities */}
      <LogIn onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
