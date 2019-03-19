module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.NODE_ENV === 'production'
    ? process.env.DB_URI
    : `mongodb://localhost:27017/${process.env.DB_NAME}`
}