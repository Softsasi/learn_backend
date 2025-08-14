import { User } from '@/models/user.model';
import { findByEmail, findByUserId } from './utils';

export const findEmailService = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const findUserByIdService = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findByUserId(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const findAllUsersService = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
