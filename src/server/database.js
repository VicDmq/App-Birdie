import mysql from "mysql";
import { appConfig } from "../../server.config";

const pool = mysql.createPool(appConfig.server.poolConfig);

function queryDatabase(query, callback) {
  pool.query(query, function(error, results, fields) {
    callback(error, results);
  });
}

module.exports = { queryDatabase };
