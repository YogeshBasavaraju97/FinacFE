import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <h1 className="text-4xl text-white font-bold mb-8 ">
        Welcome to FinacPluse Registration
      </h1>
      <div className="space-x-4">
        <button
          onClick={handleRegisterClick}
          className="bg-indigo-600 text-white py-2  px-16 w-48  border border-white  rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Register
        </button>
        <button
          onClick={handleLoginClick}
          className="bg-purple-600 text-white py-2 px-16 w-48  border border-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
