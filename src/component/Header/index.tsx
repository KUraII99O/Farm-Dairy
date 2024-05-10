import React, { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "../Translator/Provider";
import ProfilePopover from "../PopOver";

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
          // If image is not provided, generate profile image based on username
          if (!userData.image) {
            userData.image = generateProfileImage(userData.username);
          }
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

  // Function to generate profile image based on first letter of username
  const generateProfileImage = (username: string): string => {
    // Convert username to hash code
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Generate color based on hash code
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
  
    // Construct URL for profile image with consistent color
    const initials = username.substring(0, 1).toUpperCase();
    return `https://ui-avatars.com/api/?background=${color}&color=fff&name=${encodeURIComponent(initials)}`;
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
