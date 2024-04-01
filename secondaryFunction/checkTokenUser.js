const { verifyJwt } = require("./auth");

function checkTokenUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.redirect("/login");
    req.error = `token not valid  = ${err}`;
    return;
  }

  const user = verifyJwt(token);
  req.user = user;

  next();
}

module.exports = {
  checkTokenUser,
};
