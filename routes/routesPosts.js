const express = require("express");
const router = express.Router();
const { createPost, getAllPostsUser, deletePost } = require("../service/posts");
const { routerError } = require("../service/error");
const { validatePostData } = require("../middleware/validationPost");

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

router.post("/add", validatePostData, createPost, (req, res) => {
  res.send({ post_id: req.post.id })
}, (err, req, res, next) => res.status(400).json({ error: err.message || err }));

router.use(routerError);

module.exports = {
  router,
};
