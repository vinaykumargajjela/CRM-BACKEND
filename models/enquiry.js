/**
 * Enquiry (Lead) Model
 * Fields: id, name, email, courseInterest, claimed (Boolean), counselorId (FK)
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  courseInterest: DataTypes.STRING,
  claimed: { type: DataTypes.BOOLEAN, defaultValue: false }, // Unclaimed by default
  counselorId: { type: DataTypes.INTEGER, allowNull: true } // Null if not claimed
});

module.exports = Enquiry;
