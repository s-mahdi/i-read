const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const audioPath = path.join(__dirname, 'assets', 'audio')

app.use('/audio', express.static(audioPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
