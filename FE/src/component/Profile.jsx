import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser, school } = useSelector((state) => state.users);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full">
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Avatar */}
        <div className="col-span-1">
          <img
            src={currentUser.avatar}
            alt="user profile"
            className="w-34 h-34 object-cover rounded-2xl"
          />
        </div>

        {/* User details */}
        <div className="col-span-2 space-y-1">
          <h3 className="text-xl sm:text-4xl font-semibold text-black">
            {currentUser.name}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            {currentUser.email}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
