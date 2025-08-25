# Bus Tracking Backend API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   - Install MySQL and create a database named `bus_tracking_db`
   - Update `.env` file with your MySQL credentials

3. **Environment Variables**
   Update the `.env` file with your actual values:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=bus_tracking_db
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start Server**
   ```bash
   npm run dev
   ```

5. **Seed Database (Optional)**
   Run the seeder to create test data:
   ```javascript
   const { seedDatabase } = require('./seeders/seedData');
   seedDatabase();
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Student login
- `POST /api/auth/send-otp` - Send OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password (authenticated)

### Bus Information
- `GET /api/bus/details` - Get bus details (authenticated)
- `GET /api/bus/location` - Get bus location (authenticated)
- `GET /api/bus/eta` - Get estimated arrival time (authenticated)
- `POST /api/bus/update-location` - Update bus location (admin)

## Test Credentials
- Email: atharva.pawar@college.edu | PRN: PRN001
- Email: yash.mulay@college.edu | PRN: PRN002
- Email: vaishnavi.hajare@college.edu | PRN: PRN003
- Email: tanvi.patil@college.edu | PRN: PRN004
