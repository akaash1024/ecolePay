import React from "react";
import { useSelector } from "react-redux";

export const SchoolCard = () => {
  const { school } = useSelector((state) => state.users);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-2 w-full">
      <ul className="flex justify-center-safe text-gray-700 font-medium">
        <li className=" text-2xl cursor-pointer text-green-600  hover:text-green-800 transition">
          {school.name}
        </li>
      </ul>
    </div>
  );
};

export default SchoolCard;
