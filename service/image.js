const { gfs } = require("../connectionMongoose");
const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");
const { createReadStream } = require("fs");

async function createImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send("Нет загруженного файла.");
    }
    
    const imagePath = path.join(process.cwd(), "static", "uploads", req.file.filename).replace(/\\/g, "/");
    const filename = req.file.filename;

    console.log('gfs:', gfs);
    const writestream = gfs.createWriteStream({ filename });
    const readStream = fs.createReadStream(imagePath);
    
    readStream.pipe(writestream);

    writestream.on('error', err => {
      next(err);
    });

    writestream.on('close', file => {
      next();
    });

  } catch (err) {
    req.error = `createImage = ${err}`;
    throw new Error("Failed to upload image");
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
