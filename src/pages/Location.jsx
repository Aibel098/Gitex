import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt, FaRegBookmark, FaPlus, FaCalendarAlt,
  FaArrowLeft, FaClock, FaCar, FaBoxOpen, FaWeightHanging
} from "react-icons/fa";
import { AuthButton, ArrowButton, Logo, CustomLink, CategoryItem, LocationButtonWithIcon } from "../components/ReusableButton";


const Location = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    const fields = {
      intercity: [
        { name: "pickup_city", placeholder: "Enter pickup city", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "destination_city", placeholder: "Enter destination city", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "date_time", placeholder: "Select Date & Time", icon: <FaCalendarAlt />, type: "datetime-local" },
      ],
      package: [
        { name: "pickup_location", placeholder: "Pickup location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "dropoff_location", placeholder: "Drop-off location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "package_size", placeholder: "Package Size (e.g., Small, Medium, Large)", icon: <FaBoxOpen />, type: "text" },
        { name: "approx_weight", placeholder: "Approx. Weight (kg)", icon: <FaWeightHanging />, type: "number" },
        { name: "date_time", placeholder: "Select Date & Time", icon: <FaCalendarAlt />, type: "datetime-local" },
      ],
      schedule: [
        { name: "pickup_location", placeholder: "Pickup location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "dropoff_location", placeholder: "Drop-off location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "date", placeholder: "Select Date", icon: <FaCalendarAlt />, type: "date" },
        { name: "time", placeholder: "Select Time", icon: <FaClock />, type: "time" },
      ],
      rental: [
        { name: "pickup_location", placeholder: "Pickup location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "dropoff_location", placeholder: "Drop-off location (optional)", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "date", placeholder: "Select Date", icon: <FaCalendarAlt />, type: "date" },
        { name: "time", placeholder: "Select Time", icon: <FaClock />, type: "time" },
        {
          name: "vehicle_type",
          placeholder: "Select Vehicle Type",
          icon: <FaCar />,
          type: "select",
          options: ["Economy", "Luxury", "SUV", "Van"]
        },
      ],
      ride: [
        { name: "pickup_location", placeholder: "Pickup location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "dropoff_location", placeholder: "Drop-off location", icon: <FaMapMarkerAlt />, type: "text" },
        { name: "date", placeholder: "Select Date", icon: <FaCalendarAlt />, type: "date" },
        { name: "time", placeholder: "Select Time", icon: <FaClock />, type: "time" },
      ],
    };

    setFormFields(fields[category] || []);
  }, [category]);

  const RecentAddresses = { TextOne:'Recent',TextTwo:'No Address Found',location:'Location'};
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 ">
        <ArrowButton />
        <h1 className="text-lg font-semibold flex-1 text-center">{RecentAddresses.location}</h1>
      </div>

      {/* Dynamic Form */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        {formFields.map((field, index) => (
          <div key={index} className="flex items-center bg-gray-100 p-3 rounded-lg mb-2 gap-3">
            {field.icon}
            {field.type === "select" ? (
              <select className="w-full bg-transparent outline-none">
                {field.options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-transparent outline-none"
              />
            )}
            {category === "ride" && index === 1 && <FaPlus className="text-gray-500 cursor-pointer mr-5" />}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <LocationButtonWithIcon text="Saved Location" bgColor='bg-yellow-500' icon={FaMapMarkerAlt} />
        <LocationButtonWithIcon text="Saved Location" icon={FaRegBookmark} />
      </div>

      {/* Recent Addresses */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-gray-800 font-bold text-lg">{RecentAddresses.TextOne}</h2>
        <div className="p-4 text-gray-500 text-center border rounded-lg mt-2">
        {RecentAddresses.TextTwo}
        </div>
      </div>

      {/* Proceed Button */}
      <div className="mt-auto">

        <AuthButton
          text="Proceed"
          bgColor="bg-yellow-500"
          textColor="text-white"
          navigateLink="/PickUpRide"
        >
        </AuthButton>
      </div>
    </div>
  );
};

export default Location;
