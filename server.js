const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('webhookData.log', {flags : 'w'});

// Middleware to parse JSON requests
app.use(express.json());

// Your webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Received Webhook:', req.body);

  let jsonObj = req.body;

  // Save to file
  log_file.write('Event: ' + jsonObj.type + ' - ID: ' + jsonObj.id + '\n');

  res.status(200).send('Webhook received and saved!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
