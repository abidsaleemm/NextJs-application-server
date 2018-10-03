export default ({ redirect = true } = {}) => (req, res, next) => {
  // Check if a user session
  if (!req.isAuthenticated() && !process.env.RENDER) {
    if (redirect === true) {
      res.redirect("/");
    } else {
      res.status(403).send("You are not authorized to access this page");
    }
    return;
  }

  const { user: { role = "user" } = {}, path = "" } = req;

  if (role === "admin") {
    return next();
  }

  next();
};
