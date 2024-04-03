const multer = require("multer");
const { mongoUrl } = require("../connectionMongoose");
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');


const storage = new GridFsStorage({
  url: mongoUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: { 
            post_id: req.params.post_id 
          },
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

module.exports = {
  upload,
};