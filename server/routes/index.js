const express = require("express");

const router = express.Router();

const test = require("./test");
router.get("/test", test);

const products = require("./products");
router.get("/products", products);

const addProduct = require("./addProduct");
router.get("/products/add", addProduct);

const removeProduct = require("./removeProduct");
router.get("/products/remove", removeProduct);

const categories = require("./categories");
router.get("/categories", categories);

const authCodes = require("./authCodes");
router.get("/authcodes", authCodes);

const tables = require("./tables");
router.get("/tables", tables);

const addTable = require("./addTable");
router.get("/tables/add", addTable);

const removeTable = require("./removeTable");
router.get("/tables/remove", removeTable);

const sales = require("./sales");
router.get("/sales", sales);

const addSale = require("./addSale");
router.get("/sales/add", addSale);

const updateSale = require("./updateSale");
router.get("/sales/update", updateSale);

module.exports = router;
