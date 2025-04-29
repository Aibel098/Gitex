import { useState } from "react";
import { FaCar, FaMotorcycle, FaTruck, FaBicycle, FaShuttleVan, FaArrowLeft } from "react-icons/fa";
import BottomNavbar from "../components/BottomNavbar";
import { AuthButton, ArrowButton, Logo, CustomLink, BackButton } from "../components/ReusableButton";

const services = [
  { name: "Ride", icon: FaCar, description: "Book a car for a comfortable ride" },
  { name: "Bike", icon: FaMotorcycle, description: "Quick and affordable bike rides" },
  { name: "Delivery", icon: FaTruck, description: "Fast and secure parcel delivery" },
  { name: "Bicycle", icon: FaBicycle, description: "Eco-friendly ride options" },
  { name: "Van", icon: FaShuttleVan, description: "Spacious ride for groups" },
];
const headers = { titleOne: "Choose Your Service", titleTwo: "Select a service to continue", };



const ServiceCard = ({ service }) => (
  <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-200 transition">
    <service.icon className="text-yellow-500 text-4xl mb-2" />
    <h2 className="text-lg font-semibold text-gray-800">{service.name}</h2>
    <p className="text-gray-500 text-sm text-center">{service.description}</p>
  </div>
);

const Service = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-6 pb-15 relative">
      {/* Back Button */}
      <BackButton />
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mt-8">
        {headers.titleOne}
      </h1>
      <p className="text-gray-600">
        {headers.titleTwo}
      </p>
      {/* Services List */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-md">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>

      {/* Footer Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Service;
