import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import { FaMoon } from "react-icons/fa";

const RideRequest = () => {
  const [isOnline, setIsOnline] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

  const rideRequests = [
    {
      id: 1,
      name: "Esther Berry",
      price: "$25.00",
      distance: "2.2 km",
      pickup: "7958 Swift Village",
      dropoff: "105 William St, Chicago, US",
      profilePic:'/Logo/1.png',
      payment: "ApplePay",
      discount: true,
    },
    {
      id: 2,
      name: "Callie Greer",
      price: "$20.00",
      distance: "1.5 km",
      pickup: "62 Kobe Trafficway",
      dropoff: "280 Icie Park Suite 496",
      profilePic: "/Logo/1.png",
      payment: "ApplePay",
      discount: true,
    },
    {
      id: 3,
      name: "Earl Guerrero",
      price: "$10.00",
      distance: "0.5 km",
      pickup: "9965 Soledad Ports",
      dropoff: "",
      profilePic: "/Logo/1.png",
      payment: "ApplePay",
      discount: false,
    },
  ];
  let AcceptRide=()=>{
    window.location.href='/RideRequestAccept';
  }
  return (
    <div className="flex min-h-screen relative text-white">
    <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    <div className="flex-1 flex flex-col pb-16">
      <Navbar setIsNavOpen={setIsNavOpen} isOnline={isOnline} setIsOnline={setIsOnline} />

      {!isOnline && (
        <div className="bg-orange-500 text-white p-3 flex items-center text-xs font-semibold rounded-md shadow-md mt-3 mx-4">
          <FaMoon className="text-white text-lg" />
          <p className="ml-2">You are offline! Go online to accept jobs.</p>
        </div>
      )}

        <div className="bg-orange-500 text-white text-center py-2 font-semibold">
          You have {rideRequests.length} new requests.
        </div>
        
        <div className="p-3 bg-gray-200">
  {rideRequests.map((ride) => (
    <div
      onClick={() => AcceptRide()}
      key={ride.id}
      className="bg-white shadow-md rounded-lg p-4 mb-4 transition-all hover:shadow-lg cursor-pointer"
    >
      {/* Ride Request Details */}
      <div className="flex items-center space-x-4">
        <img
          src={ride.profilePic}
          alt={ride.name}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <h3 className="text-black font-semibold text-lg">{ride.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="bg-yellow-300 text-xs font-bold px-2 py-1 rounded">
              {ride.payment}
            </span>
            {ride.discount && (
              <span className="bg-yellow-300 text-xs font-bold px-2 py-1 rounded">
                Discount
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-lg text-gray-900">{ride.price}</h3>
          <p className="text-gray-500 text-sm">{ride.distance}</p>
        </div>
      </div>

      {/* Pickup & Drop-off Details */}
      <div className="mt-4 text-sm text-gray-600 border-t pt-3">
        <p className="font-semibold text-gray-900 pb-2">PICK UP</p>
        <p className="bg-yellow-300 text-[17px] font-bold px-2 py-1 mb-5  rounded ">{ride.pickup}</p>

        {ride.dropoff && (
          <div className="mt-2">
            <p className="font-semibold text-gray-900 pb-2">DROP OFF</p>
            <p className="bg-yellow-300 text-[17px] font-bold px-2 py-1 rounded">{ride.dropoff}</p>
          </div>
        )}
      </div>

       {/* Action Buttons */}
       <div className="flex justify-between items-center mt-4">
        <button className="text-gray-500 hover:text-gray-700">Ignore</button>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded font-semibold transition">
          <a href="/RideDetail">Accept</a>
        </button>
      </div>
      
    </div>
  ))}
</div>

        
        <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default RideRequest;