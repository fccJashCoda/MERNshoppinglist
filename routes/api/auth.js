const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  // quick validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // user lookup
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Validate password
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id },
        process.env.JWTSECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
