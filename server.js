const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get('/', (req, res, next) => {
  res.json({ msg: 'Not yet implemented' });
});

// Server
app.listen(port, () => {
  console.log(`app listening on port ${port}...`);
});
