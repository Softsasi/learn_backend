import { Request } from 'express';

export const getUserAgent = (req: Request) => {
  return req.headers['user-agent'];
};

export const getIpAddress = (req: Request) => {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
};
