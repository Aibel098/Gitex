import React from "react";

const TrackingRealtimeScreen = () => {
  return (
    <div className="flex flex-col h-screen justify-evenly items-center px-6 py-4">
      {/* Image Section */}
      <div className="flex flex-col items-center mt-12">
        <img
          src={`${process.env.PUBLIC_URL}/Logo/tracking_icon.png`}
          alt="Tracking Realtime"
          className="w-50 "
        />
      </div>

      {/* Text Section */}
      <div className="text-center">
        <h2 className="text-xl font-bold">Tracking Realtime</h2>
        <p className="text-gray-500 mt-2 px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum.
        </p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <button className="text-gray-400 text-sm mb-4"><a href="/EarnMoneyScreen">Skip</a></button>
        <div className="flex space-x-2">
          <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default TrackingRealtimeScreen;
