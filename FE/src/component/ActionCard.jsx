import React from "react";
import { useSelector } from "react-redux";

export const ActionCard = () => {
  const { school } = useSelector((state) => state.users);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-2 w-full">
      <ul className="flex justify-around text-gray-700 font-medium">
        <li className=" text-2xl cursor-pointer hover:text-green-600 transition">
          Overview
        </li>
        <li className="text-2xl cursor-pointer hover:text-green-600 transition">
          School
        </li>
        <li className="text-2xl cursor-pointer hover:text-green-600 transition">
          Status
        </li>
      </ul>
    </div>
  );
};

export default ActionCard;
