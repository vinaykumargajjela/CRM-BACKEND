/**
 * Main Server Entry Point
 * Loads routes and starts Express app
 */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

const { sequelize } = require('./models');
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

// Mount employee and enquiry routes
app.use('/api/employees', employeeRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.get('/', (req, res) => res.send('CRM API Running'));

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
