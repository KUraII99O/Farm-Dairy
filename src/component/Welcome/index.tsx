import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

// Define the props interface
interface WelcomeMessageProps {
  username: string;
  onLogin: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ username, onLogin }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLogin();
    }, 100);
    return () => clearTimeout(timer);
  }, [onLogin]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-md text-center">
        <FaSpinner className="animate-spin text-4xl mb-4 text-primary" />
        <p className="text-lg font-semibold">Welcome back, {username}!</p>
        <p className="text-sm text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
