const fs = require("fs");
const { aws } = require("../config/default");
const { s3 } = require("../connectionAWS");
const logger = require("../utils/logger");


function deleteFileAWS(filename) {
    const params = {
      Bucket: aws.name,
      Key: filename,
    };
  
    s3.deleteObject(params, function (err, data) {
      if (err) {
        logger("Error deleting file from AWS S3").error(err);
        throw err;
      }
    });
  }
  
  module.exports = {
    deleteFileAWS,
  };