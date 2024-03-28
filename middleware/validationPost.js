const yup = require("yup");

async function validatePostData(req, res, next) {
  const postSchema = yup.object({
    titel: yup.string().required().min(1),
    description: yup.string().required().min(3),
  });

  try {
    await postSchema.validate(req.body);
    next();
  } catch (err) {
    req.status = 400;
    next(err);
  }
}

module.exports = {
    validatePostData,
};
