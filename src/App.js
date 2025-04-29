import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Lazy Load Pages
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const PassengerHome = lazy(() => import("./pages/PassengerHome"));
const SignUp = lazy(() => import("./pages/SignUp"));
const HomeScreen = lazy(() => import("./pages/HomeScreen"));
const ProfileCard = lazy(() => import("./pages/ProfileCard"));
const MobileNumber = lazy(() => import("./pages/MobileNumber"));
const SendOTP = lazy(() => import("./pages/SendOTP"));
const PassengerLogin = lazy(() => import("./pages/PassengerLogin"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AcceptJobScreen = lazy(() => import("./pages/AcceptJobScreen"));
const TrackingRealtime = lazy(() => import("./pages/TrackingRealtime"));
const EarnMoneyScreen = lazy(() => import("./pages/EarnMoneyScreen"));
const EnableLocationScreen = lazy(() => import("./pages/EnableLocationScreen"));
const RideRequest = lazy(() => import("./pages/RideRequest"));
const RideRequestAccept = lazy(() => import("./pages/RideRequestAccept"));
const RideDetail = lazy(() => import("./pages/RideDetail"));
const PickUpRide = lazy(() => import("./pages/PickUpRide"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const Payment = lazy(() => import("./pages/Payment"));
const AddPayment = lazy(() => import("./pages/AddPayment"));
const Setting = lazy(() => import("./pages/Setting"));
const History = lazy(() => import("./pages/History"));
const Support = lazy(() => import("./pages/Support"));
const PromoCode = lazy(() => import("./pages/PromoCode"));
const Address = lazy(() => import("./pages/Address"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const Service = lazy(() => import("./pages/Service"));
const ChatScreen = lazy(() => import("./pages/ChatScreen"));
const Location = lazy(() => import("./pages/Location"));
const MyRide = lazy(() => import("./pages/MyRide"));
const AddPage = lazy(() => import("./pages/AddPages"));
const InterCity = lazy(() => import("./pages/InterCity"));
const Package = lazy(() => import("./pages/Package"));
const Rental = lazy(() => import("./pages/Rental"));
const Scheduled = lazy(() => import("./pages/Scheduled"));
const Authsignup = lazy(() => import("./pages/Authsignup"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >

        <Routes>
          <Route path="/Authsignup" element={<Authsignup />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/ProfileCard" element={<ProfileCard />} />
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route path="/PassengerHome" element={<PassengerHome />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/MobileNumber" element={<MobileNumber />} />
          <Route path="/SendOTP" element={<SendOTP />} />
          <Route path="/PassengerLogin" element={<PassengerLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/AcceptJobScreen" element={<AcceptJobScreen />} />
          <Route path="/TrackingRealtime" element={<TrackingRealtime />} />
          <Route path="/EarnMoneyScreen" element={<EarnMoneyScreen />} />
          <Route path="/EnableLocationScreen" element={<EnableLocationScreen />} />
          <Route path="/RideRequest" element={<RideRequest />} />
          <Route path="/RideRequestAccept" element={<RideRequestAccept />} />
          <Route path="/RideDetail" element={<RideDetail />} />
          <Route path="/PickUpRide" element={<PickUpRide />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ProfileEdit" element={<ProfileEdit />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/AddPayment" element={<AddPayment />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/History" element={<History />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/PromoCode" element={<PromoCode />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/AddAddress" element={<AddAddress />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/ChatScreen" element={<ChatScreen />} />
          <Route path="/AddPages" element={<AddPage />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/MyRide" element={<MyRide />} />
          <Route path="/InterCity" element={<InterCity />} />
          <Route path="/Package" element={<Package />} />
          <Route path="/Rental" element={<Rental />} />
          <Route path="/Scheduled" element={<Scheduled />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
