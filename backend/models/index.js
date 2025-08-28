const sequelize = require('../config/database');
const Student = require('./Student');
const Bus = require('./Bus');
const Driver = require('./Driver');

// Define associations using bus_number mapping
// Student.busNumber (field: bus_number) -> Bus.busNumber (field: bus_number)
Student.belongsTo(Bus, { foreignKey: 'busNumber', targetKey: 'busNumber', as: 'bus' });
Bus.hasMany(Student, { foreignKey: 'busNumber', sourceKey: 'busNumber', as: 'students' });

// Bus -> Driver (optional): join via buses.bus_number -> drivers.bus_number
Bus.belongsTo(Driver, { foreignKey: 'busNumber', targetKey: 'bus_number', as: 'driver' });
Driver.hasOne(Bus, { foreignKey: 'busNumber', sourceKey: 'bus_number', as: 'bus' });

module.exports = {
  sequelize,
  Student,
  Bus,
  Driver
};
