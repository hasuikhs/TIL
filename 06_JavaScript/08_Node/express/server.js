const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5051;

app.use(cors());

app.get('/redirect', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'redirect.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`);
});