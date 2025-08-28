const { Student, Bus } = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create buses (no drivers)
    const buses = await Bus.bulkCreate([
      {
        busNumber: 'BUS-001',
        numberPlate: 'MH12-AB-1234',
        isActive: true,
        currentLatitude: 18.5204,
        currentLongitude: 73.8567,
        lastLocationUpdate: new Date(),
        studentsAlloted: 0
      },
      {
        busNumber: 'BUS-002',
        numberPlate: 'MH12-CD-5678',
        isActive: false,
        studentsAlloted: 0
      },
      {
        busNumber: 'BUS-003',
        numberPlate: 'MH12-EF-9012',
        isActive: true,
        currentLatitude: 18.5314,
        currentLongitude: 73.8446,
        lastLocationUpdate: new Date(),
        studentsAlloted: 0
      }
    ]);

    console.log('✅ Buses created');

    // Create students (PRN used for login check)
    const students = await Student.bulkCreate([
      {
        name: 'Atharva Pawar',
        email: 'atharva.pawar@college.edu',
        prn: 'PRN001',
        gender: 'male',
        busNumber: buses[0].busNumber
      },
      {
        name: 'Yash Mulay',
        email: 'yash.mulay@college.edu',
        prn: 'PRN002',
        gender: 'male',
        busNumber: buses[0].busNumber
      },
      {
        name: 'Vaishnavi Hajare',
        email: 'vaishnavi.hajare@college.edu',
        prn: 'PRN003',
        gender: 'female',
        busNumber: buses[2].busNumber
      },
      {
        name: 'Tanvi Patil',
        email: 'tanvi.patil@college.edu',
        prn: 'PRN004',
        gender: 'female',
        busNumber: buses[2].busNumber
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
