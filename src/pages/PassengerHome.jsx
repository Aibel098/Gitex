import React from "react";
import { Link } from "react-router-dom";
import { AuthButton, Logo } from "../components/ReusableButton"; // ✅ Importing Reusable Button

export default function PassengerHome() {
  const buttons = [
    { text: "SIGN UP WITH FACEBOOK", bgColor: "bg-blue-700", textColor: "text-white", link: "#" },
    { text: "SIGN UP WITH GOOGLE", bgColor: "bg-red-600", textColor: "text-white", link: "#" },
    { text: "SIGN UP WITH EMAIL", bgColor: "bg-yellow-400", textColor: "text-black", link: "/SignUp" },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 rounded-lg text-center">
      <Logo/>

        {/* Using Reusable Buttons */}
        {buttons.map((btn, index) => (
          btn.link.startsWith("/") ? (
            <Link key={index} to={btn.link}>
              <AuthButton text={btn.text} bgColor={btn.bgColor} textColor={btn.textColor} />
            </Link>
          ) : (
            <AuthButton key={index} text={btn.text} bgColor={btn.bgColor} textColor={btn.textColor} />
          )
        ))}

        <p className="text-gray-500 mt-4 text-sm">
          <Link to="/PassengerLogin" className="text-blue-600 underline">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
}
