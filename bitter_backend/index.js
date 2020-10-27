const express = require('express');
const app = express();
const port = 5000;
const rants = require('./rants.json');

app.get('/getRants', (req, res) => {
  res.send(rants);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
