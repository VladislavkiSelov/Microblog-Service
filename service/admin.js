const { Admin } = require("../connectionMongoose");
const { checkPassword } = require("../secondaryFunction/auth");
const logger = require("../utils/logger");

async function checkAdmin(req, res, next) {
  const { password, email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      next();
      return;
    }

    const passwordMatch = await checkPassword(password, admin.password);
    if (!passwordMatch) {
      req.error = `Error password`
      res.status(401).send('Error password');
    }

    req._role = 'admin';
    req.user = admin 
    next();
  } catch (err) {
    req.errorRender = 'login';
    logger("checkAdmin").error(err);
    next(err);
  }
}

module.exports = {
  checkAdmin,
};
