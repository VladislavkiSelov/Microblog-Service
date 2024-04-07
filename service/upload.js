const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { randomUUID } = require("crypto");

const uploadDirectory = path.join(process.cwd(), "static", "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    const randomSecureName = randomUUID();
    cb(null, `${randomSecureName}.${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};


