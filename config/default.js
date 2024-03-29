module.exports = {
  server: {
    port: process.env.PORT
  },
  db: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    connectionFormat: process.env.NODE_ENV === 'production' ? '+srv' : '' //! так ти без проблем зможеш підрубитись наприклад до локальної монги в докері
  },
  auth: {
    secret: process.env.JWT_SECRET || 'some-default-secret-string'
  }
}