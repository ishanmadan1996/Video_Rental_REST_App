// this module loads all the essential apis
// when application starts;
const express = require('express');
const app = express();
const winston = require("winston")
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level:'info'
        })
    ]
});

// below is single responsibility principle in practice
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;