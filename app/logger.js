import winston from 'winston';
import mkdirp from 'mkdirp';
import winstonDailyRotateFile from 'winston-daily-rotate-file';

mkdirp('./logs');

var logger = new (winston.Logger)({
  transports: [
    new (winstonDailyRotateFile)({
      name: 'info-file',
      filename: 'info.log',
      dirname: 'logs',
      level: 'info',
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false
    }),
    new (winstonDailyRotateFile)({
      name: 'error-file',
      dirname: 'logs',
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ]
});

module.exports = logger;
module.exports.stream = {
  write: function(message) {
    logger.info(message.slice(0, -1));
  }
};
