const router = require("express").Router();
const { getPostFindId } = require("../service/posts");
const { getCommentsFindId } = require("../service/comment");
const { getImage } = require("../service/image");
const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");

router.get("/:id", checkTokenExists, getPostFindId, getCommentsFindId, getImage, async (req, res) => {
    const {post, comments, user, image} = req;
    res.render("post", { post, comments, user, image});
});

module.exports = {
  router,
};
