# Welcome to your Expo app# Bus Tracking Mobile App - Frontend

A React Native mobile application built with Expo for tracking college buses in real-time.

## Features

- **Splash Screen** - College logo with 4-second display
- **Authentication** - Student login using email and PRN
- **Forgot Password** - OTP-based password reset via email
- **Home Dashboard** - Tabbed navigation with 4 main sections:
  - **Bus Details** - View bus info, driver details, and status
  - **Map** - Live bus tracking with user location
  - **ETA** - Estimated arrival time at student's bus stop
  - **My Account** - Profile info and password change

## Tech Stack

- React Native with Expo
- React Navigation (Stack & Bottom Tabs)
- React Native Maps for location tracking
- Lucide React Native for icons
- Toast notifications for user feedback
- AsyncStorage for token management

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Backend URL**
   Update the API_BASE_URL in `services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://your-backend-url:3000/api';
   ```

3. **Start Development Server**
   ```bash
   npx expo start
   ```

4. **Run on Device/Emulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Project Structure

```
frontend/
├── app/
│   ├── index.tsx          # Main app entry point
│   └── _layout.tsx        # App layout configuration
├── screens/
│   ├── SplashScreen.js    # 4-second splash screen
│   ├── LoginScreen.js     # Email + PRN login
│   ├── ForgotPasswordScreen.js # 3-step password reset
│   ├── HomeScreen.js      # Tabbed navigation container
│   └── tabs/
│       ├── BusDetailsTab.js    # Bus and driver information
│       ├── MapTab.js           # Live bus tracking map
│       ├── ETATab.js           # Arrival time estimation
│       └── MyAccountTab.js     # Profile and settings
├── components/
│   ├── Banner.js          # College header banner
│   ├── Footer.js          # Developer credits footer
│   ├── CustomButton.js    # Animated button component
│   └── CustomInput.js     # Enhanced input with validation
├── services/
│   └── api.js            # Backend API integration
├── constants/
│   └── Colors.js         # App color scheme
└── assets/
    └── images/           # App icons and logos
```

## Color Scheme

- **Primary**: #1e3a8a (Deep Blue)
- **Accent**: #f59e0b (Amber)
- **Background**: #ffffff (White)
- **Button**: #2563eb (Blue)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)

## Test Credentials

Use these credentials to test the app (ensure backend is seeded):

- **Email**: atharva.pawar@college.edu | **PRN**: PRN001
- **Email**: yash.mulay@college.edu | **PRN**: PRN002
- **Email**: vaishnavi.hajare@college.edu | **PRN**: PRN003
- **Email**: tanvi.patil@college.edu | **PRN**: PRN004

## Key Features Implementation

### Authentication Flow
- JWT token-based authentication
- Secure token storage with AsyncStorage
- Auto-logout on token expiration

### Real-time Tracking
- Live bus location updates every 30 seconds
- User location tracking with permissions
- Interactive map with custom markers

### UX Enhancements
- Smooth animations and transitions
- Pull-to-refresh functionality
- Toast notifications for all actions
- Loading states and error handling

## Development Team

Created with ❤️ by:
- Atharva Pawar
- Yash Mulay  
- Vaishnavi Hajare
- Tanvi Patil
