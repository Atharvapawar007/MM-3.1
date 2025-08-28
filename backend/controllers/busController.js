const { Bus, Student } = require('../models');

const getBusDetails = async (req, res) => {
  try {
    const studentPrn = req.student.prn;

    console.log('Fetching bus details for student PRN:', studentPrn);

    const student = await Student.findByPk(studentPrn, {
      include: [{
        model: Bus,
        as: 'bus'
      }]
    });

    if (!student.bus) {
      console.log('Bus Details Error: No bus assigned to student');
      return res.status(404).json({ error: 'No bus assigned to this student' });
    }

    console.log('Bus details fetched successfully for student:', studentPrn);

    res.json({
      busNumber: student.bus.busNumber,
      numberPlate: student.bus.numberPlate,
      isActive: student.bus.isActive
    });
  } catch (error) {
    console.log('Bus Details Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch bus details' });
  }
};

const getBusLocation = async (req, res) => {
  try {
    const studentPrn = req.student.prn;

    console.log('Fetching bus location for student PRN:', studentPrn);

    const student = await Student.findByPk(studentPrn, {
      include: [{
        model: Bus,
        as: 'bus'
      }]
    });

    if (!student.bus) {
      console.log('Bus Location Error: No bus assigned to student');
      return res.status(404).json({ error: 'No bus assigned to this student' });
    }

    if (!student.bus.isActive) {
      console.log('Bus Location Info: Bus is not active');
      return res.json({
        isActive: false,
        message: "Your Bus isn't active right now"
      });
    }

    if (!student.bus.currentLatitude || !student.bus.currentLongitude) {
      console.log('Bus Location Error: No GPS data available');
      return res.json({
        isActive: true,
        hasLocation: false,
        message: 'GPS location not available'
      });
    }

    console.log('Bus location fetched successfully');

    res.json({
      isActive: true,
      hasLocation: true,
      latitude: parseFloat(student.bus.currentLatitude),
      longitude: parseFloat(student.bus.currentLongitude),
      lastUpdate: student.bus.lastLocationUpdate
    });
  } catch (error) {
    console.log('Bus Location Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch bus location' });
  }
};

const getETA = async (req, res) => {
  try {
    const studentId = req.student.id;

    console.log('Calculating ETA for student PRN:', req.student.prn);

    const student = await Student.findByPk(req.student.prn, {
      include: [{
        model: Bus,
        as: 'bus'
      }]
    });

    if (!student.bus) {
      console.log('ETA Error: No bus assigned to student');
      return res.status(404).json({ error: 'No bus assigned to this student' });
    }

    if (!student.bus.isActive) {
      console.log('ETA Info: Bus is not active');
      return res.json({
        isActive: false,
        message: "Your Bus isn't active right now"
      });
    }

    // Mock ETA calculation (in real app, you'd use Google Maps API or similar)
    const mockETA = Math.floor(Math.random() * 30) + 5; // 5-35 minutes

    console.log('ETA calculated successfully:', mockETA, 'minutes');

    res.json({
      isActive: true,
      eta: mockETA,
      busStop: student.busStop || 'Your Stop',
      message: `Bus will arrive in approximately ${mockETA} minutes`
    });
  } catch (error) {
    console.log('ETA Error:', error.message);
    res.status(500).json({ error: 'Failed to calculate ETA' });
  }
};

// Admin endpoint to update bus location (would be called by driver's app)
const updateBusLocation = async (req, res) => {
  try {
    const { busNumber, latitude, longitude } = req.body;

    console.log('Updating bus location for bus number:', busNumber);

    if (!busNumber || latitude === undefined || longitude === undefined) {
      console.log('Update Location Error: Missing required fields');
      return res.status(400).json({ error: 'busNumber, latitude, and longitude are required' });
    }

    const bus = await Bus.findByPk(busNumber);

    if (!bus) {
      console.log('Update Location Error: Bus not found');
      return res.status(404).json({ error: 'Bus not found' });
    }

    await bus.update({
      currentLatitude: latitude,
      currentLongitude: longitude,
      lastLocationUpdate: new Date(),
      isActive: true
    });

    console.log('Bus location updated successfully');

    res.json({ message: 'Bus location updated successfully' });
  } catch (error) {
    console.log('Update Location Error:', error.message);
    res.status(500).json({ error: 'Failed to update bus location' });
  }
};

module.exports = {
  getBusDetails,
  getBusLocation,
  getETA,
  updateBusLocation
};
