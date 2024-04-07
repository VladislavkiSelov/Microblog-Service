const { aws } = require("../config/default");
const { s3 } = require("../connectionAWS");
const logger = require("../utils/logger");

async function getFileAWS(filename) {
  const params = {
    Bucket: aws.name,
    Key: filename,
    Expires: 3600, 
  };

  try {
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(url);
      });
    });

    return url;
  } catch (error) {
    logger("getFileAWS").error(err);
    throw error;
  }
}

module.exports = {
  getFileAWS,
};
