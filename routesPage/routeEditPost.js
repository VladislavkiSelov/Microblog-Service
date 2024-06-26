const router = require("express").Router();
const { getPostFindId } = require("../service/posts");
const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");

router.get("/:id", checkTokenExists, getPostFindId, async (req, res) => {
  const { post, user } = req;
  res.render("editPost", { user, post });
});

module.exports = {
  router,
};
