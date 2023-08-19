const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

// Middleware to parse JSON requests
app.use(express.json());

// Your webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Received Webhook:', req.body);

  // Save to file
  fs.appendFile('webhookData.log', JSON.stringify(req.body) + '\n', (err) => {
    if (err) {
      console.error('Failed to write to file', err);
      return res.status(500).send('Error saving data');
    }

    res.status(200).send('Webhook received and saved!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
