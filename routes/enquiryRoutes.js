/**
 * Enquiry Routes
 * Endpoints for lead submission, fetching, claiming
 */
const express = require('express');
const router = express.Router();
const {
  createPublicEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimLead
} = require('../controllers/enquiryController');
const protect = require('../middlewares/auth');

// Public enquiry form (no auth)
router.post('/public', createPublicEnquiry);
// Fetch public leads (auth required)
router.get('/public', protect, getPublicEnquiries);
// Fetch private, claimed leads (auth required)
router.get('/private', protect, getPrivateEnquiries);
// Claim a lead (auth required)
router.patch('/:id/claim', protect, claimLead);

module.exports = router;
