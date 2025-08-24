import bcrypt from 'bcrypt';

import { addMinutes } from 'date-fns';

const SALT_ROUNDS = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS, 10)
  : 10;

export const hashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, SALT_ROUNDS);
  return hash;
};

export const verifyPassword = ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const generateToken = (data: object) => {
  const payload = {
    ...data,
    exp: addMinutes(new Date(), 30).getTime(),
  };

  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export const verifyToken = (token: string) => {
  const payload = Buffer.from(token, 'base64').toString('utf-8');
  const { exp } = JSON.parse(payload);

  if (Date.now() > exp) {
    throw new Error('Token expired');
  }

  return JSON.parse(payload);
};
