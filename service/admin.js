const { Admin } = require('../connectionMongoose');
const { checkPassword } = require('../secondaryFunction/auth');

async function checkAdmin(req, res, next) {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return next();
    }

    const passwordMatch = await checkPassword(password, admin.password);
    if (!passwordMatch) {
      res.status(401).send('Error password');
    }

    req._role = 'admin';
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAdmin,
};
