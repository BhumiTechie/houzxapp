const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const os = require('os');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Helper to find local IP address
const networkInterfaces = os.networkInterfaces();
const getLocalIP = () => {
  for (let interfaceKey of Object.keys(networkInterfaces)) {
    for (let iface of networkInterfaces[interfaceKey]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  const LOCAL_IP = getLocalIP();
  console.log(`✅ Server running on http://${LOCAL_IP}:${PORT}`);
});
 