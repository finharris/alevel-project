const db = require("../db");

// http://localhost:5000/api/products/add?name=Diet%20Coke&category_id=1&purchase_cost=0.7&selling_cost=2.5

module.exports = async (req, res, next) => {
  const params = req.query;
  try {
    let results = await db.removeProduct(params.id, params.name);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
