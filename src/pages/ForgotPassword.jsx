import { useState } from "react";
import InputField from "../components/InputField"; 
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex text-center items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm min-h-[80vh] flex flex-col justify-evenly bg-white px-6 py-8 rounded-lg shadow-lg text-center">
        
        {/* Back Button */}
        <ArrowButton/>

        {/* Logo */}
        <Logo />

        {/* Content */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your email and we'll send you a reset link.
          </p>

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Enter your email"
            icon="✉️"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Bottom Section */}
        <div className="w-full">
          <CustomLink 
            to="/PassengerLogin" 
            text="Sign In" 
            className="bg-yellow-500 text-white hover:underline py-3 px-10 font-semibold rounded-lg block w-full"
          />
          <p className="text-gray-500 mt-4 text-sm">
            Remember your password?{" "}
            <CustomLink to="/PassengerLogin" text="Sign In" className="text-blue-500 font-semibold" />
          </p>
        </div>

      </div>
    </div>
  );
}
