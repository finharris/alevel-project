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
      "SELECT * FROM alevel_project.categories ORDER BY categoryID",
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
      "INSERT INTO alevel_project.products (name, categoryID, purchase_cost, selling_cost) VALUES (?, ?, ?, ?)",
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

db.tables = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM alevel_project.tables ORDER BY number",
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

db.addTable = (number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO alevel_project.tables (number) VALUES (?)",
      [number],
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

db.allSales = (tableNumber) => {
  return new Promise((resolve, reject) => {
    let query;

    if (!tableNumber) {
      query = "SELECT * FROM alevel_project.item_sales";
    } else {
      query = "SELECT * FROM alevel_project.item_sales WHERE table_number = ?";
    }
    pool.query(query, [tableNumber], (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

db.addSale = (table_number, product_id) => {
  // http://localhost:5000/api/sales/add?table_number=1&product_id=3

  const query = `
    IF EXISTS (SELECT 1 FROM alevel_project.item_sales WHERE table_number = ? AND product_id = ?)
    BEGIN
        UPDATE alevel_project.item_sales 
        SET quantity = quantity + 1
        WHERE table_number = ? AND product_id = ?;
    END
    ELSE
    BEGIN
        INSERT INTO alevel_project.item_sales (table_nuber, product_id, quantity) VALUES (?, ?, ?)
    END
  `;

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [
        table_number,
        product_id,
        table_number,
        product_id,
        table_number,
        product_id,
        1,
      ],
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

module.exports = db;
