require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const config = require('./config');
const HOST_PORT = config.HOST_PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(HOST_PORT, () => {
  console.log(`Server is running on http://localhost:${HOST_PORT}`);
});

