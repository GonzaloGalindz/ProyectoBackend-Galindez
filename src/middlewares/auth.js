export const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: `No authenticated users` });
  }

  next();
};
