// HomeScreen.js
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import BottomNavbar from "../components/BottomNavbar";
import { AuthButton, ArrowButton, Logo, CustomLink, CategoryItem } from "../components/ReusableButton";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { FaCar, FaCalendarAlt, FaKey } from "react-icons/fa";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen mb-20">
      {/* Header */}
      <Navbar username="Guest" />

      {/* Banner */}
      <Banner title="IT'S TIME TO FREIGHT" />

      <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">Top Categories</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <a onClick={() => navigate('/Location?category=ride')}>
          <CategoryItem  icon={MdOutlineDirectionsCar} label="Ride" bgColor="bg-yellow-100" />
        </a>
        <a  onClick={() => navigate('/Location?category=intercity')}>
          <CategoryItem  icon={IoCarSport} label="Intercity" bgColor="bg-yellow-200" />
        </a>
        <a onClick={() => navigate('/Location?category=package')}>
          <CategoryItem   icon={FaCar} label="Package" bgColor="bg-yellow-300 text-yellow-500" />
        </a>
        <a onClick={() => navigate('/Location?category=schedule')}>
          <CategoryItem  icon={FaCalendarAlt} label="Schedule" bgColor="bg-yellow-400" />
        </a>
        <a onClick={() => navigate('/Location?category=rental')}>
          <CategoryItem onClick={() => navigate('/Location?category=rental')} icon={FaKey} label="Rental" bgColor="bg-yellow-500 text-white" />
        </a>
      </div>
    </div>

      {/* Active Ride Button */}
      <div className="p-4">
        <AuthButton 
          text="Back to Active Ride" 
          bgColor="bg-yellow-400" 
          textColor="text-white" 
         navigateLink="/Location"
        >
        </AuthButton>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HomeScreen;
