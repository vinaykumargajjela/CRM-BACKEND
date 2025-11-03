/**
 * Enquiry Controller
 * Handles public enquiry submission, fetch, claim logic
 */
const { Enquiry } = require('../models');

// Unauthenticated public API to submit a lead enquiry
exports.createPublicEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;
    await Enquiry.create({ name, email, courseInterest, claimed: false, counselorId: null });
    res.status(201).json({ message: 'Enquiry submitted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit enquiry', error: err.message });
  }
};

// Authenticated API to get all unclaimed leads (public)
exports.getPublicEnquiries = async (req, res) => {
  const data = await Enquiry.findAll({ where: { claimed: false } });
  res.json(data);
};

// Auth API to get leads claimed by currently logged-in counselor
exports.getPrivateEnquiries = async (req, res) => {
  const data = await Enquiry.findAll({ where: { counselorId: req.user } });
  res.json(data);
};

// Auth API to claim a lead
exports.claimLead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    // Business logic: Prevent double claiming
    if (enquiry.claimed) return res.status(409).json({ message: 'Already claimed' });
    enquiry.claimed = true;
    enquiry.counselorId = req.user;
    await enquiry.save();
    res.json({ message: 'Lead claimed', enquiry });
  } catch (err) {
    res.status(400).json({ message: 'Could not claim lead', error: err.message });
  }
};
