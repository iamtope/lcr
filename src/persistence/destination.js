const { response } = require("express");
const SQL = require("sql-template-strings");
const db = require("./db");

module.exports = {
  async search(destination) {
    try {
      let mapper = {
        ARIA: [],
        IBASIS: [],
        TATA: [],
        WAVECREST: [],
      };
      let serach_text = "";
      for (let i = 0; i < destination.length; i++) {
        if (i == 0) {
          serach_text = destination[i];
          continue;
        } else {
          serach_text += destination[i];
        }
        let rows;
        const param = serach_text + "%";
        try {
          rows = (
            await db.query(SQL`SELECT trunk, MIN(tariff) FROM  teleco_route WHERE mobile LIKE ${param}
            AND  "blocked" != 'Y' GROUP BY trunk;
        `)
          ).rows;
        } catch (error) {
          console.log(error);
        }

        if (rows.length == 0) {
          break;
        }

        for (const row of rows) {
          mapper[row.trunk].push({ serach_text, value: row.min });
        }
      }

      let final = await this.computeMinTarriff(mapper);
      return final.sort(function (a, b) {
        return parseFloat(a.tariff) - parseFloat(b.tariff);
      });
    } catch (error) {
      console.error();
    }
  },

  async computeMinTarriff(mapper) {
    const response = [];
    try {
      for (const telco in mapper) {
        const min_tariff = mapper[telco][mapper[telco].length - 1];
        let rows;
        const temp_tariff = min_tariff.serach_text + "%";
        rows = (
          await db.query(SQL`
      SELECT DISTINCT mobile, prefix, country, trunk, description, tariff FROM teleco_route WHERE trunk=${telco} AND tariff=${min_tariff.value} AND mobile LIKE ${temp_tariff} LIMIT 1;
          `)
        ).rows;
        response.push(rows[0]);
      }
    } catch (error) {
      console.log(error);
    }

    return response;
  },
};
