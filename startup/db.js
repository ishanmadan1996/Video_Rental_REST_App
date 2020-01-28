const winston = require("winston");
const mongoose = require('mongoose');
const config = require('config')
const logger = winston.createLogger({
  transports: [
      new winston.transports.Console({
        level:'info'
      })
  ]
});
module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => logger.info(`Connected to ${db}...`))
}