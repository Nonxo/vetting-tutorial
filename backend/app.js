const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoute = require('./routes/user')

const postsRoute = require('./routes/post');

const app = express();

mongoose.connect('mongodb+srv://nonxoUser:6LHdvbvj4xQAjcrS@cluster0-yuuim.azure.mongodb.net/node-angular?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDb')
  })
  .catch(() => {
    console.log('Connection failed!')
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')))


app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next();
});

app.use('/api/user', usersRoute);

app.use('/api/posts', postsRoute);

module.exports = app
