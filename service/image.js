const { Image } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");

async function createImage(req, res, next) {
  if (!req.file) {
    return res.status(400).send("Нет загруженного файла.");
  }

  const imagePath = path.join("uploads", req.file.filename).replace(/\\/g, "/");

  try {
    await Image.create({ image: imagePath, post_id: req.params.post_id });
    next();
  } catch (err) {
    req.error = `createImage = ${err}`;
    res.status(500).send(err);
  }
}

async function editImage(req, res, next) {
  if (!req.file) {
    return res.status(400).send("Нет загруженного файла.");
  }

  const imagePath = path.join("uploads", req.file.filename).replace(/\\/g, "/");

  try {
    if (!req.findImageDB) {
      await Image.create({ image: imagePath, post_id: req.params.post_id });
      next();
    } else {
      await Image.updateOne(
        { post_id: new ObjectId(req.params.post_id) },
        { $set: { image: imagePath } }
      );
      next();
    }
  } catch (err) {
    req.error = `editImage = ${err}`;
    res.status(500).send(err);
  }
}

async function deleteImage(req, res, next) {
  try {
    const resFindImage = await Image.findOne({
      post_id: new ObjectId(req.params.post_id),
    });

    if (!resFindImage) {
      req.findImageDB = false;
      next();
    } else {
      const filePath = path
        .join(process.cwd(), "static", resFindImage.image)
        .replace(/\\/g, "/");

      fs.unlink(filePath, (err) => {
        if (err) {
          next(err);
        }
      });
      next();
    }
  } catch (err) {
    req.error = `deleteImage = ${err}`;
    next(err);
  }
}

async function getImage(req, res, next) {
  try {
    const { image } = await Image.findOne({
      post_id: new ObjectId(req.params.id),
    });
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
