import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { formatDate } from "../helpers/functions";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/user/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
        id: user._id,
        name: user.name,
        age: user.age,
        dob: formatDate(user.dateOfBirth),
        about: user.about,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(BASE_URL + `/user/${userData.id}`, {
        withCredentials: true,
      });
      // dispatch(addUser(null));
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/user/logout", {
        withCredentials: true,
      });
      dispatch(addUser(null));
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(err?.response?.data.message);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div
        onClick={handleLogout}
        className="absolute right-40 top-10 bg-white px-6 py-3 rounded-lg shadow-lg text-purple-500 font-semibold"
      >
        Logout
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Profile
        </h2>

        <div className="mb-4 flex items-center text-center gap-2 font-bold text-lg">
          <label className="font-semibold">Name:</label>
          <p className="p-2 items-center rounded-lg">{userData.name}</p>
        </div>

        <div className="mb-4 flex items-center text-center gap-2 font-bold text-lg">
          <label className="font-semibold">Age:</label>
          <p className="p-2 items-center rounded-lg">{userData.age}</p>
        </div>

        <div className="mb-4 flex items-center text-center gap-2 font-bold text-lg">
          <label className="font-semibold">DOB:</label>
          <p className="p-2 items-center rounded-lg">{userData.dob}</p>
        </div>

        <div className="mb-4 flex items-center text-center gap-2 font-bold text-lg">
          <label className="font-semibold">Gender:</label>
          <p className="p-2 items-center rounded-lg">{userData.gender}</p>
        </div>

        <div className="mb-4  text-left gap-2">
          <label className="font-semibold text-lg">About:</label>
          <p
            rows="4"
            readOnly
            className="p-2 w-full h-20 items-center font-small text-md rounded-lg border border-gray-400 overflow-scroll"
          >
            {userData.about}
          </p>
          {error && <p>{error}</p>}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-profile/${userData.id}`)}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
