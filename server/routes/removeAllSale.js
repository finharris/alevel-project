const db = require("../db");

module.exports = async (req, res, next) => {
  const params = req.query;
  try {
    let results = await db.removeAllSale(params.table_number);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
