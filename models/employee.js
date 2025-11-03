/**
 * Employee (Counselor) Model
 * Fields: id, name, email (unique), password (hashed)
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING // hashed password
});

module.exports = Employee;
