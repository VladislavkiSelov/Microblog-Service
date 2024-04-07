const express = require("express");
const router = express.Router();
const { upload } = require("../service/upload");
const { createImage, editImage, deleteImage, deleteImageMemory } = require("../service/image");
const { routerError } = require("../service/error");

router.post("/:post_id", upload.single("file"), createImage, deleteImageMemory, (req, res) => {
  res.send(200, {url:"/"});
});

router.post("/:post_id/edit", deleteImage, upload.single("file"), editImage, deleteImageMemory, (req, res) => {
  res.send(200, {url:"/"});
});

router.use(routerError)

module.exports = {
  router,
};
