const bcrypt = require('bcryptjs');
const { Student, Bus, Driver } = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create drivers
    const drivers = await Driver.bulkCreate([
      {
        name: 'Rajesh Kumar',
        phoneNumber: '+91-9876543210',
        licenseNumber: 'MH12-20180001234'
      },
      {
        name: 'Suresh Patil',
        phoneNumber: '+91-9876543211',
        licenseNumber: 'MH12-20180001235'
      },
      {
        name: 'Mahesh Singh',
        phoneNumber: '+91-9876543212',
        licenseNumber: 'MH12-20180001236'
      }
    ]);

    console.log('✅ Drivers created');

    // Create buses
    const buses = await Bus.bulkCreate([
      {
        busNumber: 'BUS-001',
        numberPlate: 'MH12-AB-1234',
        driverId: drivers[0].id,
        isActive: true,
        currentLatitude: 18.5204,
        currentLongitude: 73.8567,
        lastLocationUpdate: new Date()
      },
      {
        busNumber: 'BUS-002',
        numberPlate: 'MH12-CD-5678',
        driverId: drivers[1].id,
        isActive: false
      },
      {
        busNumber: 'BUS-003',
        numberPlate: 'MH12-EF-9012',
        driverId: drivers[2].id,
        isActive: true,
        currentLatitude: 18.5314,
        currentLongitude: 73.8446,
        lastLocationUpdate: new Date()
      }
    ]);

    console.log('✅ Buses created');

    // Create students with hashed passwords (PRN as password)
    const hashedPassword1 = await bcrypt.hash('PRN001', 10);
    const hashedPassword2 = await bcrypt.hash('PRN002', 10);
    const hashedPassword3 = await bcrypt.hash('PRN003', 10);
    const hashedPassword4 = await bcrypt.hash('PRN004', 10);

    const students = await Student.bulkCreate([
      {
        name: 'Atharva Pawar',
        email: 'atharva.pawar@college.edu',
        prn: 'PRN001',
        password: hashedPassword1,
        busId: buses[0].id,
        busStop: 'Pune Station'
      },
      {
        name: 'Yash Mulay',
        email: 'yash.mulay@college.edu',
        prn: 'PRN002',
        password: hashedPassword2,
        busId: buses[0].id,
        busStop: 'Shivaji Nagar'
      },
      {
        name: 'Vaishnavi Hajare',
        email: 'vaishnavi.hajare@college.edu',
        prn: 'PRN003',
        password: hashedPassword3,
        busId: buses[2].id,
        busStop: 'Kothrud'
      },
      {
        name: 'Tanvi Patil',
        email: 'tanvi.patil@college.edu',
        prn: 'PRN004',
        password: hashedPassword4,
        busId: buses[2].id,
        busStop: 'Warje'
      }
    ]);

    console.log('✅ Students created');
    console.log('🎉 Database seeding completed successfully!');
    
    console.log('\n📋 Test Credentials:');
    console.log('Email: atharva.pawar@college.edu | PRN: PRN001');
    console.log('Email: yash.mulay@college.edu | PRN: PRN002');
    console.log('Email: vaishnavi.hajare@college.edu | PRN: PRN003');
    console.log('Email: tanvi.patil@college.edu | PRN: PRN004');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

module.exports = { seedDatabase };
