const express = require("express");
router = express.Router();
const { createComment } = require("../service/comment");
const { checkUser } = require("../secondaryFunction/checkUser");

router.post("/add-comment", checkUser,express.urlencoded({ extended: true }),createComment, (req, res) => {
  res.redirect(`/post-user/${req.body.post_id}`)
});

module.exports = {
  router,
};
