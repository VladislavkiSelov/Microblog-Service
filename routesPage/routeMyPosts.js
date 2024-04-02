const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");
const { getAllPostsUser } = require("../service/posts");

router.get("/:id", checkTokenExists, getAllPostsUser, async (req, res) => {
  const { posts, user } = req;
  res.render("my_posts", { posts, user });
});

module.exports = {
  router,
};
