const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.DBPASS,
  user: "root",
  host: "127.0.0.1",
  port: "3306",
});

let usersdb = {};

usersdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM test_schema.mock_data", (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

usersdb.name = (firstName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM test_schema.mock_data WHERE first_name = ?",
      [firstName],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

module.exports = usersdb;
