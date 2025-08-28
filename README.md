# Bus Tracking Mobile Application

A comprehensive Bus Tracking Mobile Application built with React Native (Expo) for the frontend and Node.js + Express + MySQL for the backend.

## 🚌 Features

### Core Functionality
- **Student Authentication** - Login using Email ID and PRN number (no password reset flow)
- **Splash Screen** - 4-second intro with college SVG logo
- **Real-time Bus Tracking** - Live GPS location updates
- **ETA Calculation** - Estimated arrival times at bus stops
- **Bus Information** - Driver details, bus number, and status
- **Account Management** - Profile viewing and logout

### Technical Features
- JWT-based authentication
- Real-time location tracking
- Interactive maps with custom markers
- Toast notifications for user feedback
- Smooth animations and transitions
- Pull-to-refresh functionality
- Safe-area aware bottom tab bar
- Responsive design with modern UI

## 🏗️ Architecture

```
React_Native_App/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # API route handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Sequelize database models
│   ├── routes/             # API route definitions
│   ├── seeders/            # Database seed data
│   └── server.js          # Main server file
└── frontend/              # React Native + Expo app
    ├── app/                # Expo Router entry
    ├── screens/            # App screens and tabs (e.g., SplashScreen, Login, Home tabs)
    ├── components/         # Reusable UI components (e.g., Banner)
    ├── services/           # API service layer
    ├── constants/          # App constants and colors
    └── assets/             # Images and static assets (logo.svg)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio/Xcode (for emulators)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Update `.env` file with your settings:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=bus_tracking_db
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE bus_tracking_db;
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Seed database (optional)**
   ```javascript
   const { seedDatabase } = require('./seeders/seedData');
   seedDatabase();
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL**
   In `frontend/services/api.js`, update the backend URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

4. **Start Expo development server**
   ```bash
   npx expo start
   ```

5. **Run on device/emulator**
   - Scan QR code with Expo Go app
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## 🎨 Design System

### Color Palette
- **Primary**: #1e3a8a (Deep Blue)
- **Accent**: #f59e0b (Amber)
- **Background**: #ffffff (White)
- **Button**: #2563eb (Blue)
- **Success**: #10b981 (Green)
- **Error**: #ef4444 (Red)

### UI Components
- Custom animated buttons with scaling effects
- Enhanced input fields with validation
- Toast notifications for user feedback
- Consistent spacing and typography
- Shadow effects and smooth transitions
- Consistent branding: Banner and Splash use `assets/images/logo.svg` and college name

## 📱 App Screens

### Authentication Flow
1. **Splash Screen** - “KIT's College of Engineering, Kolhapur” with SVG logo (4 seconds)
2. **Login Screen** - Email + PRN authentication

### Main Application
3. **Home Screen** - Tabbed navigation with safe-area aware bottom tabs:
   - **Bus Details Tab** - Bus info, driver details, status
   - **Map Tab** - Live tracking with user/bus locations
   - **ETA Tab** - Arrival time estimation
   - **My Account Tab** - Profile and settings (includes credit text at bottom)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Student login

### Bus Information
- `GET /api/bus/details` - Get bus details
- `GET /api/bus/location` - Get bus location
- `GET /api/bus/eta` - Get estimated arrival time
- `POST /api/bus/update-location` - Update bus location (admin)

Notes:
- Login response includes nested associations: `student.bus` with `bus.driver`.

## 🧪 Test Credentials

Use these credentials after seeding the database:

| Email | PRN | Name |
|-------|-----|------|
| atharva.pawar@college.edu | PRN001 | Atharva Pawar |
| yash.mulay@college.edu | PRN002 | Yash Mulay |
| vaishnavi.hajare@college.edu | PRN003 | Vaishnavi Hajare |
| tanvi.patil@college.edu | PRN004 | Tanvi Patil |

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT tokens
- **Email**: Nodemailer (optional; not used for OTP)

### Frontend
- **Framework**: React Native with Expo & Expo Router
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Maps**: React Native Maps
- **Icons**: Lucide React Native
- **SVG**: react-native-svg (for `logo.svg`)
- **Safe Area**: react-native-safe-area-context
- **Storage**: AsyncStorage
- **Notifications**: React Native Toast Message

## 🔒 Security Features

- JWT token-based authentication
- Input validation and sanitization
- Secure token storage
- API rate limiting considerations

Authentication uses email + PRN verification without a password reset flow.

## 📋 Development Notes

### Known Issues
- Some TypeScript lint errors for missing module declarations (non-blocking)
- Requires manual dependency installation after cloning

### Future Enhancements
- Push notifications for bus updates
- Route optimization algorithms
- Admin dashboard for bus management
- Student attendance tracking
- Real-time chat with drivers

## 👥 Development Team

Created with ❤️ by:
- **Atharva Pawar** - Full-stack Developer
- **Yash Mulay** - Frontend Developer  
- **Vaishnavi Hajare** - Backend Developer
- **Tanvi Patil** - UI/UX Designer

## 📄 License

This project is created for educational purposes as part of a college project.

---

**Note**: Make sure to configure your MySQL database and email settings before running the application. The app requires both backend and frontend to be running simultaneously for full functionality.
