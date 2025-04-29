import React, { useState } from "react";
import { FaArrowLeft, FaUser, FaLock, FaBell, FaQuestionCircle, FaMoon } from "react-icons/fa";

const AddPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} w-full h-screen transition-all duration-300`}>
      {/* Header */}
      <div className={`bg-yellow-500 shadow-md p-5 flex items-center`}>
        <button onClick={() => window.history.back()} className="text-2xl text-white">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-white flex-1 text-center">Settings</h2>
      </div>

      {/* Profile Section */}
      <div className="p-6 flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-xl mx-4 mt-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
          <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="User" className="w-full h-full object-cover"/>
        </div>
        <div>
          <p className="text-lg font-semibold">John Doe</p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">johndoe@email.com</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="mt-4 space-y-3 mx-4">
        {[
          { icon: <FaUser />, label: "Account" },
          { icon: <FaLock />, label: "Security" },
          { icon: <FaBell />, label: "Notifications" },
          { icon: <FaQuestionCircle />, label: "Help & Support" }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <div className="flex items-center gap-3">
              <div className="text-yellow-500 text-xl">{item.icon}</div>
              <p className="font-semibold">{item.label}</p>
            </div>
          </div>
        ))}

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <div className="flex items-center gap-3">
            <FaMoon className="text-yellow-500 text-xl" />
            <p className="font-semibold">Dark Mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-yellow-500 dark:peer-focus:ring-yellow-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-yellow-500 transition"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
