const express = require("express");
router = express.Router();
const { createComment } = require("../service/comment");
const { checkUser } = require("../secondaryFunction/checkUser");
const { routerError } = require("../service/error");
const { validateCommentData } = require("../middleware/validationComment");

router.post("/add-comment", checkUser, express.urlencoded({ extended: true }), validateCommentData, createComment, (req, res) => {
  res.redirect(`/post-user/${req.body.post_id}`)
});

router.use(routerError)

module.exports = {
  router,
};
