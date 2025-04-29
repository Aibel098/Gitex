import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus, FaStar, FaCheckCircle, FaMap, FaArrowLeft } from "react-icons/fa";

const AddAddress = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("Home");
  const [address, setAddress] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const addressTypes = [
    { id: 1, type: "Home", icon: <FaHome className="text-yellow-500 text-xl" /> },
    { id: 2, type: "Work", icon: <FaBriefcase className="text-gray-600 text-xl" /> },
    { id: 3, type: "Custom", icon: <FaMapMarkerAlt className="text-gray-600 text-xl" /> },
  ];

  // Save address to localStorage
  const handleSaveAddress = () => {
    const newAddress = { type: selectedType, details: address, favorite: isFavorite };
    
    // Get existing addresses from localStorage
    const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    
    // Add new address
    storedAddresses.push(newAddress);
    
    // Save to localStorage
    localStorage.setItem("addresses", JSON.stringify(storedAddresses));

    // Navigate back to the address list
    navigate("/address");
  };

  return (
    <div className="w-full h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="text-xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center">Add New Address</h2>
      </div>

      {/* Address Type Selection */}
      <div className="p-6 space-y-4">
        <h3 className="text-gray-700 font-semibold">Select Address Type:</h3>
        <div className="flex gap-4">
          {addressTypes.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center border p-4 rounded-xl shadow-md cursor-pointer hover:border-yellow-500 transition ${
                selectedType === item.type ? "border-yellow-500 bg-gray-100" : "border-gray-300"
              }`}
              onClick={() => setSelectedType(item.type)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${item.type} address`}
            >
              {item.icon}
              <p className="font-semibold mt-2">{item.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Address Input Field */}
      <div className="p-6 space-y-4">
        <h3 className="text-gray-700 font-semibold">Enter Address:</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search or enter address"
            className="w-full p-4 border rounded-lg shadow-md focus:border-yellow-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            aria-label="Enter your address"
          />
          <FaMap className="absolute right-4 top-4 text-gray-500" />
        </div>
      </div>

      {/* Favorite Option */}
      <div className="p-6 flex items-center gap-3">
        <input
          type="checkbox"
          id="favorite"
          checked={isFavorite}
          onChange={() => setIsFavorite(!isFavorite)}
          className="hidden"
        />
        <label
          htmlFor="favorite"
          className={`flex items-center gap-2 p-3 rounded-md cursor-pointer shadow-md ${
            isFavorite ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaStar className={`${isFavorite ? "text-white" : "text-gray-500"}`} />
          <span className="font-semibold">Mark as Favorite</span>
        </label>
      </div>

      {/* Save Button */}
      <div className="p-6">
        <button
          onClick={handleSaveAddress}
          className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-900 transition"
          disabled={!address.trim()} // Disable if address is empty
        >
          <FaCheckCircle className="inline-block mr-2" /> Save Address
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
