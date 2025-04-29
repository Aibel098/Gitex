import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import {  BackButton } from "../components/ReusableButton";

export default function RideBooking() {
  const [activeTab, setActiveTab] = useState("Pending");

  const tabs = ["Active", "Pending", "Scheduled", "Completed"];
  const ridesData = {
    Active: [
      { id: 1, from: "Mall Road", to: "City Center" },
      { id: 2, from: "Green Street", to: "Airport" },
    ],
    Pending: [
      { id: 3, from: "University Road", to: "Tech Park" },
    ],
    Scheduled: [
      { id: 4, from: "Main Square", to: "Railway Station" },
    ],
    Completed: [
      { id: 5, from: "Lake View", to: "Mountain Park" },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full flex items-center justify-between p-4 bg-white shadow-md border-b-4 border-yellow-400">
        <div><BackButton /></div>
      
        <h1 className="text-xl font-bold text-gray-800">My Rides</h1>
        <button className="text-2xl text-gray-600">⚙</button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex w-full justify-around bg-white shadow-md py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
              activeTab === tab
                ? "bg-yellow-400 text-white shadow-lg"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rides List - Updates Dynamically */}
      <div className="w-full p-4">
        {ridesData[activeTab].length > 0 ? (
          ridesData[activeTab].map((ride) => (
            <div
              key={ride.id}
              className="bg-white p-6 rounded-2xl shadow-lg mb-4 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Ride #{ride.id}</h2>
                  <p className="text-sm text-gray-500">
                    From: {ride.from} - To: {ride.to}
                  </p>
                </div>
                <span className="px-4 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-600 shadow-md">
                  {activeTab}
                </span>
              </div>
              <button className="mt-4 w-full py-3 bg-yellow-400 text-white font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition-all">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No rides found in this category.</p>
        )}
      </div>
    </div>
  );
}
