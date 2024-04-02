const { Comment } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");

async function getCommentsFindId(req, res, next) {
  try {
    const comments = await Comment.find({
      post_id: new ObjectId(req.params.id),
    }).populate("user_id");
    req.comments = comments;
    next();
  } catch (err) {
    req.error = `getCommentsFindId = ${err}`;
    next(err);
  }
}

async function createComment(req, res, next) {
  const { id: user_id } = req.user;
  const { comment, post_id } = req.body;
  try {
    await Comment.create({comment, user_id, post_id});
    next();
  } catch (err) {
    req.error = `createComment = ${err}`;
    req.status = 400;
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    await Comment.deleteOne({ _id: req.body.comment });
    next();
  } catch (err) {
    req.error = `createComment = ${err}`;
    next(err);
  }
}

module.exports = {
  getCommentsFindId,
  createComment,
  deleteComment,
};
