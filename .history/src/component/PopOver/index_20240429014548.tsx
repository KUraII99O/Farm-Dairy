import React from "react";

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
  return (
    <div
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
          <p className="text-gray-800 font-medium text-sm">{user.username}</p>
          <p className="text-gray-600 text-xs overflow-hidden overflow-ellipsis">
            {user.email}
          </p>
        </div>
      </div>
      <a
        href="Profile"
        className="block px-3 py-2 text-gray-800 hover:bg-gray-200 text-sm"
      >
        Profile
      </a>
      <a
        href="#"
        className="block px-3 py-2 text-gray-800 hover:bg-gray-200 text-sm"
      >
        Settings
      </a>

      <div className="block px-3 py-2 text-gray-800 hover:bg-primary text-sm w-full bg-secondary  ">
        <button onClick={handleSignOut} className="inline-block w-full h-full">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePopover;
