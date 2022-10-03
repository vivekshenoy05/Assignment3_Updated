// const { createLogger, transports, format, transport } = require("winston");
// const url = require("../secret/secret");
// require("winston-mongodb");

// const logger = createLogger({
//   transports: [
//     new transports.File({
//       filename: "info.log",
//       level: "info",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//   ],
// });

// module.exports = logger;

//transports carry data either from applications or from mongo to console.log file

//logging function

const { createLogger, transports, format } = require("winston");

const userLogger = createLogger({
  transports: [
    new transports.File({
      filename: "user.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "user-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = { userLogger };
