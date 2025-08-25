const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Student, Bus, Driver } = require('../models');

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
        model: Driver,
        as: 'driver',
        foreignKey: 'bus_id'
      }]
    });

    if (!student) {
      console.log('Login Error: Student not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or PRN' });
    }

    // Check if PRN matches password (either default PRN or updated password)
    const isValidPassword = await bcrypt.compare(prn, student.password) || prn === student.password;

    if (!isValidPassword) {
      console.log('Login Error: Invalid PRN/password for email:', email);
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
        bus_id: student.bus_id,
        driver: student.driver
      }
    });
  } catch (error) {
    console.log('Login Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  login
};
