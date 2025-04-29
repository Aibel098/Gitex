import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Logo} from "../components/ReusableButton"; // ✅ Import Reusable Logo Component

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect after 3 seconds (3000ms)
    const timer = setTimeout(() => {
      navigate("/PassengerHome");
    }, 3000);

    return () => clearTimeout(timer); // ✅ Cleanup timeout when unmounted
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-400 relative">
      {/* Background Skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-yellow-500 to-transparent"></div>

      <div className="text-center">
        {/* ✅ Clickable Logo (Optional) */}
        <Logo className="w-60 mb-12" />

        {/* App Name */}
        <h1 className="text-2xl font-semibold text-black">Gitex Driver</h1>
      </div>
    </div>
  );
}
