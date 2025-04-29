import React from "react";
import { FaHome, FaWallet, FaMapMarkerAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomNavbar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate(); // ✅ Define outside JSX

  const tabs = [
    { name: "Home", icon: <FaHome />, label: "Home", link: "/HomeScreen" },
    { name: "Service", icon: <FaMapMarkerAlt />, label: "Service", link: "/Service" },
    { name: "Rides", icon: <FaWallet />, label: "Rides", link: "/MyRide" },
    { name: "Settings", icon: <FaCog />, label: "Settings", link: "/Setting" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-3 border-t">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`flex flex-col items-center text-sm transition-colors duration-300 ${
            activeTab === tab.name ? "text-yellow-500" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab(tab.name);
            navigate(tab.link);
          }}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;
