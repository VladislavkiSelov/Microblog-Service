const router = require("express").Router();
const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");
const { getAllPosts } = require("../service/posts");

router.get("/", checkTokenExists, getAllPosts, async (req, res) => {
  const { user, posts } = req;
  res.render("main", { posts, user});
});

module.exports = {
  router,
};
