import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthButton, ArrowButton, Logo, CustomLink, CategoryItem } from "../components/ReusableButton";


const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Your ride has been booked successfully!", time: "2m ago" },
    { id: 2, type: "warning", message: "Your driver is arriving soon.", time: "5m ago" },
    { id: 3, type: "error", message: "Payment failed. Please try again.", time: "10m ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: "info",
        message: "New update available!",
        time: "Just now",
      };
      setNotifications((prev) => [newNotification, ...prev]);
    }, 10000); // Adds a new notification every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-4">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold">Notifications</h2>
          <Bell className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start p-3 mb-2 bg-gray-50 rounded-lg shadow-sm"
              >
                {notification.type === "success" && (
                  <CheckCircle className="text-green-500 w-6 h-6 mr-3" />
                )}
                {notification.type === "warning" && (
                  <Bell className="text-yellow-500 w-6 h-6 mr-3" />
                )}
                {notification.type === "error" && (
                  <XCircle className="text-red-500 w-6 h-6 mr-3" />
                )}
                <div>
                  <p className="text-gray-700 font-medium">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{notification.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;