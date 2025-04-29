import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaCog, FaStar, FaCar, FaWallet, FaGift, FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  // Simulating user data from an API
  const [user, setUser] = useState({
    name: "Guest",
    username: "@Guest",
    rating: 4.9,
    trips: 120,
    paymentMethods: 5,
    rewards: 3,
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    coverPhoto: "https://source.unsplash.com/800x300/?nature",
  });

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-gray-700 text-2xl cursor-pointer">
        <FaArrowLeft />
      </button>

      {/* Cover Photo */}
      <div className="relative w-full">
        <img src={user.coverPhoto} alt="Cover" className="w-full h-40 object-cover" />
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden shadow-lg">
          <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.username}</p>
        <div className="flex justify-center items-center gap-1 mt-2 text-yellow-500">
          <FaStar className="text-lg" />
          <span className="font-semibold text-gray-800">{user.rating}</span>
          <p className="text-gray-500 text-sm">({user.trips} Rides)</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around w-full mt-6 text-gray-800 text-sm border-t py-4 bg-white shadow-md rounded-lg">
        {[
          { icon: <FaCar className="text-yellow-500 mx-auto text-lg" />, label: "Trips", value: user.trips },
          { icon: <FaWallet className="text-yellow-500 mx-auto text-lg" />, label: "Payment", value: `${user.paymentMethods} Cards` },
          { icon: <FaGift className="text-yellow-500 mx-auto text-lg" />, label: "Rewards", value: `${user.rewards} Vouchers` },
        ].map((item, index) => (
          <div key={index} className="text-center">
            {item.icon}
            <p className="font-semibold">{item.label}</p>
            <p className="text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col w-full px-6 mt-6">
        {[
          { icon: <FaUserEdit className="text-yellow-500 text-lg" />, label: "Edit Profile", link: "/ProfileEdit" },
          { icon: <FaCog className="text-gray-700 text-lg" />, label: "Settings", link: "/Setting" },
        ].map((item, index) => (
          <Link to={item.link} key={index} className="flex items-center gap-3 bg-white py-4 px-6 mt-3 rounded-lg shadow-md text-gray-900 hover:bg-gray-200 transition">
            {item.icon}
            <span className="flex-1 text-left font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around w-full fixed bottom-0 bg-white shadow-md py-4 border-t">
        {[
          { icon: <FaCar className="text-2xl" />, label: "Trips", link: "/History" },
          { icon: <FaWallet className="text-2xl" />, label: "Wallet", link: "/Payment" },
          { icon: <FaGift className="text-2xl" />, label: "Rewards", link: "/Rewards" },
        ].map((item, index) => (
          <Link to={item.link} key={index} className="flex flex-col items-center text-gray-700 hover:text-yellow-500 transition">
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
