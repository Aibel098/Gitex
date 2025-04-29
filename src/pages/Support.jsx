import React, { useState } from "react";
import { FaArrowLeft, FaPhone, FaEnvelope, FaQuestionCircle, FaComments } from "react-icons/fa";

const Support = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} w-full h-screen transition-all duration-300`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white p-5 flex items-center shadow-md">
        <button onClick={() => window.history.back()} className="text-2xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center">Support</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="text-lg">
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Support Options */}
      <div className="p-6 space-y-6">
        {[
          { icon: <FaQuestionCircle />, title: "FAQs", desc: "Find answers to common questions." },
          { icon: <FaComments />, title: "Live Chat", desc: "Chat with our support team in real-time." },
          { icon: <FaPhone />, title: "Call Support", desc: "Talk to our team for urgent issues." },
          { icon: <FaEnvelope />, title: "Email Support", desc: "Send us an email and we’ll get back to you." }
        ].map((item, index) => (
          <div key={index} className="bg-white  shadow-md p-5 rounded-xl flex items-center gap-4 border-l-4 border-yellow-500 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-yellow-500 text-3xl">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
