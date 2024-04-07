const fs = require("fs");
const { aws } = require("../config/default");
const { s3 } = require("../connectionAWS");

function deleteFileAWS(filename) {
    const params = {
      Bucket: aws.name,
      Key: filename,
    };
  
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(`Error deleting file from AWS S3`);
        throw err;
      }
    });
  }
  
  module.exports = {
    deleteFileAWS,
  };