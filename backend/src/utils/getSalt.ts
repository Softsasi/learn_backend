import crypto from 'crypto';

export const getSalt = (): string => {
  const salt = process.env.SALT || crypto.randomBytes(16).toString('hex');
  return salt;
};
