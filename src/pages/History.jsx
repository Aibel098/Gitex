import React from "react";
import { FaArrowLeft, FaCar, FaClock, FaMoneyBillWave } from "react-icons/fa";

const historyData = [
  {
    id: 1,
    from: "Downtown Mall",
    to: "Airport Terminal 1",
    date: "March 22, 2025",
    time: "10:30 AM",
    price: "$15.00",
    status: "Completed",
  },
  {
    id: 2,
    from: "City Park",
    to: "Tech Hub",
    date: "March 20, 2025",
    time: "5:15 PM",
    price: "$8.50",
    status: "Cancelled",
  },
  {
    id: 3,
    from: "University",
    to: "Home",
    date: "March 18, 2025",
    time: "7:00 PM",
    price: "$12.75",
    status: "Completed",
  },
  {
    id: 4,
    from: "Hotel Grand",
    to: "Shopping Center",
    date: "March 15, 2025",
    time: "4:45 PM",
    price: "$9.90",
    status: "Completed",
  },
  {
    id: 5,
    from: "Train Station",
    to: "Office Building",
    date: "March 12, 2025",
    time: "9:20 AM",
    price: "$11.50",
    status: "Cancelled",
  },
  {
    id: 6,
    from: "Hospital",
    to: "Library",
    date: "March 10, 2025",
    time: "2:00 PM",
    price: "$7.00",
    status: "Completed",
  },
  {
    id: 7,
    from: "Stadium",
    to: "Home",
    date: "March 8, 2025",
    time: "8:30 PM",
    price: "$13.25",
    status: "Completed",
  },
  {
    id: 8,
    from: "Cinema Hall",
    to: "Coffee Shop",
    date: "March 5, 2025",
    time: "6:15 PM",
    price: "$6.75",
    status: "Completed",
  },
];

const History = () => {
  return (
    <div className="w-full h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4 flex items-center shadow-md">
        <button onClick={() => window.history.back()} className="text-xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center">Ride History</h2>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4">
        {historyData.map((ride) => (
          <div
            key={ride.id}
            className="bg-white shadow-md p-5 rounded-xl border-l-4 border-yellow-500 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaCar className="text-yellow-500 text-2xl" />
                <div>
                  <p className="font-semibold text-lg">{ride.from} → {ride.to}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <FaClock className="text-gray-400" /> {ride.date} | {ride.time}
                  </p>
                </div>
              </div>
              <p
                className={`font-bold px-3 py-1 rounded-lg ${
                  ride.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {ride.status}
              </p>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <FaMoneyBillWave className="text-green-500" />
                <p className="text-lg font-medium">{ride.price}</p>
              </div>
              <button className="text-yellow-500 font-semibold hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
