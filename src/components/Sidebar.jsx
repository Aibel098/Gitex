import React from "react";
import { 
  FaTimes, FaHome, FaUser, FaWallet, FaHistory, FaMapMarkerAlt, 
  FaTags, FaCog, FaHeadset, FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <>
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${isNavOpen ? "translate-x-0" : "-translate-x-full"} z-50 text-gray-800`}>
        
        {/* Profile Section */}
        <div className="relative p-4 border-b flex flex-col items-center text-center">
          {/* Cute Close Button */}
          <button 
            onClick={() => setIsNavOpen(false)} 
            className="absolute top-2 right-2  p-2 "
          >
            <FaTimes className="text-gray-600 text-lg" />
          </button>

          {/* Profile Avatar */}
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            F {/* First letter of the name */}
          </div>
          <h3 className="mt-2 text-lg font-bold">Faraz Shah</h3>
          <p className="text-sm text-gray-500">@farazshah</p>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="space-y-3 px-6">
            {[
              { icon: <FaHome />, text: "Home" , Url:'HomeScreen'},
              { icon: <FaUser />, text: "Profile" ,Url:'Profile' },
              { icon: <FaWallet />, text: "Payment" ,Url:'Payment' },
              { icon: <FaHistory />, text: "History",Url:'History' },
              { icon: <FaMapMarkerAlt />, text: "Addresses",Url:'Address' },
              { icon: <FaTags />, text: "Promo Code",Url:'PromoCode' },
              { icon: <FaCog />, text: "Settings",Url:'Setting' },
              { icon: <FaHeadset />, text: "Support",Url:'Support' },
            ].map(({ icon, text , Url }) => (
              <li key={text} className="flex items-center py-2 hover:bg-gray-200 rounded-md cursor-pointer transition">
                {icon} <span className="ml-3"><a href={Url}>{text}</a></span>
              </li>
            ))}
            <li className="flex items-center py-2 text-red-500 hover:bg-gray-200 rounded-md cursor-pointer">
              <FaSignOutAlt className="mr-3" /> Log out
            </li>
          </ul>
        </nav>
      </div>

      {isNavOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsNavOpen(false)} />}
    </>
  );
};

export default Sidebar;
