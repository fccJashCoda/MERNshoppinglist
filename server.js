const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api/items', router.items);
app.get('/', (req, res, next) => {
  res.json({ msg: 'Not yet implemented' });
});

// Server
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`app listening on port ${port}...`);
    })
  )
  .catch((err) => console.log('Server is smoking'));
