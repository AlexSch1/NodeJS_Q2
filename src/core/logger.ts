import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => {
      return `${msg['timestamp']} [${msg.level}] - ${msg.message}`;
    }),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/logs.log' }),
  ],
});

export default logger;
