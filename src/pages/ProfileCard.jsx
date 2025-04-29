import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBars, FaTimes, FaHome, FaUser, FaWallet, FaHistory, FaMapMarkerAlt, FaTags, FaCog, FaHeadset, FaSignOutAlt, FaMoon, FaClock, FaTachometerAlt, FaBriefcase } from "react-icons/fa";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

const ProfileCard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const position = [24.8607, 67.0011];
  
  const user = {
    name: "Jeremiah Curtis",
    level: "Basic level",
    earnings: "$325.00",
    hoursOnline: 10.2,
    totalDistance: 30,
    totalJobs: 20,
    imageUrl: "https://via.placeholder.com/40",
  };

  return (
   <div className="flex min-h-screen relative text-white">
        {/* Sidebar Navigation */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${isNavOpen ? "translate-x-0" : "-translate-x-full"} z-50 text-gray-800`}>
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setIsNavOpen(false)}>
              <FaTimes className="text-xl hover:text-red-500" />
            </button>
          </div>
          <nav className="mt-4">
            <ul className="space-y-3 px-6">
              {[{ icon: <FaHome />, text: "Home" }, { icon: <FaUser />, text: "Profile" }, { icon: <FaWallet />, text: "Payment" }, { icon: <FaHistory />, text: "History" }, { icon: <FaMapMarkerAlt />, text: "Addresses" }, { icon: <FaTags />, text: "Promo Code" }, { icon: <FaCog />, text: "Settings" }, { icon: <FaHeadset />, text: "Support" }].map(({ icon, text }) => (
                <li key={text} className="flex items-center py-2 hover:bg-gray-200 rounded-md cursor-pointer transition">
                  {icon} <span className="ml-3">{text}</span>
                </li>
              ))}
              <li className="flex items-center py-2 text-red-500 hover:bg-gray-200 rounded-md cursor-pointer">
                <FaSignOutAlt className="mr-3" /> Log out
              </li>
            </ul>
          </nav>
        </div>
  
        {isNavOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsNavOpen(false)}></div>}
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col pb-16"> {/* Added padding-bottom for navbar spacing */}
          <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md text-gray-800">
            <button onClick={() => setIsNavOpen(true)}>
              <FaBars className="text-2xl" />
            </button>
            <h2 className="text-lg font-semibold">{isOnline ? "Online" : "Offline"}</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
              <div className={`w-14 h-7 flex items-center rounded-full transition-all ${isOnline ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${isOnline ? "translate-x-7" : ""}`}></div>
              </div>
            </label>
          </div>
  
          {!isOnline && (
            <div className="bg-orange-500 text-white p-3 flex items-center text-xs font-semibold rounded-md shadow-md mt-3 mx-4">
              <FaMoon className="text-white text-lg" />
              <p className="ml-2">You are offline! Go online to accept jobs.</p>
            </div>
          )}
  
          {/* Map Section */}
          <div className="h-[60vh] w-full rounded-lg overflow-hidden shadow-md mt-4 -z-10 relative">
            <MapContainer center={position} zoom={13} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={customIcon}>
                <Popup>Current Location</Popup>
              </Marker>
            </MapContainer>
          </div>

        {/* Profile Card */}
        <motion.div 
  className="relative w-full p-4 bg-white shadow-lg rounded-t-lg mt-4 mb-16"  
  initial={{ y: 100 }} 
  animate={{ y: 0 }} 
  transition={{ type: "spring", stiffness: 100 }}
>

          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <img src={user.imageUrl} alt="User" className="w-12 h-12 rounded-full" />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-500 text-sm">{user.level}</p>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{user.earnings}</h2>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg mt-4 flex justify-between text-center">
            <div>
              <FaClock className="mx-auto text-xl" />
              <p className="text-lg font-semibold">{user.hoursOnline}</p>
              <p className="text-sm">HOURS ONLINE</p>
            </div>
            <div>
              <FaTachometerAlt className="mx-auto text-xl" />
              <p className="text-lg font-semibold">{user.totalDistance} KM</p>
              <p className="text-sm">TOTAL DISTANCE</p>
            </div>
            <div>
              <FaBriefcase className="mx-auto text-xl" />
              <p className="text-lg font-semibold">{user.totalJobs}</p>
              <p className="text-sm">TOTAL JOBS</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-3 border-t">
                {[
                  { name: "home", icon: <FaHome />, label: "Home" },
                  { name: "wallet", icon: <FaWallet />, label: "Wallet" },
                  { name: "location", icon: <FaMapMarkerAlt />, label: "Location" },
                  { name: "settings", icon: <FaCog />, label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.name}
                    className={`flex flex-col items-center text-sm ${activeTab === tab.name ? "text-yellow-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
    </div>
  );
};

export default ProfileCard;
