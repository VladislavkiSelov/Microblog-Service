const { User, Post, Comment } = require("../connectionMongoose");
const {
  hashPassword,
  checkPassword,
  issueJwt,
} = require("../secondaryFunction/auth");

async function getAllUsers(req, res, next) {
  try {
    req.users = await User.find();
    next();
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  const { password, email, username } = req.body;
  const hash = await hashPassword(password);
  try {
    req.users = await User.create({ password: hash, email, username });
    next();
  } catch (err) {
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
    const token = issueJwt({ id: user.id, role: 'user' });
    res.cookie("token", token, { httpOnly: true });
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  findUser,
  deleteUser,
};
