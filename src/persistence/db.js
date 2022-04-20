const {Pool} = require('pg');
const dotenv = require('dotenv')

dotenv.config()

module.exports = new Pool({
  max: 10,
  connectionString: process.env.DATABASE_URL
});
