import React, { useState } from "react";
import { FaMapMarkerAlt, FaRegBookmark, FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";

const ScheduleRide = () => {
  const [fare, setFare] = useState("0.00"); // Default fare
  const [passenger, setPassenger] = useState("Myself"); // Default passenger option

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4">
        <button onClick={() => window.history.back()} className="text-gray-700 text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Schedule a Ride</h1>
      </div>

      {/* Location Input Fields */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        {/* Pickup Location */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input type="text" placeholder="Pickup location" className="w-full bg-transparent outline-none" />
        </div>

        {/* Drop-off Location */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input type="text" placeholder="Drop-off location" className="w-full bg-transparent outline-none" />
        </div>

        {/* Schedule Date & Time */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input type="date" className="w-full bg-transparent outline-none text-gray-700" />
          </div>

          <div className="flex items-center bg-gray-100 p-3 rounded-lg">
            <FaClock className="text-gray-500 mr-2" />
            <input type="time" className="w-full bg-transparent outline-none text-gray-700" />
          </div>
        </div>

        {/* Passenger Selection */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-4">
          <FaUser className="text-gray-500 mr-2" />
          <select className="w-full bg-transparent outline-none text-gray-700" onChange={(e) => setPassenger(e.target.value)}>
            <option>Myself</option>
            <option>Someone Else</option>
          </select>
        </div>

        {/* Fare Display */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mt-4">
          <span className="text-gray-600 font-semibold">Estimated Fare:</span>
          <span className="text-gray-800 font-bold">${fare}</span>
        </div>
      </div>

       {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="flex-1 bg-yellow-500 text-white p-3 rounded-lg flex items-center justify-center mr-2">
                <FaMapMarkerAlt className="mr-2" /> Locate on Map
              </button>
              <button className="flex-1 bg-yellow-400 text-white p-3 rounded-lg flex items-center justify-center">
                <FaRegBookmark className="mr-2" /> Saved Location
              </button>
            </div>

      {/* Proceed Button */}
      <div className="mt-auto">
        <a href="PickUpRide">
          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold">
            Proceed
          </button>
        </a>
      </div>
    </div>
  );
};

export default ScheduleRide;
