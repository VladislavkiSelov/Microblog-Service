const yup = require("yup");
const logger = require("../utils/logger");

async function validateUserData(req, res, next) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const userSchema = yup.object({
    username: yup.string().required().min(2),
    email: yup.string().required().matches(emailRegex, "Invalid email format"),
    password: yup.string().min(4),
  });

  try {
    await userSchema.validate(req.body);
    next();
  } catch (err) {
    logger('validateUserData').error(err)
    req.errorRender = 'register';
    next(err);
  }
}

module.exports = {
  validateUserData,
};
