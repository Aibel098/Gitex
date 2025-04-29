import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();

  // Load saved user data from localStorage (if available)
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "Faraz Shah",
    email: localStorage.getItem("userEmail") || "farazshah@example.com",
    phone: localStorage.getItem("userPhone") || "+92 300 1234567",
    profilePic: localStorage.getItem("userProfilePic") || "https://randomuser.me/api/portraits/men/1.jpg",
  });

  // Store original data for reset functionality
  const [originalUser, setOriginalUser] = useState(user);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imgUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePic: imgUrl });
    } else {
      alert("Please upload a valid image file!");
    }
  };

  // Save profile changes
  const handleSave = () => {
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userPhone", user.phone);
    localStorage.setItem("userProfilePic", user.profilePic);
    alert("Profile updated successfully!");
    navigate(-1);
  };

  // Reset changes
  const handleReset = () => {
    setUser(originalUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-gray-700 text-2xl cursor-pointer">
        <FaArrowLeft />
      </button>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>

        {/* Profile Picture Upload */}
        <div className="relative w-28 h-28 mx-auto">
          <img src={user.profilePic} alt="Profile" className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover" />
          <label className="absolute bottom-0 right-0 bg-yellow-500 text-white p-2 rounded-full cursor-pointer shadow-lg">
            <FaCamera />
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </div>

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
          {[
            { icon: <FaUser className="text-gray-500 mr-3" />, name: "name", value: user.name, placeholder: "Enter your name" },
            { icon: <FaEnvelope className="text-gray-500 mr-3" />, name: "email", value: user.email, placeholder: "Enter your email" },
            { icon: <FaPhone className="text-gray-500 mr-3" />, name: "phone", value: user.phone, placeholder: "Enter your phone number" },
          ].map((field, index) => (
            <div key={index} className="flex items-center border p-3 rounded-lg bg-gray-100">
              {field.icon}
              <input
                type="text"
                name={field.name}
                value={field.value}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 bg-transparent"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            <FaTimes /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
