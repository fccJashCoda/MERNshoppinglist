const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const token = req.header('x-auth-token');

  console.log('requested auth');
  console.log('token', token);

  // console.log(req);
  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.JWTSECREt);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
