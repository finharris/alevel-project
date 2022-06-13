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

module.exports = router;
