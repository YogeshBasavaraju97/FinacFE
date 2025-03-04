// RegistrationForm.js
import React, { useEffect, useState } from "react";
import { calculateAge } from "../helpers/functions";
import { validatePassword, today, maxDob } from "../helpers/validations";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    gender: "Male",
    password: "",
    about: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "dateOfBirth") {
      const calculatedAge = calculateAge(value);
      setFormData((prevState) => ({
        ...prevState,
        age: calculatedAge,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const passwordError = validatePassword(formData.password);
      setPasswordError(passwordError);
      if (passwordError) return;

      const response = await axios.post(BASE_URL + "/user/register", {
        ...formData,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err?.response?.data);
      setError(err?.response?.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="  bg-white p-8 rounded-lg shadow-lg w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Registration Form
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            required
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              max={today()}
              min={maxDob()}
              className=" w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <label className="block text-gray-600 mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            required
            className=" appearance-none w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="age">
            gender
          </label>
          <select
            value={formData.gender}
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            maxLength={5000}
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
