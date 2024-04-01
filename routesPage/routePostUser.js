const router = require("express").Router();
const { getPostFindId } = require("../service/posts");
const { getCommentsFindId } = require("../service/comment");
const { verifyJwt } = require("../secondaryFunction/auth");
const { getImage } = require("../service/image");

router.get("/:id", getPostFindId, getCommentsFindId, getImage,async (req, res) => {
  try {
    const post = req.post;
    const comments = req.comments;
    const { token } = req.cookies;
    const user = verifyJwt(token);
    const image = req.image;
    res.render("post", { post, comments, user ,image});
  } catch (err) {
    req.error = `routePostUser  = ${err}`;
    next(err);
  }
});

module.exports = {
  router,
};
