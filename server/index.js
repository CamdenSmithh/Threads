const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/qa', routes);

app.listen(3000, () => {
  console.log(`Server is running at port ${3000}`);
});
