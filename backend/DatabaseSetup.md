# Database Setup (MySQL + Workbench)

This guide helps you create the MySQL database and tables used by the Backend. Use MySQL Workbench (or any MySQL client) to execute the statements below in order.

- Database name (example): bustrack
- Recommended user: bustrack
- Charset/Collation: utf8mb4 / utf8mb4_unicode_ci

Note: The backend uses Sequelize and will auto-sync minor changes. Still, creating the schema explicitly is recommended for clean setup.

## 1) Create database and app user

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS `bustrack`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

-- Create application user (adjust host and password as needed)
CREATE USER IF NOT EXISTS 'bustrack'@'%' IDENTIFIED BY 'your-strong-password';

-- Grant privileges to the user on this database
GRANT ALL PRIVILEGES ON `bustrack`.* TO 'bustrack'@'%';
FLUSH PRIVILEGES;
```

If running locally with MySQL Workbench on the same machine, you can also create the user as `'bustrack'@'localhost'`.

## 2) Use the database

```sql
USE `bustrack`;
```

## 3) Create tables

The schema below matches the backend models and route expectations (including a PRN field for students).

### 3.1 users
```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin','sub-admin') NOT NULL DEFAULT 'admin',
  `reset_password_token` VARCHAR(255) NULL,
  `reset_password_expires` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.2 drivers
```sql
CREATE TABLE IF NOT EXISTS `drivers` (
  `driver_number` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `gender` ENUM('male','female','other') NOT NULL,
  `contact` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `bus_number` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`driver_number`),
  UNIQUE KEY `uk_drivers_email` (`email`),
  KEY `idx_drivers_bus_number` (`bus_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.3 buses
```sql
CREATE TABLE IF NOT EXISTS `buses` (
  `bus_number` VARCHAR(100) NOT NULL,
  `number_plate` VARCHAR(100) NOT NULL,
  `driver_number` VARCHAR(100) NULL,
  `is_active` TINYINT NOT NULL DEFAULT 0,
  `current_latitude` DECIMAL(10,8) NULL,
  `current_longitude` DECIMAL(11,8) NULL,
  `last_location_update` DATETIME NULL,
  `students_alloted` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bus_number`),
  UNIQUE KEY `uk_buses_number_plate` (`number_plate`),
  UNIQUE KEY `uk_buses_driver_number` (`driver_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 3.4 students
```sql
CREATE TABLE IF NOT EXISTS `students` (
  `prn` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `gender` ENUM('male','female','other') NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `bus_number` VARCHAR(100) NOT NULL,
  `invitation_sent` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`prn`),
  UNIQUE KEY `uk_students_email` (`email`),
  KEY `idx_students_bus_number` (`bus_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 4) Add foreign key constraints

After all tables are created, add the foreign key constraints to establish relationships:

```sql
-- Add foreign key constraint from drivers to buses
ALTER TABLE `drivers` 
ADD CONSTRAINT `fk_drivers_bus_number` 
FOREIGN KEY (`bus_number`) REFERENCES `buses`(`bus_number`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- Add foreign key constraint from buses to drivers  
ALTER TABLE `buses` 
ADD CONSTRAINT `fk_buses_driver_number` 
FOREIGN KEY (`driver_number`) REFERENCES `drivers`(`driver_number`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- Add foreign key constraint from students to buses
ALTER TABLE `students` 
ADD CONSTRAINT `fk_students_bus_number` 
FOREIGN KEY (`bus_number`) REFERENCES `buses`(`bus_number`) 
ON DELETE CASCADE ON UPDATE CASCADE;
```

## 5) Optional seed (create an admin)

You can run the backend script which creates an admin automatically after DB connection is established, or insert manually for quick testing:

```sql
INSERT INTO `users` (`email`, `password`, `role`)
VALUES ('admin@example.com', '$2b$10$replace_with_bcrypt_hash', 'admin');
```

Note: Passwords must be bcrypt-hashed in production. The backend will hash when creating via API/script.

## 6) Verify schema

```sql
-- Ensure tables exist
SHOW TABLES;

-- Inspect columns
DESCRIBE `users`;
DESCRIBE `drivers`;
DESCRIBE `buses`;
DESCRIBE `students`;

-- Quick integrity checks
SELECT COUNT(*) AS users_cnt FROM `users`;
SELECT COUNT(*) AS drivers_cnt FROM `drivers`;
SELECT COUNT(*) AS buses_cnt FROM `buses`;
SELECT COUNT(*) AS students_cnt FROM `students`;
```

## 7) Configure Backend .env

Map DB credentials in `Backend/.env`:

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=bustrack
DB_USER=bustrack
DB_PASSWORD=your-strong-password

JWT_SECRET=replace_with_strong_secret
RESET_PASSWORD_SECRET=replace_with_strong_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@example.com
```

## 8) Start the Backend

- Ensure MySQL is running.
- From `Backend/`: `npm run dev`

Sequelize will validate/sync tables. If you created tables with this guide, sync should be quick and non-destructive.

## 9) Troubleshooting: Unknown column `bus.created_at`

If you see an error like:

```
SequelizeDatabaseError: Unknown column 'bus.created_at' in 'field list'
```

it means your `buses` table has camelCase timestamp columns (`createdAt`, `updatedAt`) while the backend models map timestamps to snake_case columns (`created_at`, `updated_at`). Fix by renaming the columns to snake_case.

Run the following SQL in MySQL Workbench:

```sql
-- Ensure you are using the correct database first
USE `bustrack`;

-- Rename camelCase to snake_case for buses
ALTER TABLE `buses`
  CHANGE COLUMN `createdAt` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHANGE COLUMN `updatedAt` `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- (Optional) Do the same for students if they were created with camelCase
ALTER TABLE `students`
  CHANGE COLUMN `createdAt` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHANGE COLUMN `updatedAt` `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

After running the above, retry the API call (e.g., login). The error should be resolved because the columns now match the model configuration in `backend/models/Bus.js` and `backend/models/Student.js`.

### Connection option warnings
If you see warnings like:

```
Ignoring invalid configuration option passed to Connection: acquireTimeout
Ignoring invalid configuration option passed to Connection: timeout
```

remove `acquireTimeout` and `timeout` from `backend/config/database.js` (MySQL2 driver does not accept them on Connection). This warning is harmless but recommended to clean up.
