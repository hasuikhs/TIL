const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/redirect', (req, res) => {
  res.redirect('http://127.0.0.1:5051/redirect');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`);
});