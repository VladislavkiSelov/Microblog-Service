const fs = require("fs");
const { aws } = require("../config/default");
const { s3 } = require("../connectionAWS");
const logger = require("../utils/logger");

function uploadFileAWS(filePath, filename) {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: aws.name,
    Key: filename,
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      logger("uploadFileAWS").error(err);
      throw err;
    }
  });
}

module.exports = {
  uploadFileAWS,
};
