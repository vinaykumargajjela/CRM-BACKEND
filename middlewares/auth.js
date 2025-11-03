/**
 * JWT Authentication Middleware
 * Checks Authorization header for Bearer token
 * Attaches decoded user ID to req.user upon success
 */
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  // Check for Bearer token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verify token and save user ID to request
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch {
      // Handle invalid/expired token
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token found in header
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = protect;
