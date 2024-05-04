export const errorMiddleware = (error, req, res) => {
  console.error(error.message);
  res.status(500);
  res.render("500", { layout: false });
  return;
};
