// server.js
const express = require('express');
const app = express();
require('dotenv').config();

app.get('/api/location', (req, res) => {
  // Implement the logic to fetch the location data from your server/database
  // and send it as a response
  const latitude = '29.7255333';
  const longitude = '-98.4946';
  res.json({ latitude, longitude, apiKey: process.env.API_KEY });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
