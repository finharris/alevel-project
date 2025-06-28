const mysql = require("mysql2");
require("dotenv").config({ path: __dirname + "/./../../.env" });

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

db.updateProduct = (name, purchase_cost, selling_cost, productID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE alevel_project.products SET name = ?, purchase_cost = ?, selling_cost = ? WHERE productID = ? ;",
      [name, purchase_cost, selling_cost, productID],
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
      "DELETE FROM alevel_project.products WHERE productID=?",
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

db.removeTable = (number) => {
  const query = `
  DELETE FROM alevel_project.tables WHERE number = ?;
  `;
  return new Promise((resolve, reject) => {
    pool.query(query, [number], (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

db.allSales = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM alevel_project.item_sales", (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

db.updateSale = (sale_id, newQuantity) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE alevel_project.item_sales SET quantity = ? WHERE sale_id = ? ;",
      [newQuantity, sale_id],
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

db.addSale = (table_number, product_id) => {
  // http://localhost:5000/api/sales/add?table_number=1&product_id=3

  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO alevel_project.item_sales (table_number, product_id, quantity) VALUES (?, ?, ?)",
      [table_number, product_id, 1],
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

db.removeSale = (sale_id) => {
  // remove sale
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM alevel_project.item_sales WHERE sale_id = ?",
      [sale_id],
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

db.removeAllSale = (table_number, itemID) => {
  let query, data;
  if (table_number === null) {
    query = "DELETE FROM alevel_project.item_sales WHERE product_id = ?";
    data = itemID;
  } else if (itemID === null) {
    query = "DELETE FROM alevel_project.item_sales WHERE table_number = ?";
    data = table_number;
  }
  return new Promise((resolve, reject) => {
    pool.query(query, [data], (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(results);
    });
  });
};

module.exports = db;
