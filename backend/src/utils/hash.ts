import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
  return (
    Buffer.from(JSON.stringify(data)).toString('base64') +
    '.' +
    crypto.randomBytes(16).toString('hex') +
    '.' +
    Date.now().toString(16)
  );
};
