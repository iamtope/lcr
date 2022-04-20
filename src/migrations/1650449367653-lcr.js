'use strict'
const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();
  await client.query(`
  CREATE TABLE teleco_route (
    id SERIAL PRIMARY KEY,
    start_date TEXT,
    trunk TEXT,
    mobile VARCHAR,
    prefix VARCHAR,
    country VARCHAR,
    tariff NUMERIC(19,4),
    blocked VARCHAR,
    seconds_allowed VARCHAR(2),
    description TEXT,
    cli_a TEXT
  );
  
  COPY
    teleco_route(
      start_date,
      trunk,
      mobile,
      prefix,
      country,
      tariff,
      blocked,
      seconds_allowed,
      description,
      cli_a
    )
  FROM '/rate_lists/aria.csv'
  DELIMITER ';'
  CSV HEADER;

  COPY
  teleco_route(
    start_date,
    trunk,
    mobile,
    prefix,
    country,
    tariff,
    blocked,
    seconds_allowed,
    description,
    cli_a
  )
FROM 'rate_lists/ibasis.csv'
DELIMITER ';'
CSV HEADER;

COPY
teleco_route(
  start_date,
  trunk,
  mobile,
  prefix,
  country,
  tariff,
  blocked,
  seconds_allowed,
  description,
  cli_a
)
FROM 'rate_lists/tata.csv'
DELIMITER ';'
CSV HEADER;

COPY
teleco_route(
  start_date,
  trunk,
  mobile,
  prefix,
  country,
  tariff,
  blocked,
  seconds_allowed,
  description,
  cli_a
)
FROM 'rate_lists/wavecrest.csv'
DELIMITER ';'
CSV HEADER;
    `);
  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();
  await client.query(`
  DROP TABLE IF EXISTS teleco_route;
  `);

  await client.release(true);
  next()
}
