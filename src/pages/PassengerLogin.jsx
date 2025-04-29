// src/components/PassengerLogin.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

export default function PassengerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  // Get attempts from localStorage
  const loginAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');
  const MAX_ATTEMPTS = 5;

  const [formData, setFormData] = useState({ 
    username: "", 
    password: "" 
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>&"]/g, '');
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/MobileNumber");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const inputFields = [
    { type: "text", placeholder: "Username", icon: "👤", name: "username", error: formErrors.username },
    { type: "password", placeholder: "Password", icon: "🔒", name: "password", error: formErrors.password },
  ];

  const loginTermsData = {
    content: "By signing in you agree to our",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-sm h-screen p-6 bg-white">
        <div className="flex items-center justify-start mb-4">
          <ArrowButton />
        </div>
        <Logo />

        <form onSubmit={handleSubmit}>
          {inputFields.map((field, index) => (
            <div key={index} className="mb-4">
              <InputField
                {...field}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
              {field.error && <p className="text-red-500 text-xs mt-1">{field.error}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="bg-yellow-400 text-black hover:underline py-3 px-10 font-bold rounded-lg text-lg block w-full text-center disabled:opacity-50 mb-5"
            disabled={loading || loginAttempts >= MAX_ATTEMPTS}
          >
            {loading ? "Signing In..." : "SIGN IN"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loginAttempts > 0 && loginAttempts < MAX_ATTEMPTS && (
          <p className="text-yellow-500 text-sm mb-4">
            {MAX_ATTEMPTS - loginAttempts} attempts remaining
          </p>
        )}
        {isAuthenticated && (
          <p className="text-green-500 text-lg mb-4 font-semibold">
            🎉 Login Successful! Redirecting...
          </p>
        )}

        <CustomLink 
          to="/ForgotPassword" 
          text="Forgot Password?" 
          className="text-blue-500 hover:underline block mb-4" 
        />

        <p className="text-gray-500 text-xs">
          {loginTermsData.content}{" "}
          <span className="text-black font-semibold">
            <span className="cursor-pointer underline">{loginTermsData.terms}</span> &{" "}
            <span className="cursor-pointer underline">{loginTermsData.privacy}</span>
          </span>
        </p>

        <p className="text-gray-500 text-xs mt-2">
          Don't have an account?{" "}
          <span 
            className="text-blue-500 underline cursor-pointer" 
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}