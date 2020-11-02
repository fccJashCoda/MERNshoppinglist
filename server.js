const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 5000;

if (app.get('env') === 'development') require('dotenv').config();

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api/items', router.items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.htmml'));
  });
}

// Server
mongoose
  // .connect(process.env.MONGOURI, {
  .connect(process.env.MONGOCLOUD, {
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
