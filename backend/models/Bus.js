const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bus = sequelize.define('Bus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  numberPlate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Drivers',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  currentLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  currentLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  lastLocationUpdate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'buses',
  timestamps: true
});

module.exports = Bus;
