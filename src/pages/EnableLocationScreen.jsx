import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

const EnableLocationScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-evenly items-center px-6 py-4">
      {/* Image Section */}
      <div className="flex flex-col items-center mt-12">
        <img
          src={`${process.env.PUBLIC_URL}/Logo/location.png`}
          alt="Enable Location"
          className="w-50 "
        />
      </div>

      {/* Text Section */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Enable Your Location</h2>
        <p className="text-gray-500 mt-2 px-4">
          Choose your location to start finding requests around you.
        </p>
      </div>

      {/* Use My Location Button */}
      <button
        className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        onClick={() => navigate("/HomeScreen")} //  Navigate without reload
      >
        Use My Location
      </button>

      {/* Skip for Now */}
      <CustomLink to="/HomeScreen" text='Skip for now' className="text-gray-400 text-sm mt-2"/>
        
      
    </div>
  );
};

export default EnableLocationScreen;
