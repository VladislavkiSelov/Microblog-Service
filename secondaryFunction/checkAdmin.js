const { verifyJwt } = require("./auth");

function checkAdmin(req, res, next) {
  const { token } = req.cookies;
  const user = verifyJwt(token);

  if (user.role !== "admin") {
    res.redirect("/login");
    return;
  }
  
  next();
}

module.exports = {
  checkAdmin,
};
