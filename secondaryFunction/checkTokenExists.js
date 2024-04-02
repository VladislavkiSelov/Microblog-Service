const { verifyJwt } = require("./auth");

function checkTokenExists(req, res, next) {
  const { token } = req.cookies;
  const user = verifyJwt(token);

  if (!user) {
    req.user = {};
    next()
  }
  
  req.user = user;
  next();
}

module.exports = {
  checkTokenExists,
};
