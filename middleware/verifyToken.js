const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access only' });
  }
  next();
};

const verifyDoctor = (req, res, next) => {
  if (req.user?.role !== 'doctor' && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Doctor access only' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, verifyDoctor };