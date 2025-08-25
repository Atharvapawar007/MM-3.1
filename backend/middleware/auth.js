const jwt = require('jsonwebtoken');
const { Student } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log('Auth Error: No token provided');
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findByPk(decoded.studentPrn);

    if (!student) {
      console.log('Auth Error: Student not found for token');
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.student = student;
    next();
  } catch (error) {
    console.log('Auth Error:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
