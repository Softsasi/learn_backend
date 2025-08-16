import chalk from 'chalk';

export const loggerMiddleware = (req, _res, next) => {
  const date = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const requestId = req.headers['x-request-id'] || 'none';

  console.log(
    chalk.blue(
      `[BlogSite] ${date} - ${req.method} - ${req.url} - ${ip} - ${requestId}`
    )
  );

  next();
};
