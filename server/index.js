const express = require('express');
const mongoose = require('mongoose');
const db = require('./db/schema');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/3000')
  .then(() => {
    console.log('Success connecting mongoose (server/index.js)');
  })
  .catch((error) => {
    console.log('Error connecting mongoose (server/index.js): ', error);
  });

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
