const db = require("../db");

module.exports = async (req, res, next) => {
  try {
    let results = await db.tables();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
