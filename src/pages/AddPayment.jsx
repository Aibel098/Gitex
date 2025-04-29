import React, { useState } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";

const AddPayment = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
      valid = false;
    }
    if (!/^[0-9]{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
      valid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
      newErrors.expiry = "Enter a valid expiry date (MM/YY)";
      valid = false;
    }
    if (!/^[0-9]{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Payment Submitted Successfully!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xl rounded-2xl p-8 mt-10 text-white relative">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 text-white hover:text-gray-300">
        <ArrowLeft size={24} />
      </button>
      <div className="flex items-center justify-center mb-6">
        <CreditCard size={50} className="text-white" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">Add Payment Method</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold">Cardholder Name</label>
          <input
            type="text"
            className="w-full p-3 bg-white text-gray-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          {errors.cardName && <p className="text-yellow-300 text-sm mt-1">{errors.cardName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold">Card Number</label>
          <input
            type="text"
            className="w-full p-3 bg-white text-gray-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
          />
          {errors.cardNumber && <p className="text-yellow-300 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold">Expiry Date</label>
            <input
              type="text"
              className="w-full p-3 bg-white text-gray-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-400"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
            />
            {errors.expiry && <p className="text-yellow-300 text-sm mt-1">{errors.expiry}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold">CVV</label>
            <input
              type="text"
              className="w-full p-3 bg-white text-gray-800 border-none rounded-lg focus:ring-2 focus:ring-indigo-400"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
            />
            {errors.cvv && <p className="text-yellow-300 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={() => setSaveCard(!saveCard)}
            className="w-5 h-5 text-indigo-500 focus:ring-indigo-400 border-none rounded-md"
          />
          <label className="text-sm">Save this card for future payments</label>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg hover:bg-indigo-500 hover:text-white transition"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default AddPayment;