import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag, FaCheckCircle, FaTimesCircle, FaGift } from "react-icons/fa";

const PromoCode = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState("");

  // Sample promo codes
  const promoCodes = [
    { code: "UBER50", discount: "50% OFF", expiry: "March 31, 2025" },
    { code: "SAVE20", discount: "$20 OFF", expiry: "April 10, 2025" },
    { code: "FIRST10", discount: "10% OFF", expiry: "April 5, 2025" },
  ];

  useEffect(() => {
    const storedPromo = JSON.parse(localStorage.getItem("appliedPromo"));
    if (storedPromo) {
      setPromoCode(storedPromo.code);
      setApplied(true);
      setAppliedDiscount(storedPromo.discount);
    }
  }, []);

  const handleApply = () => {
    const validCode = promoCodes.find((p) => p.code === promoCode.trim().toUpperCase());

    if (promoCode.trim() === "") {
      setError("⚠️ Please enter a promo code.");
      setApplied(false);
    } else if (!validCode) {
      setError("❌ Invalid or expired promo code.");
      setApplied(false);
    } else {
      setError("");
      setApplied(true);
      setAppliedDiscount(validCode.discount);
      localStorage.setItem("appliedPromo", JSON.stringify(validCode));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black text-white p-5 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="text-2xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center">Apply Promo Code</h2>
      </div>

      {/* Promo Code Input */}
      <div className="flex flex-col flex-1 justify-center items-center p-6">
        <div className="bg-white shadow-lg p-4 rounded-full flex items-center gap-3 border-2 border-gray-300 w-full max-w-lg">
          <FaTag className="text-yellow-500 text-2xl" />
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 text-lg bg-transparent border-none outline-none p-2"
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className={`w-full max-w-lg mt-4 text-lg font-semibold py-3 rounded-full transition ${
            promoCode.trim() ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!promoCode.trim()}
        >
          Apply Code
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-full flex items-center gap-2 mt-4 max-w-lg">
            <FaTimesCircle className="text-red-500 text-lg" />
            <p>{error}</p>
          </div>
        )}

        {/* Success Message */}
        {applied && (
          <div className="bg-green-100 text-green-600 px-4 py-3 rounded-full flex items-center gap-2 mt-4 max-w-lg">
            <FaCheckCircle className="text-green-500 text-lg" />
            <p>✅ Promo code applied! You got {appliedDiscount}.</p>
          </div>
        )}

        {/* Available Promo Codes */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8">Available Promo Codes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-4">
          {promoCodes.map((promo, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-xl flex items-center justify-between border-2 border-gray-300 cursor-pointer hover:border-yellow-500 transition"
              onClick={() => setPromoCode(promo.code)}
            >
              <div className="flex items-center gap-3">
                <FaGift className="text-gray-500 text-2xl" />
                <div>
                  <p className="font-semibold text-gray-900">{promo.code}</p>
                  <p className="text-gray-600 text-sm">{promo.discount} • Expires: {promo.expiry}</p>
                </div>
              </div>
              <button className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full hover:bg-yellow-600 transition">Use</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
