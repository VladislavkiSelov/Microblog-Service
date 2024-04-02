
function checkTokenUser(req, res, next) {
  if (req.user.role !== "user") {
    res.redirect("/login");
    return;
  }
  next()
}

module.exports = {
  checkTokenUser,
};
