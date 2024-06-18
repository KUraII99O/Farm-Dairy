import React, { useEffect, useRef } from "react";

interface ProfilePopoverProps {
  user: {
    username: string;
    email: string;
    image: string;
  };
  isProfileOpen: boolean;
  toggleProfile: () => void;
  handleSignOut: () => void;
  isRTL: boolean;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  user,
  isProfileOpen,
  toggleProfile,
  handleSignOut,
  isRTL,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        toggleProfile();
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, toggleProfile]);

  return (
    <div
      ref={popoverRef}
      className={`absolute ${isProfileOpen ? "block" : "hidden"} ${
        isRTL ? "right-0" : "left-0"
      } top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50`}
      style={{
        [isRTL ? "right" : "left"]: isRTL ? "-100%" : "-100%",
        [isRTL ? "left" : "right"]: isRTL ? "-100%" : "-100%",
      }}
    >
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={user.image}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-800 font-medium">{user.username}</p>
            <p className="text-gray-600 text-xs">{user.email}</p>
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <a
          href="Profile"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
        >
          Profile
        </a>
        <a
          href="settings"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
        >
          Settings
        </a>
        
        <div className="block px-4 py-2 text-gray-800 hover:bg-red-200 text-sm">
          <button onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopover;
