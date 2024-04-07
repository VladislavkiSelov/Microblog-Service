const { Image } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");
const { uploadFileAWS } = require("../secondaryFunction/uploadFileAWS");
const { getFileAWS } = require("../secondaryFunction/getFileAWS");
const { deleteFileAWS } = require("../secondaryFunction/deleteFileAWS");

async function createImage(req, res, next) {
  if (!req.file) {
    return res.status(400).send("Нет загруженного файла.");
  }

  const imagePath = path
    .join(process.cwd(), "static", "uploads", req.file.filename)
    .replace(/\\/g, "/");

  try {
    await Image.create({
      filename: req.file.filename,
      post_id: req.params.post_id,
    });
    uploadFileAWS(imagePath, req.file.filename);
    next();
  } catch (err) {
    req.error = `createImage = ${err}`;
    res.status(500).send(err);
  }
}

async function editImage(req, res, next) {
  const imagePath = path
    .join(process.cwd(), "static", "uploads", req.file.filename)
    .replace(/\\/g, "/");

  try {
    if (!req.filename) {
      await Image.create({
        filename: req.file.filename,
        post_id: req.params.post_id,
      });
    } else {
      await Image.updateOne(
        { post_id: new ObjectId(req.params.post_id) },
        { $set: { filename: imagePath } }
      );
    }
    uploadFileAWS(imagePath, req.file.filename);
    next();
  } catch (err) {
    req.error = `editImage = ${err}`;
    res.status(500).send(err);
  }
}

async function deleteImage(req, res, next) {
  try {
    const { filename } = await Image.findOne({
      post_id: new ObjectId(req.params.post_id),
    });

    if (!filename) {
      req.filename = false;
      next();
      return;
    }
    deleteFileAWS(filename);
    await Image.deleteOne({ post_id: req.params.post_id });
    next();
  } catch (err) {
    req.error = `deleteImage = ${err}`;
    next(err);
  }
}

async function getImage(req, res, next) {
  try {
    const { filename } = await Image.findOne({
      post_id: new ObjectId(req.params.id),
    });
    const image = await getFileAWS(filename, req);
    req.image = image;
    next();
  } catch (err) {
    req.error = `getImage = ${err}`;
    next();
  }
}

module.exports = {
  createImage,
  getImage,
  editImage,
  deleteImage,
};
