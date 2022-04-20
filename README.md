## To set up this project

## Description

In telecommunications, least-cost routing (LCR) is the process of selecting the path
of outbound communications traffic based on cost.

An implementation of a LCR service in NodeJS that provides an API that can
return the least cost route for a given destination.

### Prerequisites
- Nodejs
- Potgreres
- Docker (*)


## Setup
- git clone https://github.com/iamtope/lcr.git
- run `npm install` to install your dependencies
- run the following queries on your database to seed your data into the database
## 1
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
## 2
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
  FROM 'Users/abassadamo/Downloads/Tech_Interview/lcr/rate_lists/aria.csv'
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
FROM 'Users/abassadamo/Downloads/Tech_Interview/lcr/rate_lists/ibasis.csv'
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
FROM 'Users/abassadamo/Downloads/Tech_Interview/lcr/rate_lists/tata.csv'
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
FROM 'Users/abassadamo/Downloads/Tech_Interview/lcr/rate_lists/wavecrest.csv'
DELIMITER ';'
CSV HEADER;


- Replace lines containing Users/abassadamo/Downloads/Tech_Interview/lcr/rate_lists/.... with the right path to each csv files in your computer

- run `npm run start` to start the application

- Navigate to `http://localhost:15000/api/destination` [`POST REQUEST`]

- Use the sample request body: 
{
    "destination": "31627002259"
}