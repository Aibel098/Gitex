# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Gitex Driver App
Overview
The Gitex Driver App is a React-based web application designed for drivers to manage ride-sharing and delivery services. The app provides features such as user authentication, ride booking, real-time tracking, payment processing, and profile management. It integrates with a backend API for user authentication and leverages local storage for persisting user data.
Features

User Authentication: Sign up, log in, and password recovery with email verification.
Ride Management: Book rides, select intercity trips, schedule rides, or rent vehicles.
Real-time Tracking: Track rides in real-time with location services.
Payment Processing: Add and validate payment methods securely.
Profile Management: Edit user profiles, including name, email, phone, and profile picture.
Promo Codes: Apply discounts using promo codes.
Ride History: View past rides with details like date, time, price, and status.
Support: Access FAQs, live chat, call, or email support.
Dark Mode: Toggle between light and dark themes for better usability.

Technologies Used

Frontend: React, React Router, Redux (for state management), Tailwind CSS
Icons: Lucide React, React Icons
Notifications: SweetAlert2 (Swal)
Local Storage: For persisting user data and settings
Backend: Assumes a REST API running on http://localhost:5000 (not included in the provided code)

Prerequisites

Node.js (v14 or higher)
npm or Yarn
A backend server running on http://localhost:5000 with /api/auth/login and /api/auth/signup endpoints

Installation

Clone the Repository:
git clone <repository-url>
cd gitex-driver-app


Install Dependencies:
npm install

or
yarn install


Set Up Environment Variables:

Create a .env file in the root directory.
Add the following:REACT_APP_PUBLIC_URL=/path/to/your/public/folder




Run the Application:
npm start

or
yarn start

The app will run on http://localhost:3000.


Usage

Splash Screen: On launch, the app displays a splash screen for 3 seconds before redirecting to the home screen.
Sign Up/Login:
Navigate to the signup page to create an account or log in with existing credentials.
The app validates inputs and communicates with the backend API.


Home Screen: Select ride categories (Ride, Intercity, Package, Schedule, Rental) to book services.
Location Services: Enable location to find nearby requests or manually input pickup/drop-off details.
Payment: Add a payment method with card validation.
Chat: Communicate with passengers via text, voice, or video calls.
Settings: Manage profile, saved locations, promo codes, payments, and app preferences.

Key Components

AcceptJobScreen: Displays a slideshow introducing job acceptance, tracking, and rewards.
AddPayment: Form to add and validate payment methods.
Address: Manage saved addresses with local storage persistence.
Signup: Handles user registration and login with backend integration.
ChatScreen: Real-time chat with bot responses and call functionality.
EarnMoneyScreen: Promotes earning rewards for completing jobs.
EnableLocationScreen: Prompts users to enable location services.
History: Lists past rides with filtering by status.
HomeScreen: Main dashboard with ride categories and navigation.
IntercityLocation: Input form for intercity ride bookings.
Location: Dynamic form for ride, package, schedule, or rental bookings.
MobileNumber: Phone number input with country code selection.
PromoCode: Apply and manage promo codes with validation.
EditProfile: Update user profile details and upload profile pictures.
VerifyCode: Input verification code sent via SMS.
Setting: Manage app settings, wallet balance, and account options.
SignUp: Redux-based signup form with advanced validation.
SplashScreen: Initial loading screen with logo and app name.
Support: Access various support channels.
TrackingRealtimeScreen: Displays real-time tracking information.
ForgotPassword: Email-based password recovery.

Notes

Backend Dependency: The app requires a backend server for authentication (/api/auth/login and /api/auth/signup). Ensure the server is running and endpoints are correctly configured.
Image Assets: Place image files (e.g., AccecptJob.png, tracking_icon.png) in the public/Logo directory as referenced in the code.
Security: Passwords are sent in plain text to the backend in the provided code. In a production environment, implement HTTPS and hash passwords before transmission.
Testing: Test API connectivity and form validations thoroughly, as the app assumes a specific backend response structure.

Troubleshooting

Backend Errors: If you see "Request timed out" or "Endpoint not found," verify that the backend server is running on http://localhost:5000.
Image Not Found: Ensure all images are correctly placed in the public/Logo directory.
Navigation Issues: Clear local storage if navigation behaves unexpectedly (localStorage.clear() in the browser console).

Future Improvements

Add unit tests using Jest and React Testing Library.
Implement proper error handling for network failures.
Enhance accessibility (ARIA labels, keyboard navigation).
Integrate a real-time map API (e.g., Leaflet, Google Maps) for location tracking.
Add multi-language support.

License
This project is for demonstration purposes. Ensure compliance with any third-party library licenses (e.g., React, SweetAlert2).
