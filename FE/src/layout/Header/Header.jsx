import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { logoutUser } from "../../features/user/userSlice";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <header className="bg-blue-50 sticky">
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        {/* logo */}
        <div className="flex items-center">
          <div className="size-auto px-2 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
            <NavLink to="/">
              <span className="text-white text-3xl font-bold">$ÉcolePay</span>
            </NavLink>
          </div>
        </div>

        {/* navigation button */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              {/* Sidebar */}

              <div className="flex-1 flex  justify-between items-center gap-4 ">
                <NavLink
                  to="/overview"
                  className="cursor-pointer px-3 py-1 bg-green-400 text-green-900 rounded-full font-medium hover:text-white transition-colors"
                >
                  Overview
                </NavLink>
                <NavLink
                  to="/status"
                  className="cursor-pointer px-3 py-1 bg-green-400 text-green-900 rounded-full font-medium hover:text-white transition-colors"
                >
                  Status
                </NavLink>
                <li className="cursor-pointer px-3 py-1 bg-green-400 text-green-900 rounded-full font-medium hover:text-white transition-colors">
                  School
                </li>
              </div>

              <button
                type="button"
                className="cursor-pointer px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="cursor-pointer px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                Sing up
              </button>
              <button
                type="button"
                className="cursor-pointer px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
