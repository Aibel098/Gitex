import { Link , useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export  { AuthButton, ArrowButton, Logo, CustomLink, CategoryItem, ButtonWithIcon,LocationButtonWithIcon,BackButton };

 
const AuthButton = ({ text, bgColor = "bg-blue-700", textColor = "text-white", boldText = "", navigateLink = "" }) => {
  const navigate = useNavigate(); //  Use React Router's navigate function

  return (
    <button 
      onClick={() => navigate(navigateLink)} //  Correctly call navigate
      className={`w-full py-4 mt-3 text-center text-xl rounded-lg mb-3 ${bgColor} ${textColor} ${boldText} outline-none`}
    >
      {text}
    </button>
  );
};

 const ArrowButton = () => {
  return (
    <button onClick={() => window.history.back()} className="absolute top-4 left-4 text-gray-600 text-xl cursor-pointer">
      ←
    </button>
  );
};

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Correct way to navigate back
      className="absolute top-4 left-4 text-gray-700 text-2xl cursor-pointer"
    >
      <FaArrowLeft />
    </button>
  );
};

 const Logo = ({ className = "w-50 mx-auto mb-10" }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/Logo/logo.svg`}
      alt="App Logo"
      className={className}
    />
  );
 };



const CustomLink = ({ to, text, className }) => {
  return (
    <Link 
  to={to} style={{ textDecoration: "none" }}
  className={`mt-4 no-underline outline-none focus:outline-none focus:ring-0 ${className}`}
>
  {text}
</Link>
  );
};





const CategoryItem = ({ icon: Icon, label, bgColor }) => (
  <div className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md ${bgColor}`}>
    <Icon className="text-3xl text-gray-700" />
    <span className="text-gray-800 font-semibold mt-2">{label}</span>
  </div>
);


const ButtonWithIcon = ({Icon={}, href, badgeCount = 0 , navigateLink }) => {
  const navigate = useNavigate();
  return (
    <a href={href} onClick={(e) => { e.preventDefault(); navigate(navigateLink); }}>
    <button className="relative p-2 bg-gray-200 rounded-full">
      <Icon size={20} className="text-gray-600" /> {/* Render icon here */}
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {badgeCount}
        </span>
      )}
    </button>
  </a>
  );
};

const LocationButtonWithIcon = ({ text, icon: Icon, bgColor = "bg-yellow-400", textColor = "text-white" }) => {
  return (
    <button className={`flex-1 ${bgColor} ${textColor} p-3 mr-2 rounded-lg flex items-center justify-center`}>
      {Icon && <Icon className="mr-2" />} {text}
    </button>
  );
};

export default ButtonWithIcon;






