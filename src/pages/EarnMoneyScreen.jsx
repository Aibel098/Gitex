import React from "react";

const EarnMoneyScreen = () => {
  return (
    <div className="flex flex-col h-screen justify-between items-center px-6 py-4">
      {/* Image Section */}
      <div className="flex flex-col items-center mt-12">
        <img
          src={`${process.env.PUBLIC_URL}/Logo/earn-money.png`}
          alt="Earn Money"
          className="w-50  "
        />
      </div>

      {/* Text Section */}
      <div className="text-center">
        <h2 className="text-xl font-bold">Earn Money</h2>
        <p className="text-gray-500 mt-2 px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum.
        </p>
      </div>

      {/* Navigation Dots */}
      <button className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-md">
      <a href="/EnableLocationScreen">Get Started</a> 
      </button>
      <div className="flex space-x-2 my-4">
        <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
        <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
        <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
      </div>

      {/* Get Started Button */}
     
    </div>
  );
};

export default EarnMoneyScreen;
