const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  password: process.env.DBPASS,
  user: "root",
  host: "127.0.0.1",
  port: "3306",
});

let db = {};

db.allProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM alevel_project.products", (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

db.allCategories = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM alevel_project.categories ORDER BY id",
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

db.addProduct = (name, category_id, purchase_cost, selling_cost) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO alevel_project.products (name, category_id, purchase_cost, selling_cost) VALUES (?, ?, ?, ?)",
      [name, category_id, purchase_cost, selling_cost],
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

db.removeProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM alevel_project.products WHERE id=?",
      [id],
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

db.authCodes = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM alevel_project.auth_codes", (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// db.all = () => {
//   return new Promise((resolve, reject) => {
//     pool.query("SELECT * FROM test_schema.mock_data", (err, results) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }

//       return resolve(results);
//     });
//   });
// };

// db.name = (firstName) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "SELECT * FROM test_schema.mock_data WHERE first_name = ?",
//       [firstName],
//       (err, results) => {
//         if (err) {
//           console.log(err);
//           return reject(err);
//         }

//         return resolve(results);
//       }
//     );
//   });
// };

module.exports = db;
