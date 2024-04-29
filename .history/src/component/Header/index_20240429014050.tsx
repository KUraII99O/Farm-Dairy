import React, { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "../Translator/Provider";
import { Button, Popover } from "flowbite-react";

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
          <Popover
            <Button
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
            <div
              ref={profileRef}
              className={`absolute ${isProfileOpen ? "block" : "hidden"} ${
                isRTL ? "right-0" : "left-0"
              } top-full mt-2 w-32 sm:w-48 bg-white rounded-lg shadow-lg`}
              style={{
                [isRTL ? "right" : "left"]: isRTL ? "-100%" : "-100%",
                [isRTL ? "left" : "right"]: isRTL ? "-100%" : "-100%",
              }}
            >
              <div className="flex items-center p-3">
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="text-gray-800 font-medium text-sm">
                    {user.username}
                  </p>
                  <p className="text-gray-600 text-xs overflow-hidden overflow-ellipsis">
                    {user.email}
                  </p>
                </div>
              </div>
              <a
                href="Profile"
                className="block px-3 py-2 text-gray-800 hover:bg-gray-200 text-sm"
              >
                {translate("Profile")}
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-800 hover:bg-gray-200 text-sm"
              >
                {translate("settings")}
              </a>

              <div className="block px-3 py-2 text-gray-800 hover:bg-primary text-sm w-full bg-secondary  ">
                <button
                  onClick={handleSignOut}
                  className="inline-block w-full h-full"
                >
                  {translate("logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Popover
      </div>
    </nav>
  );
};

export default NavBar;
