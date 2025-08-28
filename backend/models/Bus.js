const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bus = sequelize.define('Bus', {
  // PK: buses.bus_number (string)
  busNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    field: 'bus_number'
  },
  numberPlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'number_plate'
  },
  // Optional FK to drivers.driver_number
  driverNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'driver_number'
  },
  // driver_number exists in DB but we are ignoring drivers per requirements
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_active'
  },
  currentLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    field: 'current_latitude'
  },
  currentLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    field: 'current_longitude'
  },
  lastLocationUpdate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_location_update'
  },
  studentsAlloted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'students_alloted'
  }
}, {
  tableName: 'buses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Bus;
