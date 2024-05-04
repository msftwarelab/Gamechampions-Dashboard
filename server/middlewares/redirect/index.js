export const redirectMiddleware = (req, res, next) => {
  const isDev = process.env.IS_DEV;
  const redirectUrl = process.env.REDIRECT_URL;

  if (isDev && redirectUrl) {
    res.redirect(redirectUrl);
  }

  next();
};
