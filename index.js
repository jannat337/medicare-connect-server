const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('MediCare Connect Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});