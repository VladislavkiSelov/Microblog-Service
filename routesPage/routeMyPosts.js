const router = require("express").Router();
const { verifyJwt } = require("../secondaryFunction/auth");
const { checkUser } = require("../secondaryFunction/checkUser");
const { getAllPostsUser } = require("../service/posts");

router.get("/:id", checkUser, getAllPostsUser, async (req, res) => {
  const posts = req.posts;
  const { token } = req.cookies;
  const user = verifyJwt(token);
  
  try {
    res.render("my_posts", { posts ,user});
  } catch (err) {
    next(err);
  }
});

module.exports = {
  router,
};
