const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('Request headers:', req.headers); // Log all headers

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Incoming token:', token); // Log the incoming token

  if (!token) return res.status(401).json({ error: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};


module.exports = authenticateToken;
