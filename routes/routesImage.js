const express = require("express");
const router = express.Router();
const { upload } = require("../service/upload");
const { createImage } = require("../service/image");

router.post("/:post_id", upload.single("file"), createImage, (req, res) => {
  res.redirect("/");
});

module.exports = {
  router,
};
