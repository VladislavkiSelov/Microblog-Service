const { checkTokenUser } = require("../secondaryFunction/checkTokenUser");
const { getAllPostsUser } = require("../service/posts");

router.get("/:id", checkTokenUser, getAllPostsUser, async (req, res) => {
  const { posts, user } = req;
  res.render("my_posts", { posts, user });
});

module.exports = {
  router,
};
