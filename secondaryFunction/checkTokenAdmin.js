function checkTokenAdmin(req, res, next) {
  const { user } = req;

  if (user.role !== "admin") {
    res.redirect("/login");
    return;
  }
  
  next();
}

module.exports = {
  checkTokenAdmin,
};
