import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const Address = () => {
  const navigate = useNavigate();

  // Load saved address from localStorage
  const [selectedAddress, setSelectedAddress] = useState(localStorage.getItem("selectedAddress") || "Home");

  const addresses = [
    { id: 1, type: "Home", details: "123 Street, Karachi, Pakistan", icon: <FaHome className="text-yellow-500 text-xl" /> },
    { id: 2, type: "Work", details: "Tech Park, Karachi, Pakistan", icon: <FaBriefcase className="text-gray-600 text-xl" /> },
    { id: 3, type: "Custom", details: "456 Avenue, Karachi, Pakistan", icon: <FaMapMarkerAlt className="text-gray-600 text-xl" /> },
  ];

  // Save selected address to localStorage
  useEffect(() => {
    localStorage.setItem("selectedAddress", selectedAddress);
  }, [selectedAddress]);

  return (
    <div className="w-full h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="text-xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center">Saved Addresses</h2>
      </div>

      {/* Address List */}
      <div className="p-6 space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`flex items-center justify-between border p-4 rounded-xl shadow-md cursor-pointer hover:border-yellow-500 transition ${
              selectedAddress === address.type ? "border-yellow-500 bg-gray-100" : "border-gray-300"
            }`}
            onClick={() => setSelectedAddress(address.type)}
          >
            <div className="flex items-center gap-3">
              {address.icon}
              <div>
                <p className="font-semibold">{address.type}</p>
                <p className="text-gray-600 text-sm">{address.details}</p>
              </div>
            </div>
            {selectedAddress === address.type && <FaCheckCircle className="text-green-500 text-xl" />}
          </div>
        ))}

        {/* Add New Address Button */}
        <button
          onClick={() => navigate("/AddAddress")}
          className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold py-3 rounded-md hover:bg-gray-900 transition"
        >
          <FaPlus /> Add New Address
        </button>
      </div>
    </div>
  );
};

export default Address;
