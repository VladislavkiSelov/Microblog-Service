const AWS = require("aws-sdk");
const { aws } = require("./config/default");

const s3 = new AWS.S3({
  accessKeyId: aws.id,
  secretAccessKey: aws.key,
  signatureVersion: 'v4',
  region: 'eu-central-1',
});

module.exports = {
  s3,
};
