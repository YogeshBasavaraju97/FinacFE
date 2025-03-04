import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword, today, maxDob } from "../helpers/validations";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password if it changes
    if (name === "password") {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      return;
    }
    try {
      const passwordError = validatePassword(formData.password);
      setPasswordError(passwordError);
      if (passwordError) return;

      const response = await axios.post(
        BASE_URL + "/user/login",
        {
          ...formData,
        },
        { withCredentials: true }
      );

      if (response?.status === 201) {
        dispatch(addUser(response?.data?.user));
        navigate("/profile");
      }
    } catch (err) {
      setPasswordError(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="username">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            required
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}{" "}
          {/* Show error */}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          Login
        </button>

        {/* Optional: Include a link for forgotten password */}
        <p className="mt-4 text-center text-gray-600">
          <Link to="/register" className="text-purple-600">
            Forgot Password ?{" "}
            <span className="text-black  hover:underline">Register again</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
