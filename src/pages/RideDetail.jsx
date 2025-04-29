import React, { useState } from "react";
import { FaArrowLeft, FaPhone, FaComment, FaTrash } from "react-icons/fa";
import BottomNavbar from "../components/BottomNavbar";

let Pickuppage=()=>{
    window.location.href='/PickUpRide';
  }
  
const RideDetails = () => {
const [activeTab, setActiveTab] = useState("home");  
  return (
    <div className="h-screen bg-white shadow-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <a href="/RideRequestAccept"><FaArrowLeft className="text-gray-600" /></a>
        <h2 className="text-lg font-semibold">#123456</h2>
        <div></div>
      </div>

      <div className='font-["Winky_Sans",_sans-serif] bg-gray-100 p-4 rounded-lg shadow-lg'>
  {/* Rider Info */}
  <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
    <div className="flex items-center space-x-3">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        alt="Rider"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="font-semibold text-gray-900">Esther Berry</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="bg-yellow-300 text-xs font-bold px-2 py-1 rounded text-white">
            ApplePay
          </span>
          <span className="bg-yellow-300 text-xs font-bold px-2 py-1 rounded text-white">
            Discount
          </span>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-gray-500 text-sm">2.2 km</span>
      <span className="text-lg font-semibold text-gray-900">$25.00</span>
    </div>
  </div>

  {/* Pickup & Dropoff */}
  <div className="p-4 border-t bg-white rounded-lg mt-2">
    <p className="text-gray-600 text-sm font-semibold">PICK UP</p>
    <p className="text-black font-semibold">7958 Swift Village</p>
    <p className="text-gray-600 text-sm font-semibold mt-2">DROP OFF</p>
    <p className="text-black font-semibold">105 William St, Chicago, US</p>
  </div>

  {/* Notes */}
  <div className="p-4 border-t bg-white rounded-lg mt-2">
    <p className="text-gray-600 text-sm font-semibold">NOTES</p>
    <p className="text-gray-700 text-sm">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  </div>

  {/* Fare Details */}
  <div className="p-4 border-t bg-white rounded-lg mt-2">
    <p className="text-gray-600 text-sm font-semibold">TRIP FARE</p>
    <div className="flex justify-between text-gray-800">
      <span>Apple Pay</span>
      <span>$15.00</span>
    </div>
    <div className="flex justify-between text-gray-800">
      <span>Discount</span>
      <span>$10.00</span>
    </div>
    <div className="flex justify-between font-semibold text-gray-900">
      <span>Paid Amount</span>
      <span>$25.00</span>
    </div>
  </div>

  {/* Action Buttons */}
<div className="mt-4 border-t flex justify-between bg-white rounded-lg mt-2 space-x-2">
  <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
    <FaPhone className="mr-2" /> Call
  </button>
  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
    <FaComment className="mr-2" /> Message
  </button>
  <button className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
    <FaTrash className="mr-2" /> Cancel
  </button>
</div>


  {/* Footer Button */}
  <button
    onClick={() => Pickuppage()}
    className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md text-center hover:bg-yellow-600 transition mt-2"
  >
    GO TO PICK UP
  </button>
</div>
<BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
</div>

  );
};

export default RideDetails;
