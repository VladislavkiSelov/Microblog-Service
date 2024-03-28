const router = require("express").Router();
const { verifyJwt } = require("../secondaryFunction/auth");
const { getAllPosts } = require("../service/posts");

router.get("/", getAllPosts, async (req, res) => {
  try {
    const posts = req.posts;
    const { token } = req.cookies;
    const user = verifyJwt(token);

    res.render("main", { posts, user });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
