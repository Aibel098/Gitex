import React from "react";
import { FaMapMarkerAlt, FaRegBookmark, FaArrowLeft, FaCar, FaCalendarAlt, FaClock } from "react-icons/fa";

const RentalBooking = () => {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4">
        <button onClick={() => window.history.back()} className="text-gray-700 text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Rental Booking</h1>
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
          <input type="text" placeholder="Drop-off location (optional)" className="w-full bg-transparent outline-none" />
        </div>

        {/* Rental Date & Time */}
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

        {/* Vehicle Type Selection */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-4">
          <FaCar className="text-gray-500 mr-2" />
          <select className="w-full bg-transparent outline-none text-gray-700">
            <option>Select Vehicle Type</option>
            <option>Economy</option>
            <option>Luxury</option>
            <option>SUV</option>
            <option>Van</option>
          </select>
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

export default RentalBooking;
