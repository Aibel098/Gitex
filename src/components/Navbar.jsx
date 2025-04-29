import { Bell, Lock } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { AuthButton, ArrowButton, Logo, CustomLink, ButtonWithIcon } from "../components/ReusableButton";

const Navbar = () => {
  const welcomeMessages = {
    message1: "Hey there, glad you're back!",
    message2: "Hello Guest,",
    logoFirstLetter:'G',
    logoName:'Gitex'
    
  };
  return (
    // Fixed Header
    <>
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md border-b-4 border-yellow-400 bg-yellow-500">
      <h1 className="text-xl font-bold text-gray-800">{welcomeMessages.logoName}</h1>
      <div className="flex space-x-3">
      <ButtonWithIcon
          Icon={Bell}  // Pass the actual icon component here
          href="RideRequest"
          badgeCount={4}
          navigateLink="/RideRequest"  // Specify the navigation link
        />
       <ButtonWithIcon
          Icon={Lock}  // Pass the actual icon component here
          href="RideRequest"
          badgeCount={3}
          navigateLink="/ChatScreen"  // Specify the navigation link
        />
      </div>
    </div>
     {/* Scrollable Content */}
     <div className="w-full overflow-y-auto max-h-[calc(100vh-64px)] bg-yellow-500">
     <div className="w-full p-4 bg-yellow-500">
       <div className="flex items-center space-x-4">
         <div className="w-12 h-12 bg-gray-300 text-yellow-500 text-[30px] flex items-center justify-center font-bold rounded-full">
         {welcomeMessages.logoFirstLetter}
         </div> 
         <div>
           <h2 className="text-lg font-bold text-gray-100">{welcomeMessages.message1}</h2>
           <h1 className="text-xl font-bold text-white">{welcomeMessages.message2}</h1>
         </div>
       </div>
     </div>
   </div>
   </>
  );
};

export default Navbar;
