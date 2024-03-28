const express = require("express");
const router = express.Router();
const { createPost, getAllPostsUser, deletePost } = require("../service/posts");

router.get("/:id", getAllPostsUser, (req, res) => {
  res.send(200);
});

router.post(
  "/:id/delete",
  express.urlencoded({ extended: true }),
  deletePost,
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/add", createPost, (req, res) => {
  res.send(200, { post_id: req.post.id });
});

module.exports = {
  router,
};
