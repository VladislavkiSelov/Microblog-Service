module.exports = {
  server: {
    port: process.env.PORT,
  },
  db: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    connectionFormat: process.env.NODE_ENV === "develop" ? "+srv" : "",
  },
  aws: {
    id: process.env.AWS_ID,
    key: process.env.AWS_SECRET_KEY,
    name: process.env.AWS_NAME,
  },
  auth: {
    secret: process.env.JWT_SECRET || "some-default-secret-string",
  },
};
