const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://michelelima:94aeWHLFapmftUui@cluster0.w5gsndh.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0';

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  app.use(cors());

  next();
});

app.use(feedRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(8080);
    console.log('Server connected');
  })
  .catch((err) => console.log(err));
