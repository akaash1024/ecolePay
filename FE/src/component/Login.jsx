import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { status, error, message } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await dispatch(loginUser(formData)).unwrap();
      toast.success(result.message);
      setFormData({ email: "", password: "" });
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <>
      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8  mx-auto">
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button type="button"
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            {status === "loading" ? "Loging in..." : "Log in"}
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Login;
