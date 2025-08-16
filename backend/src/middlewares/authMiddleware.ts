export const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  next();
};
