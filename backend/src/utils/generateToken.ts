import { v4 as uuidv4 } from 'uuid';

export const generateEmailVerification = () => {
  const token = uuidv4();
  return token;
};
