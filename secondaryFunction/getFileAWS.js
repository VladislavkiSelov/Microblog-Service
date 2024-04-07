const { aws } = require("../config/default");
const { s3 } = require("../connectionAWS");

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

    console.log("Signed URL:", url);
    return url;
  } catch (error) {
    console.error("Error getting object from S3:", error);
    throw error;
  }
}

module.exports = {
  getFileAWS,
};
