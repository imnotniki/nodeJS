require('dotenv').config();

const config = {
  HOST_PORT: process.env.HOST_PORT,
  HOST_IP: process.env.HOST_IP,
};

module.exports = config;