"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Swal from 'sweetalert2';

const Signup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register form state
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword, rememberMe }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.status === 404) {
        throw new Error('Login endpoint not found. Please check if the backend is running on http://localhost:5000.');
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${data.user.username}!`,
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/HomeScreen");
    } catch (err) {
      const errorMessage = err.name === 'AbortError'
        ? 'Request timed out. Please check if the backend is running on http://localhost:5000.'
        : err.message || 'Failed to connect to the server. Please check if the backend is running.';
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (registerPassword !== confirmPassword) {
      await Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Passwords do not match',
      });
      setLoading(false);
      return;
    }
    if (!terms) {
      await Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'You must agree to the terms',
      });
      setLoading(false);
      return;
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email: registerEmail,
          password: registerPassword,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.status === 404) {
        throw new Error('Signup endpoint not found. Please check if the backend is running on http://localhost:5000.');
      }
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('Response text:', text);
        throw new Error('Invalid server response. Please check if the backend is configured correctly.');
      }
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: `Welcome, ${data.user.username}! Please log in.`,
        timer: 1500,
        showConfirmButton: false,
      });
      setActiveTab("login");
      setName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
      setTerms(false);
    } catch (err) {
      const errorMessage = err.name === 'AbortError'
        ? 'Request timed out. Please check if the backend is running on http://localhost:5000.'
        : err.message || 'Failed to connect to the server. Please check if the backend is running.';
      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
      });
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-16 min-h-[calc(100vh-80px)]" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden" data-aos="zoom-in">
          <div className="bg-orange-500 py-4 px-6">
            <h2 className="text-2xl font-extrabold text-white">Welcome to Gitex</h2>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 text-sm font-semibold ${
                  activeTab === "login"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Sign In
              </button>
              <button
                className={`px-4 py-2 text-sm font-semibold ${
                  activeTab === "register"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Sign Up
              </button>
            </div>

            {/* Login Tab */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                    <label htmlFor="remember-me" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600 hover:scale-105"
                  }`}
                  disabled={loading}
                  aria-label="Sign in"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("register")}
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Register Tab */}
            {activeTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="register-password"
                      type={showRegisterPassword ? "text" : "password"}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                      >
                        {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      required
                      disabled={loading}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 mb-6">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 mt-1 rounded border-gray-300"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    required
                    disabled={loading}
                    aria-required="true"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600 hover:scale-105"
                  }`}
                  disabled={loading}
                  aria-label="Create account"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;