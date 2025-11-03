// Load Sequelize and env variables
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up Sequelize instance using settings from .env
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE
});

module.exports = sequelize;
