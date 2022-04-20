const {Pool} = require('pg');

module.exports = new Pool({
  max: 10,
  connectionString: "postgres://abassadamo:869480@localhost:5432/talk"
});
