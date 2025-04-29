import React from "react";
import { FaMapMarkerAlt, FaRegBookmark, FaArrowLeft, FaBoxOpen, FaWeightHanging, FaCalendarAlt } from "react-icons/fa";

const PackageDelivery = () => {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4">
        <button onClick={() => window.history.back()} className="text-gray-700 text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Package Delivery</h1>
      </div>

      {/* Location Input Fields */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        {/* Sender Address */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input type="text" placeholder="Pickup location" className="w-full bg-transparent outline-none" />
        </div>

        {/* Receiver Address */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input type="text" placeholder="Drop-off location" className="w-full bg-transparent outline-none" />
        </div>

        {/* Package Details */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-4">
          <FaBoxOpen className="text-gray-500 mr-2" />
          <input type="text" placeholder="Package Size (e.g., Small, Medium, Large)" className="w-full bg-transparent outline-none" />
        </div>

        <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-2">
          <FaWeightHanging className="text-gray-500 mr-2" />
          <input type="text" placeholder="Approx. Weight (kg)" className="w-full bg-transparent outline-none" />
        </div>

        {/* Date & Time Selector */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg mt-4">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <input type="datetime-local" className="w-full bg-transparent outline-none text-gray-700" />
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

      {/* Recent Deliveries */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-800 font-bold text-lg">Recent Deliveries</h2>
        <div className="p-4 text-gray-500 text-center border rounded-lg mt-2">
          No recent deliveries found
        </div>
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

export default PackageDelivery;
