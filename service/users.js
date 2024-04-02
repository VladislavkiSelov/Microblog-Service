const { MongoServerError } = require("mongodb");
const { User, Post, Comment } = require("../connectionMongoose");
const { hashPassword, checkPassword } = require("../secondaryFunction/auth");

async function getAllUsers(req, res, next) {
  try {
    req.users = await User.find();
    next();
  } catch (err) {
    req.status = 404;
    req.error = `getAllUsers = ${err}`;
    next(err);
  }
}

async function createUser(req, res, next) {
  const { password, email, username } = req.body;
  const hash = await hashPassword(password);
  try {
    req.user = await User.create({ password: hash, email, username });
    req._role = "user";
    next();
  } catch (err) {
    req.errorRender = "register";
    if (err.code === 11000) {
      return next("Email already registered");
    }
    req.error = `createUser = ${err}`;
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { user_id } = req.body;
  try {
    await User.deleteOne({ _id: user_id });
    await Post.deleteMany({ user_id });
    await Comment.deleteMany({ user_id });
    next();
  } catch (err) {
    req.error = `deleteUser = ${err}`;
    req.status = 404;
    next(err);
  }
}

async function findUser(req, res, next) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      res.status(401).send("Error password");
    }
    req._role = "user";
    req.user = user;
    next();
  } catch (err) {
    req.errorRender = "login";
    req.error = `findUser = ${err}`;
    req.status = 404;
    next("User is not found");
  }
}

module.exports = {
  getAllUsers,
  createUser,
  findUser,
  deleteUser,
};
