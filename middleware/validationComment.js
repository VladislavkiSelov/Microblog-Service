const yup = require("yup");

async function validateCommentData(req, res, next) {
  const commentSchema = yup.object({
    comment: yup.string().required().min(3),
  });

  try {
    await commentSchema.validate(req.body);
    next();
  } catch (err) {
    req.status = 400;
    next(err);
  }
}

module.exports = {
    validateCommentData,
};
