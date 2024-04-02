const express = require("express");
const router = express.Router();
const { upload } = require("../service/upload");
const { createImage, editImage, deleteImage } = require("../service/image");
const { routerError } = require("../service/error");

router.post("/:post_id", upload.single("file"), createImage, (req, res) => {
  res.send(200, {url:"/"});
});

router.post("/:post_id/edit", deleteImage, upload.single("file"), editImage, (req, res) => {
  res.send(200, {url:"/"});
});

router.use(routerError)

module.exports = {
  router,
};
