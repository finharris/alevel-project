const db = require("../db");

module.exports = async (req, res, next) => {
  const params = req.query;
  try {
    await db.removeSale(params.number);
    let results = await db.removeTable(params.number);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
