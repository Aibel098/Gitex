import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

export default function VerifyCode() {
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/AcceptJobScreen");  // ✅ Navigate dynamically without page reload
  };

  // Store all text in an array for easy future updates
  const contentArray = [
    { name: "title", text: "Verify Code", className: "text-xl font-semibold mb-2" },
    { name: "description", text: "Please check your SMS. We just sent a verification code to your phone", className: "text-gray-500 text-sm mb-4" },
    { name: "phone", text: "+1 (000) 555 - 0000", className: "font-semibold" },
    { name: "codePrompt", text: "Didn’t get a code?", className: "text-gray-500 text-sm" },
    { name: "tryAgain", text: "Try Again", className: "text-blue-500 font-semibold hover:underline", link: "#" },
    { name: "verifyButton", text: "VERIFY", className: "bg-yellow-500 text-black hover:underline py-3 px-10 font-semibold rounded-lg text-lg block w-full text-center", link: "/AcceptJobScreen" },
    { name: "terms", text: "By signing up, you agree to our", className: "text-gray-500 mt-4 text-xs" },
    { name: "termsLink", text: "Terms of Use & Privacy Policy", className: "text-black font-semibold cursor-pointer" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full h-screen flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg text-center relative">

        {/* Back Button */}
        <ArrowButton />

        {/* Content - Logo, Title & Description */}
        <div className="flex flex-col justify-center items-center flex-grow">
          {/* Logo */}
          <Logo />

          {/* Title */}
          {contentArray.filter(item => item.name === "title").map((item, index) => (
            <h2 key={index} className={item.className}>
              {item.text}
            </h2>
          ))}

          {/* Description */}
          {contentArray.filter(item => item.name === "description").map((item, index) => (
            <p key={index} className={item.className}>
              {item.text} <br />
              <span className="font-semibold">
                {contentArray.find(item => item.name === "phone").text}
              </span>
            </p>
          ))}

          {/* Code Input Fields */}
          <div className="flex justify-center space-x-3 mb-4">
            {Array(4).fill("").map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border border-gray-400 rounded-lg outline-none text-lg"
              />
            ))}
          </div>

          {/* Resend Code Link */}
          {contentArray.filter(item => item.name === "codePrompt").map((item, index) => (
            <p key={index} className={item.className}>
              {item.text}{" "}
              <a href={contentArray.find(i => i.name === "tryAgain").link} className={contentArray.find(i => i.name === "tryAgain").className}>
                {contentArray.find(i => i.name === "tryAgain").text}
              </a>
            </p>
          ))}
        </div>

        {/* Bottom Section - Verify Button & Privacy Policy */}
        <div className="w-full">

          {/* Verify Button */}
          {contentArray.filter(item => item.name === "verifyButton").map((item, index) => (
            <CustomLink key={index} to={item.link} text={item.text} className={item.className} />
          ))}

          {/* Terms Text */}
          {contentArray.filter(item => item.name === "terms").map((item, index) => (
            <p key={index} className={item.className}>
              {item.text} <br />
              <span className={contentArray.find(i => i.name === "termsLink").className}>
                {contentArray.find(i => i.name === "termsLink").text}
              </span>
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}
