import React, { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "../Translator/Provider";
import ProfilePopover from "./ProfilePopover"; // Import ProfilePopover component

const NavBar: React.FC = () => {
  const { translate, isRTL } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string; image: string }>({
    username: "",
    email: "",
    image: ""
  });
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUserData = localStorage.getItem("loggedInUser");
        if (loggedInUserData) {
          const userData = JSON.parse(loggedInUserData);
          setUser(userData);
        } else {
          console.error("No user data found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data from localStorage:", error);
      }
    };

    fetchUserData();
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  const handleSignOut = () => {
    // Remove the logged-in user from local storage
    localStorage.removeItem("loggedInUser");
    // You can redirect to the login page or perform any additional actions here
    window.location.href = "/LogIn"; // Redirect to the login page
  };

  return (
    <nav className="bg-primary p-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white"></a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <button
              onClick={toggleProfile}
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{"Open user menu"}</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user.image}
                alt=""
              />
            </button>
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-4 mr-4"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">{"View notifications"}</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Include ProfilePopover component */}
            <ProfilePopover
              user={user}
              isProfileOpen={isProfileOpen}
              toggleProfile={toggleProfile}
              handleSignOut={handleSignOut}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
