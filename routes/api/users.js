const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;

  // quick validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // user lookup
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name,
      email,
      password,
    });

    newUser
      .save()
      .then((user) => {
        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  });
});

module.exports = router;
