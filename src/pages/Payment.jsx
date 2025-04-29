import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus, FaCheckCircle, FaEthereum } from "react-icons/fa";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";

const paymentMethods = [
  { id: "card", icon: FaCreditCard, label: "Visa **** 4242", subtext: "Exp: 12/25", color: "text-gray-700" },
  { id: "paypal", icon: FaPaypal, label: "PayPal", subtext: "", color: "text-blue-500" },
  { id: "cash", icon: FaMoneyBillWave, label: "Cash", subtext: "", color: "text-green-500" },
  { id: "ethereum", icon: FaEthereum, label: "Ethereum (ETH)", subtext: "Pay with MetaMask", color: "text-purple-500" },
];

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const navigate = useNavigate();

  // Initialize Web3 and connect to MetaMask
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);

          // Listen for account changes
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0] || null);
          });
        } catch (err) {
          setError("Failed to connect to MetaMask. Please ensure it is installed and unlocked.");
        }
      } else {
        setError("MetaMask is not installed. Please install MetaMask to use Ethereum payments.");
      }
    };

    initWeb3();
  }, []);

  // Handle Ethereum payment
  const handleEthereumPayment = async () => {
    if (!web3 || !account) {
      setError("Please connect to MetaMask first.");
      return;
    }

    try {
      const recipientAddress = "YOUR_RECIPIENT_ADDRESS"; // Replace with your wallet address
      const amountInEther = "0.01"; // Example: 0.01 ETH (adjust as needed)

      const transactionParameters = {
        from: account,
        to: recipientAddress,
        value: web3.utils.toWei(amountInEther, "ether"),
        gas: "21000", // Standard gas limit for ETH transfer
      };

      const txHash = await web3.eth.sendTransaction(transactionParameters);
      setTransactionHash(txHash.transactionHash);
      setError("");
      alert(`Payment successful! Transaction hash: ${txHash.transactionHash}`);
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
    }
  };

  // Handle payment method selection
  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    if (methodId === "ethereum") {
      handleEthereumPayment();
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="relative bg-white shadow-md p-4 flex items-center">
        <button onClick={() => window.history.back()} className="text-xl text-gray-600">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-center flex-1">Payment Methods</h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mx-4 mt-4">
          {error}
        </div>
      )}

      {/* Transaction Confirmation */}
      {transactionHash && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg mx-4 mt-4">
          Transaction successful! Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="underline">{transactionHash.slice(0, 10)}...</a>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="flex-1 p-4 space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
              selectedMethod === method.id ? "border-black bg-gray-200" : "border-gray-300 bg-white"
            }`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className="flex items-center gap-3">
              <method.icon className={`${method.color} text-xl`} />
              <div>
                <p className="font-semibold text-gray-800">{method.label}</p>
                {method.subtext && <p className="text-gray-500 text-sm">{method.subtext}</p>}
              </div>
            </div>
            {selectedMethod === method.id && <FaCheckCircle className="text-green-500 text-lg" />}
          </div>
        ))}
      </div>

      {/* Add New Payment Method */}
      <div className="p-4 bg-white shadow-md">
        <button
          onClick={() => navigate("/AddPayment")}
          className="flex items-center justify-center gap-2 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition"
        >
          <FaPlus /> Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default Payment;