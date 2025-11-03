/**
 * Employee Controller
 * Handles Register and Login
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

// Register a new counselor
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password for security
    const hash = await bcrypt.hash(password, 10);
    const emp = await Employee.create({ name, email, password: hash });
    res.status(201).json({ message: 'Registration successful', emp });
  } catch (err) {
    res.status(400).json({ message: 'Error registering', error: err.message });
  }
};

// Login and return JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employee.findOne({ where: { email } });
    if (!emp) return res.status(401).json({ message: 'No user found' });
    // Check password using bcrypt
    const valid = await bcrypt.compare(password, emp.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    // Generate JWT token containing user id
    const token = jwt.sign({ id: emp.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ message: 'Error logging in', error: err.message });
  }
};
