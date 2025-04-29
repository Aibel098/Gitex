// src/components/SignUp.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, resetSignupState } from "../redux/signUpSlice";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.signUp);

  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!signUp.username.trim()) {
      errors.username = "Username is required";
    } else if (signUp.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!signUp.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(signUp.email)) {
      errors.email = "Invalid email format";
    }

    if (!signUp.password) {
      errors.password = "Password is required";
    } else if (signUp.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(signUp.password)) {
      errors.password = "Password must contain uppercase, number, and special character";
    }

    if (signUp.password !== signUp.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getSignUpData = (e) => {
    const { name, value } = e.target;
    // Basic input sanitization
    const sanitizedValue = value.replace(/[<>&"]/g, '');
    setSignUp({ ...signUp, [name]: sanitizedValue });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        username: signUp.username,
        email: signUp.email,
        password: signUp.password // In production, hash this before sending
      };
      dispatch(signUpUser(userData));
    }
  };

  // Handle successful signup
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/PassengerLogin");
        dispatch(resetSignupState()); // Reset state after navigation
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  const inputFields = [
    { type: "text", placeholder: "Username", icon: "👤", name: "username", error: formErrors.username },
    { type: "email", placeholder: "Email", icon: "📧", name: "email", error: formErrors.email },
    { type: "password", placeholder: "Password", icon: "🔒", name: "password", error: formErrors.password },
    { type: "password", placeholder: "Confirm Password", icon: "🔒", name: "confirmPassword", error: formErrors.confirmPassword },
  ];

  const termsData = {
    content: "By signing up you agree to our",
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
                onChange={getSignUpData}
                value={signUp[field.name]}
              />
              {field.error && <p className="text-red-500 text-xs mt-1">{field.error}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="bg-yellow-500 text-black hover:underline py-3 px-10 font-bold rounded-lg text-lg block w-full text-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SIGN UP WITH EMAIL"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-lg mt-4 font-semibold">
            🎉 Signup Successful! Redirecting to login...
          </p>
        )}

        <p className="text-gray-500 text-xs mt-10">
          {termsData.content}{" "}
          <span className="text-blue-500 underline">{termsData.terms}</span> &{" "}
          <span className="text-blue-500 underline">{termsData.privacy}</span>
        </p>
      </div>
    </div>
  );
}