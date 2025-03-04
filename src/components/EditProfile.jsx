import { today, maxDob } from "../helpers/validations";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { calculateAge } from "../helpers/functions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    about: "",
    gender: "Male",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          withCredentials: true,
        });
        if (res?.status === 200) {
          dispatch(addUser(res?.data));
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        if (error.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        age: user.age || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        about: user.about || "",
        gender: user.gender || "Male",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "dateOfBirth") {
      const calculatedAge = calculateAge(value);
      setUserData((prevState) => ({
        ...prevState,
        age: calculatedAge,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${BASE_URL}/user/${userId}`, userData, {
        withCredentials: true,
      });
      if (res?.status === 200) {
        dispatch(addUser(res?.data?.user));
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-lg shadow-lg w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Edit Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            required
            max={today()}
            min={maxDob()}
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={userData.age}
            required
            className=" appearance-none w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            name="about"
            value={userData.about}
            onChange={handleChange}
            maxLength={5000}
            className="w-full border border-purple-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
