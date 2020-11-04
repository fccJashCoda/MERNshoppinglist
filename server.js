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
app.use('/api/users', router.users);
app.use('/api/auth', router.auth);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.htmml'));
  });
}

app.use((req, res, next) => {
  res.status(400).send('400 - Bad Request');
});

// Server
mongoose
  .connect(process.env.MONGOURI, {
    // use local db when testing to prevent useless cloud spam
    // .connect(process.env.MONGOCLOUD, {
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
