const sequelize = require('../config/database');
const Student = require('./Student');
const Bus = require('./Bus');
const Driver = require('./Driver');

// Define associations
Bus.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });
Driver.hasOne(Bus, { foreignKey: 'driverId', as: 'bus' });

Student.belongsTo(Bus, { foreignKey: 'busId', as: 'bus' });
Bus.hasMany(Student, { foreignKey: 'busId', as: 'students' });

module.exports = {
  sequelize,
  Student,
  Bus,
  Driver
};
