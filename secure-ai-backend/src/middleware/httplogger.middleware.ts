// httpLogger.ts
import { Request, Response, NextFunction } from 'express';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const getStatusColor = (status: number): string => {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  if (status >= 200) return colors.green;
  return colors.reset;
};

export const httpLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const timestamp = new Date().toLocaleTimeString();

  // Log at start
  console.log(
    `${colors.blue}${timestamp}${colors.reset} ` +
    `${colors.green}${req.method}${colors.reset} ` +
    `${colors.cyan}: ${req.originalUrl}${colors.reset}`
  );

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = getStatusColor(res.statusCode);
    
    console.log(
      `${colors.blue}${timestamp}${colors.reset} ` +
      `${colors.green}${req.method}${colors.reset} ` +
      `${colors.cyan}: ${req.originalUrl}${colors.reset} ` +
      `${statusColor}${res.statusCode}${colors.reset} ` +
      `${colors.yellow}${duration}ms${colors.reset}`
    );
  });

  next();
};
