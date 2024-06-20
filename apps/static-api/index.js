const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const audioPath = path.join(__dirname, 'assets', 'audio')

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*';
const corsOptions = {
  origin: allowedOrigins
};

app.use(cors(corsOptions));

app.use('/audio', express.static(audioPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
