const express = require("express");

const router = express.Router();

const test = require("./test");
router.get("/test", test);

const users = require("./users");
router.get("/users", users);

module.exports = router;
