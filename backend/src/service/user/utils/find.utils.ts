import { User } from '@/models/user.model';

export const findByEmail = async (email: string) => {
  try {
    if (!email) {
      return null;
    }

    // lowercase email for consistency
    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user');
  }
};

export const findByUserId = async (id: string) => {
  try {
    if (!id) {
      return null;
    }

    const user = await User.findById(id);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding user');
  }
};
