import { User } from '@/models/user.model';

export const updateProfileService = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      message: 'Profile updated successfully',
      user,
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};
