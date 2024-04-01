const { Post, Comment,Image } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");
const { verifyJwt } = require("../secondaryFunction/auth");

async function getAllPosts(req, res, next) {
  try {
    req.posts = await Post.find().populate("user_id");

    next();
  } catch (err) {
    req.error = `getAllPosts = ${err}`
    req.status = 404
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
    req.error = `getAllPostsUser = ${err}`
    req.status = 404
    next(err);
  }
}

async function getPostFindId(req, res, next) {
  try {
    req.post = await Post.findById(req.params.id).populate("user_id");
    next();
  } catch (err) {
    req.error = `getPostFindId = ${err}`
    req.status = 404
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
    req.error = `createPost = ${err}`
    req.status = 400
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await Post.deleteOne({ _id: req.params.id });
    await Comment.deleteMany({ post_id: req.params.id });
    await Image.deleteOne({ post_id: req.params.id });
    next();
  } catch (err) {
    req.error = `deletePost = ${err}`
    next(err);
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPostFindId,
  getAllPostsUser,
  deletePost,
};
