const jwt = require('jsonwebtoken');
const { Student, Bus } = require('../models');

const login = async (req, res) => {
  try {
    const { email, prn } = req.body;

    console.log('Login attempt:', { email, prn });

    if (!email || !prn) {
      console.log('Login Error: Missing email or PRN');
      return res.status(400).json({ error: 'Email and PRN are required' });
    }

    // Find student by email
    const student = await Student.findOne({
      where: { email },
      include: [{
        model: Bus,
        as: 'bus',
        include: [{
          model: require('../models').Driver,
          as: 'driver'
        }]
      }]
    });

    if (!student) {
      console.log('Login Error: Student not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or PRN' });
    }

    // Check if PRN matches the student's PRN (direct comparison)
    if (prn !== student.prn) {
      console.log('Login Error: Invalid PRN for email:', email);
      return res.status(401).json({ error: 'Invalid email or PRN' });
    }

    // Generate JWT token using PRN as student identifier
    const token = jwt.sign(
      { studentPrn: student.prn },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login Success: Student logged in:', student.email);

    res.json({
      message: 'Login successful',
      token,
      student: {
        prn: student.prn,
        name: student.name,
        email: student.email,
        gender: student.gender,
        busNumber: student.busNumber,
        bus: student.bus,
        driver: student.bus?.driver
      }
    });
  } catch (error) {
    console.error('❌ Login Error Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      sql: error.sql || 'No SQL query',
      original: error.original || 'No original error'
    });
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  login
};
