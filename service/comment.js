const { Comment } = require("../connectionMongoose");
const { ObjectId } = require('mongodb');
const { verifyJwt } = require("../secondaryFunction/auth");

async function getCommentsFindId(req, res, next) {
  try {
    const comments = await Comment.find({ post_id: new ObjectId(req.params.id) }).populate("user_id");
    req.comments = comments;
    next();
  } catch (err) {
    next(err);
  }
}

async function createComment(req, res, next) {
  const {token} = req.cookies;
  const { id: user_id } = verifyJwt(token);
  const { comment, post_id } = req.body;
  try {
    await Comment.create({
      comment,
      user_id,
      post_id,
    });
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCommentsFindId,
  createComment,
};
