export const isAdmin = (req, res, next) => {
  const user = req.user;
  console.log({
    user,
  });

  let role = (user.role as string).toLowerCase();

  if (!user || role !== 'admin') {
    return res.status(403).json({
      error: 'Forbidden! This is Admin Route',
    });
  }

  next();
};
