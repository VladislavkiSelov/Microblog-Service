const { Post, Comment, Image } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");
const { verifyJwt } = require("../secondaryFunction/auth");
const logger = require("../utils/logger");

async function getAllPosts(req, res, next) {
  try {
    req.posts = await Post.find().populate("user_id");

    next();
  } catch (err) {
    logger("getAllPosts").error(err);
    req.status = 404;
    next(err);
  }
}

async function getAllPostsUser(req, res, next) {
  try {
    const posts = await Post.find({
      user_id: new ObjectId(req.params.id),
    }).populate("user_id");
    req.posts = posts;
    next();
  } catch (err) {
    logger("getAllPostsUser").error(err);
    req.status = 404;
    next(err);
  }
}

async function getPostFindId(req, res, next) {
  try {
    req.post = await Post.findById(req.params.id).populate("user_id");
    next();
  } catch (err) {
    logger("getPostFindId").error(err);
    req.status = 404;
    next(err);
  }
}

async function createPost(req, res, next) {
  const { token } = req.cookies;
  const { id: user_id } = verifyJwt(token);
  const { titel, description } = req.body;

  try {
    const post = await Post.create({ user_id, titel, description });
    req.post = post;
    next();
  } catch (err) {
    logger("createPost").error(err);
    req.status = 400;
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await Post.deleteOne({ _id: req.params.post_id });
    await Comment.deleteMany({ post_id: req.params.post_id });
    next();
  } catch (err) {
    logger("deletePost").error(err);
    next(err);
  }
}

async function editPost(req, res, next) {
  const { titel, description, post_id } = req.body;

  try {
    await Post.updateMany(
      { _id: new ObjectId(post_id) },
      { $set: { titel, description } }
    );
    next();
  } catch (err) {
    logger("editPost").error(err);
    req.status = 400;
    next(err);
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPostFindId,
  getAllPostsUser,
  deletePost,
  editPost,
};
