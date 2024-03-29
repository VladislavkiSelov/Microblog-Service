const { Image } = require("../connectionMongoose");
const { ObjectId } = require('mongodb');
const path = require("path");

async function createImage(req, res, next) {
  if (!req.file) {
    return res.status(400).send("Нет загруженного файла.");
  }

  const imagePath = path.join("uploads", req.file.filename).replace(/\\/g, '/');

  try {
    await Image.create({ image: imagePath, post_id: req.params.post_id });
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getImage(req, res, next) {
  try{
    const {image} = await Image.findOne({post_id: new ObjectId(req.params.id)});
    req.image = image;
    next();
  }catch(err){
    console.log(err);
    next()
  }
}

module.exports = {
  createImage,
  getImage,
};
