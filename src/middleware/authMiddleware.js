const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }
  
  try {
    console.log(token);
    console.log(jwt.verify(token, 'f785be2c-ba03-411e-87c6-f2669d53393d'));
    const decoded = jwt.verify(token, 'f785be2c-ba03-411e-87c6-f2669d53393d');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

exports.checkRole = (rolesAllowed) => {
  return (req, res, next) => {
    const { role_id } = req.user;

    if (rolesAllowed.includes(role_id)) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied.' });
    }
  };
};