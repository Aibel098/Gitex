import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

const slides = [
  {
    image: "/Logo/AccecptJob.png",
    title: "Accept a Job",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "/Logo/tracking_icon.png",
    title: "Track Your Job",
    description: "Keep an eye on real-time updates and job progress.",
  },
  {
    image: "/Logo/earn-money.png",
    title: "Earn Rewards",
    description: "Complete jobs and earn exclusive rewards.",
  },
];

const AcceptJobScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else {
        navigate("/EnableLocationScreen"); // Redirect after the last slide
      }
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to prevent issues
  }, [currentSlide, navigate]);

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-white transition-all duration-500">
      {/* Image */}
      <div className="mt-12">
        <img
          src={`${process.env.PUBLIC_URL}${slides[currentSlide].image}`}
          alt={slides[currentSlide].title}
          className="w-50"
        />
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {slides[currentSlide].title}
        </h2>
        <p className="text-gray-600 mt-2 px-4">{slides[currentSlide].description}</p>
      </div>

      {/* Navigation Dots & Skip Button */}
      <div className="flex flex-col items-center mb-6">
        
        <CustomLink to="/EnableLocationScreen" text="Skip" className="text-gray-400 text-sm mb-4 hover:underline" />
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptJobScreen;
