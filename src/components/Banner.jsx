// Banner.js
import React from "react";

const Banner = ({ title = "IT'S TIME TO FREIGHT", imageUrl = "https://plus.unsplash.com/premium_photo-1737501642244-693f31b3bf9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyJTIwY2F0b29ufGVufDB8fDB8fHww" }) => {
  return (
    <div className="relative bg-yellow-200 p-6 rounded-lg text-gray-800 font-bold text-lg flex items-center justify-center overflow-hidden" style={{ height: "180px" }}>
      {/* Background Image */}
      <img src={imageUrl} alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-80" />
      {/* Overlay Text */}
      <h2 className="relative z-10 text-white text-xl font-bold">{title}</h2>
    </div>
  );
};

export default Banner;
