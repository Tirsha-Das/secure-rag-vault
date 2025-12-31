// logger.ts
import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const devFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaString =
      Object.keys(meta).length > 0
        ? `\n  ${JSON.stringify(meta, null, 2)}`
        : '';

    return `${timestamp} ${level}: ${message}${metaString}`;
  })
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: isProd ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
});
