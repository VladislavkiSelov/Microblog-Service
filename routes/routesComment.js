const express = require("express");
router = express.Router();
const { createComment, deleteComment } = require("../service/comment");
const { checkTokenUser } = require("../secondaryFunction/checkTokenUser");
const { routerError } = require("../service/error");
const { checkTokenExists } = require("../secondaryFunction/checkTokenExists");

router.post("/add-comment", checkTokenExists, checkTokenUser, express.urlencoded({ extended: true }), createComment, (req, res) => {
  res.redirect(`/post-user/${req.body.post_id}`)
});

router.post("/delete-comment", checkTokenExists, checkTokenUser, express.urlencoded({ extended: true }), deleteComment, (req, res) => {
  res.redirect(`/post-user/${req.body.post_id}`)
});

router.use(routerError)

module.exports = {
  router,
};
