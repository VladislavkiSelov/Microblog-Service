const express = require("express");
const router = express.Router();
const { upload } = require("../service/upload");
const { createImage } = require("../service/image");
const { routerError } = require("../service/error");

router.post("/:post_id", upload.single("file"), createImage, (req, res) => {
  res.redirect("/");
});

router.use(routerError)

module.exports = {
  router,
};
