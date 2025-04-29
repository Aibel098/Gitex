import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField"; 
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

const MobileNumber = () => {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState({ flag: "🇺🇸", code: "+1" });
  const [phoneNumber, setPhoneNumber] = useState("");

  const countries = [
    { flag: "🇺🇸", code: "+1" },
    { flag: "🇬🇧", code: "+44" },
    { flag: "🇵🇰", code: "+92" },
    { flag: "🇮🇳", code: "+91" },
  ];

  const textContent = {
    title: "Mobile Number",
    placeholder: "(201) 555-5555",
    continueButtonText: "CONTINUE",
    smsInfo: "You should receive an SMS for verification. Message and data rates may apply.",
    termsText: "By signing up, you agree to our",
    termsLinkText: "Terms of Use",
    privacyLinkText: "Privacy Policy"
  };

  

  return (
    <div className="flex flex-col h-screen justify-evenly items-center px-6 py-4">
      
      {/* Back Button */}
      <ArrowButton />

      {/* Logo */}
      <Logo />

      {/* Sign Up Form */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          {textContent.title}
        </h2>

        {/* Phone Input */}
        <div className="w-full">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 shadow-sm bg-white">
            
            {/* Country Code Dropdown */}
            <select
              className="mr-2 bg-transparent focus:outline-none text-sm"
              value={selectedCountry.code}
              onChange={(e) => {
                const selected = countries.find((c) => c.code === e.target.value);
                setSelectedCountry(selected);
              }}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>

            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder={textContent.placeholder}
              className="w-full text-gray-700 outline-none px-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

             {/* Continue Button */}
             <CustomLink to="/SendOTP" text="CONTINUE" className="bg-yellow-500 text-black hover:underline py-3 px-10 font-semibold rounded-lg  text-lg block w-full text-center">
          {textContent.continueButtonText}
        </CustomLink>

        {/* SMS Info */}
        <p className="text-gray-500 text-xs text-center mt-2 px-6">
          {textContent.smsInfo}
        </p>
      </div>

      {/* Terms & Privacy */}
      <div className="pb-6 text-center">
        <p className="text-gray-400 text-xs">
          {textContent.termsText}{" "}
          <CustomLink to="/terms" className="text-blue-500 underline">{textContent.termsLinkText}</CustomLink> &{" "}
          <CustomLink to="/privacy" className="text-blue-500 underline">{textContent.privacyLinkText}</CustomLink>.
        </p>
      </div>
    </div>
  );
};

export default MobileNumber;
