const { verifyJwt } = require("./auth");

//! check user WHAT EXACTLY? checkIfLoggedIn, checkAuth, checkTokenExists
function checkUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.redirect("/login");
    return
  }

  // буде правильним інкапсулювати перевірку токена тутб замість розкидування по різним місцям
  const user = verifyJwt(token);
  req.user = user;

  next();
}

module.exports = {
  checkUser,
};
