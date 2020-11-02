const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res, next) => {
  Item.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json({ items }));
});

// @route   POST api/items
// @desc    Create an item
// @access  Private
router.post('/', auth, (req, res, next) => {
  const { name } = req.body;
  const newItem = new Item({
    name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, (req, res, next) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
