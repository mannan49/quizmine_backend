const doetnv = require("dotenv");
doetnv.config();

const config = {
  PORT: process.env.PORT || 8080,
  DEV_MODE: process.env.DEV_MODE,
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
  FRONT_END_URL1: process.env.FRONT_END_URL1,
  FRONT_END_URL2: process.env.FRONT_END_URL2,
};

module.exports = config;
