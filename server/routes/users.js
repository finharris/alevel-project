const e = require("express");
const db = require("../db");

module.exports = async (req, res, next) => {
  try {
    if (req.query.firstname !== undefined) {
      let results = await db.name(req.query.firstname);
      res.json(results);
    } else {
      let results = await db.all();
      res.json(results);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
