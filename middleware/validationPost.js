const yup = require("yup");
const logger = require("../utils/logger");

async function validatePostData(req, res, next) {
  const postSchema = yup.object({
    titel: yup.string().required().min(3),
    description: yup.string().required().min(10),
  });

  try {
    await postSchema.validate(req.body);
    next();
  } catch (err) {
    logger('validatePostData').error(err)
    req.status = 400;
    next(err);
  }
}

module.exports = {
    validatePostData,
};
