import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { RadioGroup } from "@headlessui/react";
import { User, Users, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import Web3 from "web3";
import "leaflet/dist/leaflet.css";

const contacts = [
  "Bal Check Urdu", "Police Helpline", "Fire Brigade", "PTCL Inquiry", 
  "Card Load Eng", "Voice Mail", "Edhi Center", "Bal Check Eng", 
  "Call Center", "Rail Inquiry"
];

export default function PickUpRide() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingData } = state || {};
  const [fare, setFare] = useState("");
  const [modals, setModals] = useState({
    payment: false,
    myselfOptions: false,
    contactList: false,
  });
  const [selected, setSelected] = useState("Myself");
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  // Initialize Web3
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
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

  const toggleModal = (key) => {
    setModals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Ethereum payment
  const handleEthereumPayment = async () => {
    if (!web3 || !account) {
      setError("Please connect to MetaMask first.");
      return null;
    }

    try {
      const recipientAddress = "YOUR_RECIPIENT_ADDRESS"; // Replace with your wallet address
      const amountInEther = (parseFloat(fare) / 1000000).toString(); // Example: Convert fare to ETH

      const transactionParameters = {
        from: account,
        to: recipientAddress,
        value: web3.utils.toWei(amountInEther, "ether"),
        gas: "21000",
      };

      const txHash = await web3.eth.sendTransaction(transactionParameters);
      setTransactionHash(txHash.transactionHash);
      setError("");
      return txHash.transactionHash;
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      return null;
    }
  };

  // Handle Book Ride
  const handleBookRide = async () => {
    if (!fare || !bookingData) {
      setError("Please enter a fare and ensure booking data is available.");
      return;
    }

    const userId = "anonymous";
    const bookingId = bookingData.bookingId;
    const updatedBookingData = {
      ...bookingData,
      fare,
      payment_method: transactionHash ? "ethereum" : "pending",
      transaction_hash: transactionHash || null,
    };

    try {
      await fetch(`https://gitex-5319f-default-rtdb.firebaseio.com/users/${userId}/bookings/${bookingId}.json`, {
        method: "PUT",
        body: JSON.stringify(updatedBookingData),
      });
      navigate("/confirmation"); // Assumes a confirmation route exists
    } catch (err) {
      setError("Failed to book ride.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Map Section */}
      <div className="w-full h-[60vh] relative ">
        <MapContainer center={[24.8762, 67.158]} zoom={12} className="w-full h-full rounded-b-2xl z-[1]">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={[[24.8925, 67.2066], [24.8607, 67.0104]]} color="green" />
          <Marker position={[24.8925, 67.2066]} />
          <Marker position={[24.8607, 67.0104]} />
        </MapContainer>
      </div>

      {/* Booking UI */}
      <div className="w-full max-w-md bg-white p-6 rounded-t-2xl shadow-lg -mt-6 border-t z-[99]">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}
        {transactionHash && (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-4">
            Transaction successful! Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="underline">{transactionHash.slice(0, 10)}...</a>
          </div>
        )}
        <h2 className="text-lg font-semibold text-gray-800">Vehicle Type</h2>
        <label className="block text-sm text-gray-500 mt-2">Offer Your Fare</label>
        <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
          <span className="text-gray-400">💲</span>
          <input type="number" value={fare} onChange={(e) => setFare(e.target.value)} placeholder="Enter Fare Amount" className="w-full outline-none pl-2 text-gray-700" />
        </div>
        <p className="text-gray-500 text-sm mt-1">0.0 - 0.0 - Recommended Price</p>

        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg font-medium" onClick={() => toggleModal("payment")}>💳 Payment</button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg font-medium" onClick={() => toggleModal("myselfOptions")}>🧑 Myself</button>
        </div>
        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold mt-5" onClick={handleBookRide}>
          Book Ride
        </button>
      </div>

      {/* Myself Options Modal */}
      {modals.myselfOptions && <MyselfOptions selected={selected} setSelected={setSelected} toggleModal={toggleModal} modals={modals} />}

      {/* Payment Modal */}
      {modals.payment && <PaymentModal toggleModal={toggleModal} handleEthereumPayment={handleEthereumPayment} />}
    </div>
  );
}

const MyselfOptions = ({ selected, setSelected, toggleModal, modals }) => (
  <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t z-[99]">
    {modals.contactList ? (
      <ContactList toggleModal={toggleModal} />
    ) : (
      <div>
        <h3 className="text-lg font-semibold">Someone else taking this ride?</h3>
        <p className="text-sm text-gray-500">Choose a contact to receive driver details & ride OTP.</p>
        <RadioGroup value={selected} onChange={setSelected} className="mt-4 space-y-2">
          <RadioGroup.Option value="Myself">{({ checked }) => (
            <OptionItem checked={checked} label="Myself" Icon={User} />
          )}</RadioGroup.Option>
          <RadioGroup.Option value="Choose Another Contact">{({ checked }) => (
            <OptionItem checked={checked} label="Choose Another Contact" Icon={Users} onClick={() => toggleModal("contactList")} />
          )}</RadioGroup.Option>
          <a href="ChatScreen"><button className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold mt-3">
            Message
          </button></a>
        </RadioGroup>
        <button className="mt-4 w-full py-2 bg-gray-200 rounded-lg" onClick={() => toggleModal("myselfOptions")}>Close</button>
      </div>
    )}
  </motion.div>
);

const OptionItem = ({ checked, label, Icon, onClick }) => (
  <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-300" onClick={onClick}>
    <Icon className="h-5 w-5 text-green-500" />
    <span className="text-sm text-green-500">{label}</span>
    <span className={`ml-auto h-5 w-5 border-2 rounded-full ${checked ? 'border-green-500 bg-green-500' : 'border-gray-300'}`} />
  </div>
);

const ContactList = ({ toggleModal }) => (
  <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="p-4 z-[99]">
    <div className="flex justify-between items-center p-4 border-b">
      <button onClick={() => toggleModal("contactList")}><ChevronLeft className="h-6 w-6" /></button>
      <h3 className="text-lg font-semibold">Choose Contact</h3>
      <button className="text-green-500"><Users className="h-6 w-6" /></button>
    </div>
    <ul className="divide-y divide-gray-200">
      {contacts.map((contact, index) => (
        <li key={index} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
          <User className="h-6 w-6 text-gray-500" />
          <span className="text-sm">{contact}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const PaymentModal = ({ toggleModal, handleEthereumPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = async (method) => {
    setSelectedPayment(method);
    if (method === "ethereum") {
      await handleEthereumPayment();
    }
  };

  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t z-[99]">
      <div className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg rounded-t-2xl border-t">
        <h2 className="text-lg font-semibold">Select Payment Method</h2>
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" onClick={() => handlePaymentSelect("credit")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Credit Card" className="w-8 h-8" />
            Credit Card
            <input type="radio" name="payment" checked={selectedPayment === "credit"} readOnly className="ml-auto" />
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" onClick={() => handlePaymentSelect("paypal")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-8 h-8" />
            PayPal
            <input type="radio" name="payment" checked={selectedPayment === "paypal"} readOnly className="ml-auto" />
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" onClick={() => handlePaymentSelect("google")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Pay" className="w-8 h-8" />
            Google Pay
            <input type="radio" name="payment" checked={selectedPayment === "google"} readOnly className="ml-auto" />
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" onClick={() => handlePaymentSelect("ethereum")}>
            <FaEthereum className="w-8 h-8 text-purple-500" />
            Ethereum (ETH)
            <input type="radio" name="payment" checked={selectedPayment === "ethereum"} readOnly className="ml-auto" />
          </label>
          <button className="mt-4 w-full py-2 bg-gray-200 rounded-lg" onClick={() => toggleModal("payment")}>Close</button>
        </div>
      </div>
    </motion.div>
  );
};