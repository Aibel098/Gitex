import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, ChevronLeft, Package, Home, AlertTriangle, LogOut, Moon, Sun } from "lucide-react";
import BottomNavbar from "../components/BottomNavbar";
import Navbar from "../components/Navbar";
import "leaflet/dist/leaflet.css";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("home");
  const [walletBalance, setWalletBalance] = useState(0);
  const [userName, setUserName] = useState("Guest");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    const savedUserName = localStorage.getItem("userName");
    const savedDarkMode = localStorage.getItem("darkMode");

    if (savedBalance) setWalletBalance(parseFloat(savedBalance));
    if (savedUserName) setUserName(savedUserName);
    if (savedDarkMode === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const settingsOptions = [
    { icon: User, label: "Profile Settings", link: "/Profile" },
    { icon: Users, label: "Saved Location", link: "/Address" },
    { icon: Package, label: "Promo Code", link: "/PromoCode" },
    { icon: Package, label: "AddPayment", link: "/Payment" },
  ];

  const appDetails = [
    { icon: Home, label: "App Pages", link: "/AddPages" },
    { icon: Package, label: "Share App", link: "#" },
    { icon: Users, label: "Support Ticket", link: "/Support" },
  ];

  const alertOptions = [
    { icon: AlertTriangle, label: "Delete Account", color: "text-red-600", link: "/delete-account" },
    { icon: LogOut, label: "Logout", color: "text-red-600", link: "/logout" },
  ];

  return (
    <div className={`${
      darkMode ? "bg-yellow-400 text-black" : "bg-white text-gray-900"
    } flex flex-col items-center w-full min-h-screen transition-all duration-300`}>
      <Navbar />

      <div className="w-full overflow-y-auto max-h-[calc(100vh-64px)] p-4">
        <div className={`w-full ${
          darkMode ? "bg-yellow-300 text-black" : "bg-white text-gray-900"
        } shadow-lg rounded-xl p-4 transition-all duration-300`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold rounded-full">
              {userName.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-lg font-bold">{userName}</h2>
          </div>
          <button 
            onClick={() => setWalletBalance(walletBalance + 10)} 
            className="mt-4 w-full py-3 bg-yellow-500 text-white font-semibold rounded-xl shadow-md hover:bg-yellow-600 transition-all"
          >
            My Wallet Balance ${walletBalance}
          </button>
        </div>

        {/* General Settings */}
        <div className="w-full mt-4">
          <h3 className="text-md font-bold">General</h3>
          <div className={`${
            darkMode ? "bg-yellow-300" : "bg-white"
          } shadow-md rounded-xl mt-2 divide-y`}>
            {settingsOptions.map((item, index) => (
              <div 
                key={index} 
                className="p-4 flex justify-between items-center hover:bg-yellow-200 transition cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className="text-gray-600" />
                  <span className="text-gray-700 font-semibold">{item.label}</span>
                </div>
                <ChevronLeft size={20} className="text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* App Details */}
        <div className="w-full mt-4">
          <h3 className="text-md font-bold">App Details</h3>
          <div className={`${
            darkMode ? "bg-yellow-300" : "bg-white"
          } shadow-md rounded-xl mt-2 divide-y`}>
            {appDetails.map((item, index) => (
              <div 
                key={index} 
                className="p-4 flex justify-between items-center hover:bg-yellow-200 transition cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className="text-gray-600" />
                  <span className="text-gray-700 font-semibold">{item.label}</span>
                </div>
                <ChevronLeft size={20} className="text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Alert Zone */}
        <div className="w-full mt-4 mb-20">
          <h3 className="text-md font-bold">Alert Zone</h3>
          <div className={`${
            darkMode ? "bg-yellow-300" : "bg-white"
          } shadow-md rounded-xl mt-2 divide-y`}>
            {alertOptions.map((item, index) => (
              <button 
                key={index} 
                className={`w-full p-4 flex items-center space-x-3 ${item.color} font-semibold hover:bg-yellow-200 transition`}
                onClick={() => navigate(item.link)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="fixed bottom-20 right-4 bg-yellow-500 p-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
      >
        {darkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} className="text-white" />}
      </button>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
